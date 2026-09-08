import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localeRoots = [
  { code:'zh-cn', dir:path.join(root,'src/content/docs/docs'), prefix:'' },
  { code:'zh-tw', dir:path.join(root,'src/content/docs/zh-tw/docs'), prefix:'/zh-tw' },
  { code:'en', dir:path.join(root,'src/content/docs/en/docs'), prefix:'/en' },
];
const entries=[];
function walk(dir, rootDir, locale) { for(const entry of fs.readdirSync(dir,{withFileTypes:true})){ const full=path.join(dir,entry.name); if(entry.isDirectory()) walk(full,rootDir,locale); else if(/\.mdx?$/.test(entry.name)) entries.push({file:full,rootDir,locale}); } }
for(const locale of localeRoots) walk(locale.dir,locale.dir,locale);
function routeFor(item){ const rel=path.relative(item.rootDir,item.file).replaceAll(path.sep,'/').replace(/\.(?:md|mdx)$/,''); const local=rel==='index'?'/docs/':`/docs/${rel.replace(/\/index$/,'')}/`; return `${item.locale.prefix}${local}`.replace(/\/+/g,'/'); }
const knownRoutes=new Set(entries.map(routeFor)); const errors=[]; const markdownLink=/\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
for(const item of entries){ const sourceRoute=routeFor(item); const text=fs.readFileSync(item.file,'utf8'); for(const match of text.matchAll(markdownLink)){ const target=match[1]; if(/^(?:https?:|mailto:|tel:|#)/i.test(target)) continue; let url; try{url=new URL(target,`https://portal.invalid${sourceRoute}`)}catch{errors.push(`${path.relative(root,item.file)}: invalid link ${target}`);continue;} const pathname=decodeURI(url.pathname).replace(/\/+/g,'/'); if(!pathname.includes('/docs/')) continue; const normalized=pathname.endsWith('/')?pathname:`${pathname}/`; if(!knownRoutes.has(normalized)) errors.push(`${path.relative(root,item.file)}: ${target} resolves to missing route ${normalized}`); }}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Documentation links verified across ${entries.length} localized Markdown files.`);
