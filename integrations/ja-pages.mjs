// After the build, writes a Japanese copy of every public page to /ja/...
//
// The site's translations already sit in the HTML as data-ja attributes
// (swapped in by the language toggle). Search engines never click the toggle,
// so this bakes the Japanese into real pages they can index, links the two
// versions with hreflang tags, and points internal links at the /ja pages.

import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parse, parseFragment, serialize } from 'parse5';
import { publicPages, jaPath } from '../src/data/public-pages.js';

const SITE = 'https://studio-kaku.com';

const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;

function setAttr(node, name, value) {
  const existing = node.attrs.find((a) => a.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}

function walk(node, fn) {
  fn(node);
  for (const child of node.childNodes ?? []) walk(child, fn);
  if (node.content) walk(node.content, fn);
}

function find(doc, tagName) {
  let found;
  walk(doc, (n) => { if (!found && n.tagName === tagName) found = n; });
  return found;
}

function element(tagName, attrs, parentNode) {
  return {
    nodeName: tagName, tagName, namespaceURI: 'http://www.w3.org/1999/xhtml',
    attrs: Object.entries(attrs).map(([name, value]) => ({ name, value })),
    childNodes: [], parentNode,
  };
}

function replaceChildren(node, html) {
  const fragment = parseFragment(node, html);
  node.childNodes = fragment.childNodes;
  node.childNodes.forEach((c) => { c.parentNode = node; });
}

// Adds hreflang links (both versions get the same set)
function addAlternates(head, enPath) {
  const links = [
    ['en', enPath],
    ['ja', jaPath(enPath)],
    ['x-default', enPath],
  ];
  for (const [lang, path] of links) {
    head.childNodes.push(element('link', { rel: 'alternate', hreflang: lang, href: SITE + path }, head));
  }
}

function toJapanese(doc, enPath, jaPaths) {
  const html = find(doc, 'html');
  setAttr(html, 'lang', 'ja');
  setAttr(html, 'class', `${attr(html, 'class') ?? ''} lang-ja`.trim());
  setAttr(html, 'data-page-lang', 'ja');

  walk(doc, (n) => {
    if (!n.attrs) return;
    const ja = attr(n, 'data-ja');
    if (ja != null && n.tagName !== 'html') {
      if (n.tagName === 'title') n.childNodes = [{ nodeName: '#text', value: ja, parentNode: n }];
      else replaceChildren(n, ja);
    }

    const jaContent = attr(n, 'data-ja-content');
    if (jaContent != null) setAttr(n, 'content', jaContent);

    const options = attr(n, 'data-options-ja');
    if (options != null && n.tagName === 'select') {
      const opts = JSON.parse(options);
      n.childNodes = opts.map((o) => {
        const opt = element('option', { value: o.v }, n);
        opt.childNodes = [{ nodeName: '#text', value: o.l, parentNode: opt }];
        return opt;
      });
    }

    // Keep visitors (and crawlers) inside the Japanese site
    const href = attr(n, 'href');
    if (n.tagName === 'a' && href?.startsWith('/')) {
      const [path, hash = ''] = href.split('#');
      const withSlash = path.replace(/\/?$/, '/');
      if (jaPaths.has(withSlash)) setAttr(n, 'href', jaPath(withSlash) + (hash && `#${hash}`));
    }

    if (n.tagName === 'link' && attr(n, 'rel') === 'canonical') setAttr(n, 'href', SITE + jaPath(enPath));
    if (n.tagName === 'meta' && attr(n, 'property') === 'og:url') setAttr(n, 'content', SITE + jaPath(enPath));
    if (n.tagName === 'meta' && attr(n, 'property') === 'og:locale') setAttr(n, 'content', 'ja_JP');
    if (n.tagName === 'meta' && attr(n, 'property') === 'og:locale:alternate') setAttr(n, 'content', 'en_US');
  });

  // Make sure the contact form and other scripts that read the saved
  // language see Japanese from the very start
  const head = find(doc, 'head');
  const script = element('script', {}, head);
  script.childNodes = [{ nodeName: '#text', value: "try{localStorage.setItem('sk-lang','ja')}catch(e){}", parentNode: script }];
  head.childNodes.unshift(script);
}

export default function jaPages() {
  return {
    name: 'ja-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const jaPaths = new Set(publicPages);
        for (const enPath of publicPages) {
          const file = `${root}${enPath.slice(1)}index.html`;
          const source = await fs.readFile(file, 'utf8');

          const en = parse(source);
          addAlternates(find(en, 'head'), enPath);
          await fs.writeFile(file, serialize(en));

          const ja = parse(source);
          toJapanese(ja, enPath, jaPaths);
          addAlternates(find(ja, 'head'), enPath);
          const out = `${root}${jaPath(enPath).slice(1)}index.html`;
          await fs.mkdir(out.replace(/index\.html$/, ''), { recursive: true });
          await fs.writeFile(out, serialize(ja));
        }
        logger.info(`Wrote ${publicPages.length} Japanese pages under /ja/`);
      },
    },
  };
}
