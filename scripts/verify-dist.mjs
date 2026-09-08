import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteConfig } from '../site-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) throw new Error('dist/ does not exist. Run npm run build first.');

const required = [
  'index.html',
  'qtable/index.html',
  'qtable-ui/index.html',
  'examples/index.html',
  'roadmap/index.html',
  'docs/index.html',
  'docs/getting-started/quick-start/index.html',
  'docs/getting-started/self-hosting/index.html',
  'docs/qtable/overview/index.html',
  'docs/qtable/security/index.html',
  'docs/qtable-ui/overview/index.html',
  'docs/project/release-status/index.html',
  '404.html',
];

for (const rel of required) {
  if (!fs.existsSync(path.join(dist, rel))) throw new Error(`Missing expected build output: ${rel}`);
}

const { base: configuredBase } = resolveSiteConfig();
const base = configuredBase === '/' ? '/' : `${configuredBase.replace(/\/$/, '')}/`;

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(dist);

const unresolved = [];
const forbidden = [];
const attrRe = /(?:href|src)=(?:"|')([^"']+)(?:"|')/g;

function targetExists(urlPath) {
  let clean = urlPath.split('#')[0].split('?')[0];
  if (!clean) return true;
  if (base !== '/' && clean.startsWith(base)) clean = `/${clean.slice(base.length)}`;
  if (!clean.startsWith('/')) return true;
  const relative = clean.replace(/^\//, '');
  const candidates = [
    path.join(dist, relative),
    path.join(dist, relative, 'index.html'),
    path.join(dist, relative.replace(/\/$/, ''), 'index.html'),
  ];
  return candidates.some(fs.existsSync);
}

for (const file of htmlFiles) {
  const rel = path.relative(dist, file);
  const html = fs.readFileSync(file, 'utf8');
  if (/\b(TODO|FIXME)\b/i.test(html)) forbidden.push(`${rel}: contains TODO/FIXME`);

  // Starlight intentionally emits edit links to the current source repository.
  // The source-level verifier is responsible for preventing hard-coded temporary
  // owner/repository paths in application source; generated HTML may legitimately
  // contain the current repository URL.
  for (const match of html.matchAll(attrRe)) {
    const value = match[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(value)) continue;
    let resolved;
    if (value.startsWith('/')) resolved = value;
    else {
      const pageDir = `/${path.dirname(rel).replaceAll(path.sep, '/')}/`;
      resolved = new URL(value, `https://local.invalid${pageDir}`).pathname;
    }
    if (!targetExists(resolved)) unresolved.push(`${rel} -> ${value}`);
  }
}

if (forbidden.length) throw new Error(`Forbidden generated content:\n${forbidden.join('\n')}`);
if (unresolved.length) throw new Error(`Unresolved internal links/assets:\n${unresolved.slice(0, 50).join('\n')}`);

console.log(`Verified ${htmlFiles.length} HTML files and required portal routes.`);
