import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { resolveSiteConfig } from './site-config.mjs';

const { site, base, sourceRepository } = resolveSiteConfig();

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'QingZoneX Docs',
      description: 'Documentation for the QTable and QTableUI Phase 1 open-source preview.',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      disable404Route: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/QingZoneX' },
      ],
      editLink: { baseUrl: `https://github.com/${sourceRepository}/edit/main/` },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        { label: 'Portal', link: '/' },
        {
          label: 'Start here',
          items: [
            { slug: 'docs' },
            { slug: 'docs/getting-started/quick-start' },
            { slug: 'docs/getting-started/self-hosting' },
            { slug: 'docs/getting-started/production-checklist' },
          ],
        },
        {
          label: 'QTable',
          items: [
            { slug: 'docs/qtable/overview' },
            { slug: 'docs/qtable/architecture' },
            { slug: 'docs/qtable/ai-workflows' },
            { slug: 'docs/qtable/security' },
            { slug: 'docs/qtable/attachments' },
          ],
        },
        {
          label: 'QTableUI',
          items: [
            { slug: 'docs/qtable-ui/overview' },
            { slug: 'docs/qtable-ui/development' },
          ],
        },
        {
          label: 'Project',
          items: [
            { slug: 'docs/project/feature-matrix' },
            { slug: 'docs/project/release-status' },
            { slug: 'docs/project/contributing' },
          ],
        },
      ],
    }),
  ],
});
