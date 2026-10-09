import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { resolveSiteConfig } from './site-config.mjs';
import { localeBootstrapScript } from './src/lib/i18n.mjs';

const { site, base, sourceRepository } = resolveSiteConfig();
const ORG_AVATAR_URL = 'https://avatars.githubusercontent.com/u/280868418?v=4';
const ORG_AVATAR_FAVICON_URL = 'https://avatars.githubusercontent.com/u/280868418.png';
const label = (zhCn, zhTw, en, ar, fr, ru, ja, ko) => ({
  label: zhCn,
  translations: { 'zh-CN': zhCn, 'zh-TW': zhTw, en, ar, fr, ru, ja, ko },
});

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: {
        'zh-CN': 'QTable 文档',
        'zh-TW': 'QTable 說明文件',
        en: 'QTable Docs',
        ar: 'وثائق QTable',
        fr: 'Documentation QTable',
        ru: 'Документация QTable',
        ja: 'QTable ドキュメント',
        ko: 'QTable 문서',
      },
      description: 'Documentation for the QTable open-source product across its web, API, data, security and self-hosting layers.',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
        en: { label: 'English', lang: 'en' },
        ar: { label: 'العربية', lang: 'ar' },
        fr: { label: 'Français', lang: 'fr' },
        ru: { label: 'Русский', lang: 'ru' },
        ja: { label: '日本語', lang: 'ja' },
        ko: { label: '한국어', lang: 'ko' },
      },
      favicon: ORG_AVATAR_FAVICON_URL,
      disable404Route: true,
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/QingZoneX' }],
      editLink: { baseUrl: `https://github.com/${sourceRepository}/edit/main/` },
      customCss: ['./src/styles/starlight.css'],
      head: [
        { tag: 'link', attrs: { rel: 'preconnect', href: 'https://avatars.githubusercontent.com', crossorigin: '' } },
        { tag: 'link', attrs: { rel: 'icon', href: ORG_AVATAR_URL, type: 'image/png' } },
        { tag: 'script', attrs: { 'data-qingzonex-i18n': 'bootstrap' }, content: localeBootstrapScript(base) },
      ],
      components: {
        LanguageSelect: './src/components/StarlightLanguageSwitcher.astro',
        SiteTitle: './src/components/StarlightSiteTitle.astro',
        ThemeSelect: './src/components/StarlightThemeSwitcher.astro',
      },
      sidebar: [
        { ...label('门户', '入口網站', 'Portal', 'البوابة', 'Portail', 'Портал', 'ポータル', '포털'), link: '/' },
        { ...label('技术博客', '技術部落格', 'Engineering Blog', 'مدونة الهندسة', "Blog d'ingénierie", 'Инженерный блог', 'エンジニアリングブログ', '엔지니어링 블로그'), link: '/blog/' },
        { ...label('开始', '開始', 'Start here', 'ابدأ من هنا', 'Pour commencer', 'Начните здесь', 'はじめに', '시작하기'), items: [{ slug: 'docs' }, { slug: 'docs/getting-started/quick-start' }, { slug: 'docs/getting-started/self-hosting' }, { slug: 'docs/getting-started/production-checklist' }] },
        { label: 'QTable', items: [{ slug: 'docs/qtable/overview' }, { slug: 'docs/qtable/architecture' }, { slug: 'docs/qtable/ai-workflows' }, { slug: 'docs/qtable/security' }, { slug: 'docs/qtable/attachments' }, { slug: 'docs/qtable-ui/overview' }, { slug: 'docs/qtable-ui/development' }] },
        { ...label('项目', '專案', 'Project', 'المشروع', 'Projet', 'Проект', 'プロジェクト', '프로젝트'), items: [{ slug: 'docs/project/feature-matrix' }, { slug: 'docs/project/release-status' }, { slug: 'docs/project/contributing' }] },
      ],
    }),
  ],
});
