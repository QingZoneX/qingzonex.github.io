# QingZoneX Portal

Official portal and documentation site for **QTable**, QingZoneX's open-source, AI-native project and work management product.

QTable is one product implemented across two public repositories:

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — FastAPI / Strawberry GraphQL backend, domain services, permissions, automation, auditability, attachments, search, OAuth and AI services;
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — React web application for work centers, Grid / Kanban / Gantt / Calendar / Gallery, dashboards, collaboration, automation and AI workflows.

Repository names are engineering boundaries, not separate products. Portal copy, documentation and links must stay centered on the QTable product while identifying `qtable-server` and `qtable-web` precisely when source ownership matters.

The current source baseline is **`v0.1.1-alpha` / Open Source Preview** and both source repositories are public. A public source repository does not by itself imply that a GitHub Release or registry artifact has been published, so release documentation must keep source status and published artifacts distinct.

## Stack

- Astro 7
- Starlight
- Static output for GitHub Pages
- Simplified Chinese, Traditional Chinese and English
- No runtime database or server dependency for the portal
- Vanilla JavaScript for the interactive product tour

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Local development

```bash
npm ci
npm run dev
```

## Production verification

```bash
npm ci
npm run verify:config
npm run verify:source
npm run verify:i18n
npm run verify:links
npm run build
npm run verify:dist
npm run verify:transfer
```

`verify:transfer` performs a second Astro/Starlight production build using the canonical `QingZoneX/qingzonex.github.io` repository identity. It verifies root Pages paths, localized routes, internal links/assets, canonical origin and Starlight edit links.

## GitHub Pages deployment

`QingZoneX/qingzonex.github.io` is the organization Pages repository and deploys from the root base `/` through GitHub Actions. A future custom domain can be configured with the `SITE_URL` Actions variable without rewriting application routes.

See [DEPLOYMENT.md](DEPLOYMENT.md) and [LOCALIZATION.md](LOCALIZATION.md).

## Content contract

Portal claims are checked against the current `qtable-server` and `qtable-web` source, version files, release evidence and GitHub Issues while preserving the single-product QTable model.

When the implementation repositories change names, versions, runtime requirements or delivered capabilities, update all three locales together and keep source links canonical. Do not present roadmap items as shipped features, and do not present a source-preview branch as a published release artifact.

## License

The source code and documentation in this repository are licensed under the [Apache License, Version 2.0](LICENSE), unless otherwise noted.

See [NOTICE](NOTICE) for project attribution and brand-use information. Third-party software, dependencies, fonts, icons, images, and other assets remain subject to their respective licenses and attribution terms.

The Apache License 2.0 does not grant permission to use QingZoneX trade names, trademarks, service marks, product names, logos, or other brand assets except as permitted by Section 6 of the license and applicable law.
