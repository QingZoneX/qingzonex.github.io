# QingZoneX Portal

Official portal and documentation site for **QTable**, the first open-source QingZoneX product.

QTable is presented as one product with two implementation repositories:

- `QingZoneX/QTable` — backend API, domain services, permissions, automation, storage, auditability and AI;
- `QingZoneX/QTableUI` — the QTable Web App frontend implementation.

The portal must not present QTableUI as a second product. Repository names are engineering boundaries; product messaging stays centered on QTable.

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

`verify:transfer` performs a second real Astro/Starlight production build while simulating the final `QingZoneX/qingzonex.github.io` repository. It verifies root Pages paths, localized routes, internal links/assets, canonical origin and Starlight edit links before repository transfer.

## GitHub Pages deployment

The repository automatically adapts its base path:

- `boychina/qingzonex.github.io` → project-site base `/qingzonex.github.io/`
- `QingZoneX/qingzonex.github.io` → organization Pages root `/`
- custom domain later → set Actions variable `SITE_URL`, root `/`

No application route rewrite is required during transfer.

See [DEPLOYMENT.md](DEPLOYMENT.md) and [LOCALIZATION.md](LOCALIZATION.md).

## Content contract

Portal claims track current QTable/QTableUI source, release notes and GitHub Issues while preserving the single-product model. QTableUI may be named as the frontend implementation repository, but never as a parallel product in primary navigation or product positioning.

## License

QTable currently uses Apache License 2.0. Choose the portal repository license explicitly before making this repository public.
