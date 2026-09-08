import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteConfig } from '../site-config.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'); const dist=path.join(root,'dist'); if(!fs.existsSync(dist)) throw new Error('dist/ does not exist. Run npm run build first.');
const portal=['','qtable/','qtable-ui/','examples/','roadmap/'];
const docs=['docs/','docs/getting-started/quick-start/','docs/getting-started/self-hosting/','docs/getting-started/production-checklist/','docs/qtable/overview/','docs/qtable/architecture/','docs/qtable/ai-workflows/','docs/qtable/security/','docs/qtable/attachments/','docs/qtable-ui/overview/','docs/qtable-ui/development/','docs/project/feature-matrix/','docs/project/release-status/','docs/project/contributing/'];
const locales=[{prefix:'',lang:'zh-CN'},{prefix:'zh-tw/',lang:'zh-TW'},{prefix:'en/',lang:'en'}];
const routeFile=(prefix,route)=>route?`${prefix}${route}index.html`:`${prefix}index.html`;
const required=['404.html',...locales.flatMap(l=>[...portal,...docs].map(r=>routeFile(l.prefix,r)))];
for(const rel of required) if(!fs.existsSync(path.join(dist,rel))) throw new Error(`Missing expected localized build output: ${rel}`);
for(const locale of locales){ for(const route of ['','docs/']){ const rel=routeFile(locale.prefix,route); const html=fs.readFileSync(path.join(dist,rel),'utf8'); if(!new RegExp(`<html[^>]+lang=["']${locale.lang}["']`,'i').test(html)) throw new Error(`${rel} does not declare lang=${locale.lang}`); if(!html.includes('qingzonex.locale.v1')) throw new Error(`${rel} is missing locale preference bootstrap.`); if(!route && !/hreflang=["']zh-CN["']/i.test(html)) throw new Error(`${rel} is missing zh-CN hreflang.`); if(!route && !/hreflang=["']zh-TW["']/i.test(html)) throw new Error(`${rel} is missing zh-TW hreflang.`); if(!route && !/hreflang=["']en["']/i.test(html)) throw new Error(`${rel} is missing en hreflang.`); }}
const {base:configuredBase}=resolveSiteConfig(); const base=configuredBase==='/'?'/':`${configuredBase.replace(/\/$/,'')}/`; const htmlFiles=[]; function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))htmlFiles.push(full)}} walk(dist);
const unresolved=[]; const forbidden=[]; const attrRe=/(?:href|src)=(?:"|')([^"']+)(?:"|')/g;
function targetExists(urlPath){let clean=urlPath.split('#')[0].split('?')[0];if(!clean)return true;if(base!=='/'&&clean.startsWith(base))clean=`/${clean.slice(base.length)}`;if(!clean.startsWith('/'))return true;const relative=clean.replace(/^\//,'');return[path.join(dist,relative),path.join(dist,relative,'index.html'),path.join(dist,relative.replace(/\/$/,''),'index.html')].some(fs.existsSync)}
for(const file of htmlFiles){const rel=path.relative(dist,file);const html=fs.readFileSync(file,'utf8');if(/\b(TODO|FIXME)\b/i.test(html))forbidden.push(`${rel}: contains TODO/FIXME`);for(const match of html.matchAll(attrRe)){const value=match[1];if(/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(value))continue;let resolved;if(value.startsWith('/'))resolved=value;else{const pageDir=`/${path.dirname(rel).replaceAll(path.sep,'/')}/`;resolved=new URL(value,`https://local.invalid${pageDir}`).pathname}if(!targetExists(resolved))unresolved.push(`${rel} -> ${value}`)}}
if(forbidden.length)throw new Error(`Forbidden generated content:\n${forbidden.join('\n')}`);if(unresolved.length)throw new Error(`Unresolved internal links/assets:\n${unresolved.slice(0,80).join('\n')}`);
console.log(`Verified ${htmlFiles.length} HTML files, 3 locale trees, localized lang metadata and required portal/docs routes.`);
