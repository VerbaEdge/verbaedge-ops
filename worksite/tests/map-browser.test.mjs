import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import os from 'node:os';

const chrome = ['google-chrome', 'chromium'].find(bin => spawnSync(bin, ['--version']).status === 0);

const root = path.resolve('site');
const contentTypes = {'.js':'text/javascript','.json':'application/json','.css':'text/css','.html':'text/html'};
test('corridor maps draw their geography and routes in a browser without external tiles', {skip: !chrome && !process.env.GITHUB_ACTIONS}, async () => {
  assert.ok(chrome, 'A Chrome browser is required on the CI runner');
  const cases = ['/assets/maps/global-atlas.html','/assets/maps/usa-atlas.html','/assets/maps/africa-atlas.html'];
  for (const file of await fs.readdir(path.join(root,'assets/atlas'))) {
    if (file.endsWith('.html')) cases.push('/assets/atlas/' + file);
  }
  const failures = [];
  const harness = `<!doctype html><html><body><output>loading</output><script>
    const cases = ${JSON.stringify(cases)};
    async function inspect(url) {
      const frame = document.createElement('iframe');
      frame.width = '390'; frame.height = '420';
      document.body.append(frame);
      await new Promise(done => { frame.onload = done; frame.src = url; });
      const doc = frame.contentDocument;
      for(let attempt=0;attempt<75 && !doc.querySelector('.leaflet-geography-pane path');attempt++)
        await new Promise(done => setTimeout(done,100));
      if (!doc.querySelector('.leaflet-geography-pane path')) throw Error(url+' missing land');
      if (doc.querySelector('.leaflet-tile')) throw Error(url+' loaded tiles');
      if (url.includes('global-atlas')) {
        const select = doc.querySelector('#route');
        select.value = 'US_INLAND_M55'; select.dispatchEvent(new Event('change'));
        if (!doc.querySelector('#detail').textContent.includes('Memphis') ||
            !doc.querySelector('path[stroke-dasharray]')) throw Error('route selection failed');
      }
      frame.remove();
    }
    Promise.all(cases.map(inspect)).then(()=>fetch('/result?message=PASS'),
      error=>fetch('/result?message='+encodeURIComponent(error.message)));
  </script></body></html>`;
  let report;
  const result = new Promise(resolve => { report = resolve; });
  const server = http.createServer(async (req,res) => {
    if (req.url === '/check') return res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}).end(harness);
    if (req.url.startsWith('/result?')) {
      report(new URL(req.url,'http://localhost').searchParams.get('message'));
      return res.end();
    }
    const file = path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
    if (!file.startsWith(root+path.sep)) return res.writeHead(404).end();
    try {
      const bytes = await fs.readFile(file);
      res.writeHead(200, {'Content-Type':contentTypes[path.extname(file)] || 'application/octet-stream'});
      res.end(bytes);
    } catch { if (!file.endsWith('favicon.ico')) failures.push(file); res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const profile = await fs.mkdtemp(path.join(os.tmpdir(),'ve-atlas-'));
  const browser = spawn(chrome,['--headless=new','--disable-gpu','--no-sandbox','--disable-dev-shm-usage',
    '--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+profile,
    'http://127.0.0.1:'+server.address().port+'/check'],{stdio:['ignore','ignore','pipe']});
  let logs = '';
  browser.stderr.on('data', chunk => { logs=(logs+chunk).slice(-2000); });
  const stopped = new Promise(resolve => browser.once('exit', code => resolve('Browser exited '+code+' '+logs)));
  let timer;
  try {
    const timeout = new Promise(resolve => { timer=setTimeout(()=>resolve('Browser timed out '+logs),45000); });
    assert.equal(await Promise.race([result,stopped,timeout]),'PASS');
    assert.deepEqual(failures,[]);
  } finally {
    clearTimeout(timer);
    browser.kill();
    await stopped;
    server.closeAllConnections(); await new Promise(resolve=>server.close(resolve));
    await fs.rm(profile,{recursive:true,force:true,maxRetries:3});
  }
});
