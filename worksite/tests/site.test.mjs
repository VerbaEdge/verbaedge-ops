import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('site');
const origin = 'https://ops.verbaedge.com';
const localOrigin = 'http://localhost';
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = walk(root).filter(file => path.basename(file) === 'index.html');
function routeFor(file) {
  const directory = path.relative(root, path.dirname(file));
  return directory ? '/' + directory.split(path.sep).join('/') + '/' : '/';
}

test('public pages and preserved deep links exist', () => {
  const routes = pages.map(routeFor);
  for (const route of [
    '/', '/operations/', '/maintenance/', '/facilities/', '/fleet/', '/tradeflow/', '/corridors/',
    '/network/', '/africa-europe/', '/east-africa/', '/southern-africa/', '/fr/', '/fr/facturation/',
    '/billing/', '/billing/demo/', '/demo/', '/legacy/freight-demo/',
  ]) {
    assert.ok(routes.includes(route), `missing route: ${route}`);
  }
});

test('HTML pages have basic metadata and structural content', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<title>/i, `title missing: ${file}`);
    assert.match(html, /name=["']viewport["']/i, `viewport missing: ${file}`);
    assert.match(html, /<main(?:\s|>)/i, `main missing: ${file}`);
  }
});

test('local links, asset references, and deep-link fragments resolve', () => {
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
      const url = new URL(match[1], localOrigin + routeFor(file));
      if (url.origin !== localOrigin) continue;

      let target = path.join(root, decodeURIComponent(url.pathname));
      if (fs.statSync(target, {throwIfNoEntry: false})?.isDirectory()) {
        target = path.join(target, 'index.html');
      }
      assert.ok(fs.statSync(target, {throwIfNoEntry: false})?.isFile(), `${file}: missing ${url.pathname}`);
      if (url.hash && path.extname(target) === '.html') {
        const fragment = decodeURIComponent(url.hash.slice(1));
        const targetHtml = fs.readFileSync(target, 'utf8');
        const ids = Array.from(targetHtml.matchAll(/\bid=["']([^"']+)["']/g), found => found[1]);
        assert.ok(ids.includes(fragment), `${file}: missing ${url.pathname}${url.hash}`);
      }
    }
  }
});

test('indexable pages use their Ops canonical and match the sitemap', () => {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const indexable = [];
  for (const file of pages) {
    const url = origin + routeFor(file);
    const html = fs.readFileSync(file, 'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)">/i)?.[1];
    const socialUrl = html.match(/<meta property="og:url" content="([^"]+)">/i)?.[1];
    if (socialUrl) assert.equal(socialUrl, url);
    if (html.includes('content="noindex, follow"')) {
      if (canonical) assert.equal(canonical, url);
    } else {
      assert.equal(canonical, url);
      indexable.push(url);
    }
  }
  const sitemapUrls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1]);
  assert.deepEqual(sitemapUrls.sort(), indexable.sort());
});

test('new pages do not link directly to old logistics domain', () => {
  for (const file of pages) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /https:\/\/logistics\.verbaedge\.com/i);
  }
});

test('no unsupported live licensed-service claims', () => {
  for (const file of pages) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /we provide live tracking with carrier access|we are a licensed freight broker|our certified installers are on staff/i);
  }
});
