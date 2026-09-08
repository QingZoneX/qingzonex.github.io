import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(root, 'src/content/docs/docs');
const markdownFiles = [];
walk(docsRoot);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) markdownFiles.push(full);
  }
}

function routeFor(file) {
  const rel = path.relative(docsRoot, file).replaceAll(path.sep, '/').replace(/\.(?:md|mdx)$/, '');
  const route = rel === 'index' ? '/docs/' : `/docs/${rel.replace(/\/index$/, '')}/`;
  return route.replace(/\/+/g, '/');
}

const knownRoutes = new Set(markdownFiles.map(routeFor));
const errors = [];
const markdownLink = /\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;

for (const file of markdownFiles) {
  const sourceRoute = routeFor(file);
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(markdownLink)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(target)) continue;

    let url;
    try {
      url = new URL(target, `https://portal.invalid${sourceRoute}`);
    } catch {
      errors.push(`${path.relative(root, file)}: invalid link ${target}`);
      continue;
    }

    const pathname = decodeURI(url.pathname).replace(/\/+/g, '/');
    if (!pathname.startsWith('/docs/')) continue;

    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    if (!knownRoutes.has(normalized)) {
      errors.push(`${path.relative(root, file)}: ${target} resolves to missing route ${normalized}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Documentation links verified across ${markdownFiles.length} Markdown files.`);
