import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('site');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

const origin = 'http://localhost';
const server = http.createServer((request, response) => {
  let url, pathname;
  try {
    url = new URL(request.url, origin);
    pathname = decodeURIComponent(url.pathname);
    if (url.origin !== origin || !request.url.startsWith('/') || pathname.startsWith('//') || pathname.includes('\0')) {
      throw new Error('Invalid request path');
    }
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  let file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + path.sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  if (fs.statSync(file, {throwIfNoEntry: false})?.isDirectory()) {
    file = path.join(file, 'index.html');
    if (!url.pathname.endsWith('/') && fs.statSync(file, {throwIfNoEntry: false})?.isFile()) {
      response.writeHead(308, {Location: `${url.pathname}/${url.search}`}).end();
      return;
    }
  }

  if (!fs.statSync(file, {throwIfNoEntry: false})?.isFile()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  fs.createReadStream(file).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview http://127.0.0.1:${server.address().port}`);
});
