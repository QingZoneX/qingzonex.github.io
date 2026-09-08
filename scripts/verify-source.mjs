import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoots = ['src', 'scripts'];
const files = [];
for (const dirName of sourceRoots) walk(path.join(root, dirName));

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
}

const errors = [];
const importRe = /(?:import\s+[^'";]+?\s+from\s+|import\s*)['"](\.{1,2}\/[^'"]+)['"]/g;
const extensions = ['', '.ts', '.js', '.mjs', '.astro', '.css', '.svg', '/index.ts', '/index.js', '/index.astro'];

for (const file of files.filter((f) => /\.(astro|ts|js|mjs)$/.test(f))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(importRe)) {
    const target = path.resolve(path.dirname(file), match[1]);
    if (!extensions.some((ext) => fs.existsSync(target + ext))) {
      errors.push(`${path.relative(root, file)}: unresolved local import ${match[1]}`);
    }
  }
}

const required = [
  'astro.config.mjs',
  'src/content.config.ts',
  'src/pages/index.astro',
  'src/pages/qtable.astro',
  'src/pages/qtable-ui.astro',
  'src/pages/examples.astro',
  'src/pages/roadmap.astro',
  'src/pages/404.astro',
  'src/content/docs/docs/index.md',
  '.github/workflows/ci.yml',
  '.github/workflows/deploy.yml',
  'public/favicon.svg',
  'public/og.svg',
];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) errors.push(`missing required file: ${rel}`);

for (const file of files.filter((f) => /\.(astro|ts|js|mjs|css|md)$/.test(f))) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, 'utf8');
  if (!rel.startsWith('scripts/') && /\b(TODO|FIXME)\b/i.test(text)) errors.push(`${rel}: contains TODO/FIXME`);
  if (!rel.startsWith('scripts/') && /boychina\/qingzonex\.github\.io/i.test(text)) errors.push(`${rel}: hard-codes temporary repository owner/path`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Source verification passed for ${files.length} project files.`);
