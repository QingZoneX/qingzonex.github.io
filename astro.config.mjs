import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { resolveSiteConfig } from './site-config.mjs';
import { localeBootstrapScript } from './src/lib/i18n.mjs';

const { site, base, sourceRepository } = resolveSiteConfig();
const PORTAL_FAVICON = base === '/' ? '/favicon.svg' : `${base}/favicon.svg`;
const label = (zhCn, zhTw, en) => ({ label: zhCn, translations: { 'zh-TW': zhTw, en } });

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: { 'zh-CN': 'QTable 文档', 'zh-TW': 'QTable 說明文件', en: 'QTable Docs' },
      description: 'Documentation for the QTable open-source product across its web, API, data, security and self-hosting layers.',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
        en: { label: 'English', lang: 'en' },
      },
      favicon: PORTAL_FAVICON,
      disable404Route: true,
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/QingZoneX' }],
      editLink: { baseUrl: `https://github.com/${sourceRepository}/edit/main/` },
      customCss: ['./src/styles/starlight.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://avatars.githubusercontent.com', crossorigin: '' } },
        { tag: 'script', attrs: { 'data-qingzonex-i18n': 'bootstrap' }, content: localeBootstrapScript(base) },
      ],
      components: {
        LanguageSelect: './src/components/StarlightLanguageSwitcher.astro',
        SiteTitle: './src/components/StarlightSiteTitle.astro',
        ThemeSelect: './src/components/StarlightThemeSwitcher.astro',
      },
      sidebar: [
        { ...label('门户', '入口網站', 'Portal'), link: '/' },
        { ...label('开始', '開始', 'Start here'), items: [{ slug: 'docs' }, { slug: 'docs/getting-started/quick-start' }, { slug: 'docs/getting-started/self-hosting' }, { slug: 'docs/getting-started/production-checklist' }] },
        { label: 'QTable', items: [{ slug: 'docs/qtable/overview' }, { slug: 'docs/qtable/architecture' }, { slug: 'docs/qtable/ai-workflows' }, { slug: 'docs/qtable/security' }, { slug: 'docs/qtable/attachments' }, { slug: 'docs/qtable-ui/overview' }, { slug: 'docs/qtable-ui/development' }] },
        { ...label('项目', '專案', 'Project'), items: [{ slug: 'docs/project/feature-matrix' }, { slug: 'docs/project/release-status' }, { slug: 'docs/project/contributing' }] },
      ],
    }),
  ],
});
