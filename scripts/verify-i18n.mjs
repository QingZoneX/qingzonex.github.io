import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, ensureTrailingSlash, inferLocaleFromPath, localeBootstrapScript, localePath, normalizeLocaleTag, resolvePreferredLocale } from '../src/lib/i18n.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const expect = (actual, expected, label) => { if (actual !== expected) errors.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`); };

for (const [input, expected] of [['zh-CN','zh-cn'],['zh-SG','zh-cn'],['zh-Hans','zh-cn'],['zh','zh-cn'],['zh-TW','zh-tw'],['zh-HK','zh-tw'],['zh-MO','zh-tw'],['zh-Hant','zh-tw'],['en-US','en'],['en-GB','en'],['fr-FR',undefined]]) expect(normalizeLocaleTag(input), expected, `normalize ${input}`);
expect(resolvePreferredLocale('en',['zh-CN']), 'en', 'stored locale overrides browser');
expect(resolvePreferredLocale(null,['zh-HK','en-US']), 'zh-tw', 'browser language order');
expect(resolvePreferredLocale(null,['fr-FR']), DEFAULT_LOCALE, 'unsupported browser fallback');
expect(ensureTrailingSlash('/zh-tw'), '/zh-tw/', 'trailing slash helper');
expect(localePath('zh-cn','','/'), '/', 'root zh-cn homepage');
expect(localePath('zh-tw','','/'), '/zh-tw/', 'root zh-tw homepage');
expect(localePath('en','','/'), '/en/', 'root en homepage');
expect(localePath('zh-cn','docs/','/'), '/docs/', 'root zh-cn path');
expect(localePath('zh-tw','docs/','/'), '/zh-tw/docs/', 'root zh-tw path');
expect(localePath('en','qtable/','/qingzonex.github.io/'), '/qingzonex.github.io/en/qtable/', 'project-site en path');
expect(localePath('zh-tw','','/qingzonex.github.io/'), '/qingzonex.github.io/zh-tw/', 'project-site zh-tw homepage');
expect(localePath('en','','/qingzonex.github.io/'), '/qingzonex.github.io/en/', 'project-site en homepage');
expect(inferLocaleFromPath('/qingzonex.github.io/zh-tw/docs/','/qingzonex.github.io/'), 'zh-tw', 'infer zh-tw with base');
expect(inferLocaleFromPath('/qingzonex.github.io/en/docs/','/qingzonex.github.io/'), 'en', 'infer en with base');
expect(inferLocaleFromPath('/qingzonex.github.io/docs/','/qingzonex.github.io/'), 'zh-cn', 'infer root locale with base');

const portalPages = ['index.astro','qtable.astro','qtable-ui.astro','examples.astro','roadmap.astro'];
for (const page of portalPages) {
  for (const prefix of ['', 'en', 'zh-tw']) {
    const file = path.join(root, 'src/pages', prefix, page);
    if (!fs.existsSync(file)) errors.push(`missing localized portal page: ${path.relative(root,file)}`);
  }
}

function markdownSet(dir) {
  const out=[];
  const walk=(current)=>{ for(const entry of fs.readdirSync(current,{withFileTypes:true})){ const full=path.join(current,entry.name); if(entry.isDirectory()) walk(full); else if(/\.mdx?$/.test(entry.name)) out.push(path.relative(dir,full).replaceAll(path.sep,'/')); }};
  walk(dir); return out.sort();
}
const docRoots = [path.join(root,'src/content/docs/docs'),path.join(root,'src/content/docs/zh-tw/docs'),path.join(root,'src/content/docs/en/docs')];
if (docRoots.every(fs.existsSync)) {
  const baseline=markdownSet(docRoots[0]);
  for (const dir of docRoots.slice(1)) {
    const current=markdownSet(dir);
    if (JSON.stringify(current)!==JSON.stringify(baseline)) errors.push(`documentation locale parity mismatch for ${path.relative(root,dir)}`);
  }
} else errors.push('one or more localized documentation roots are missing');

const contentSource=fs.readFileSync(path.join(root,'src/lib/portal-content.ts'),'utf8');
for(const marker of ["'zh-cn':", "'zh-tw':", 'en: {']) if(!contentSource.includes(marker)) errors.push(`portal content dictionary missing ${marker}`);

const switcherPath = path.join(root, 'src/components/LocaleSwitcher.astro');
const starlightSwitcherPath = path.join(root, 'src/components/StarlightLanguageSwitcher.astro');
for (const file of [switcherPath, starlightSwitcherPath]) if (!fs.existsSync(file)) errors.push(`missing language switcher component: ${path.relative(root, file)}`);
if (fs.existsSync(switcherPath)) {
  const switcher = fs.readFileSync(switcherPath, 'utf8');
  for (const marker of ['data-locale-trigger','data-locale-menu','data-locale-option','aria-haspopup="menu"','role="menuitemradio"','ArrowDown','Escape']) if (!switcher.includes(marker)) errors.push(`custom locale switcher missing behavior marker: ${marker}`);
}
const astroConfig = fs.readFileSync(path.join(root,'astro.config.mjs'),'utf8');
if (!astroConfig.includes("LanguageSelect: './src/components/StarlightLanguageSwitcher.astro'")) errors.push('Starlight is not configured to use the shared custom language switcher.');

const bootstrap=localeBootstrapScript('/qingzonex.github.io/');
for(const marker of [LOCALE_STORAGE_KEY,'navigator.languages','starlight-lang-select','data-locale-option','location.search','location.hash',"addEventListener('storage'",'ensureSlash']) if(!bootstrap.includes(marker)) errors.push(`locale bootstrap missing behavior marker: ${marker}`);
if (!bootstrap.includes("pathname + '/'")) errors.push('locale bootstrap does not enforce a trailing slash for generated page routes.');

if(errors.length){ console.error(errors.join('\n')); process.exit(1); }
console.log(`i18n contract verified: 3 portal locales, ${markdownSet(docRoots[0]).length} docs per locale, trailing-slash-safe routes, browser detection, persisted preference and accessible custom switchers.`);
