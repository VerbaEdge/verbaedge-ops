import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('site');
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const pages=walk(root).filter(f=>f.endsWith('index.html'));
test('public pages and preserved deep links exist',()=>{
 assert.ok(pages.length>=9);
 assert.ok(fs.existsSync(path.join(root,'network','index.html')));
});
test('HTML pages have basic metadata and structural content',()=>{
 for(const f of pages){let t=fs.readFileSync(f,'utf8');
  assert.match(t,/<title>/i,`title missing: ${f}`);
  assert.match(t,/name=["']viewport["']/i,`viewport missing: ${f}`);
  assert.match(t,/<main(?:\s|>)/i,`main missing: ${f}`);
 }
});
test('site-internal absolute links resolve to source files',()=>{
 for(const f of pages){let t=fs.readFileSync(f,'utf8');
  for(const match of t.matchAll(/href=["'](\/[^"']*)["']/g)){
   const p=match[1].split('#')[0].split('?')[0]; if(!p||p.startsWith('//'))continue;
   const dest=path.join(root,p); assert.ok(fs.existsSync(dest)||fs.existsSync(path.join(dest,'index.html')),`${f}: missing ${p}`);
  }
 }
});
test('new pages do not link directly to old logistics domain',()=>{
 for(const f of pages)assert.doesNotMatch(fs.readFileSync(f,'utf8'),/https:\/\/logistics\.verbaedge\.com/i);
});
test('no unsupported live licensed-service claims',()=>{
 for(const f of pages)assert.doesNotMatch(fs.readFileSync(f,'utf8'),/we provide live tracking with carrier access|we are a licensed freight broker|our certified installers are on staff/i);
});
