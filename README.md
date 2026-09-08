# QingZoneX Portal

Official portal and documentation site for the Phase 1 QingZoneX open-source preview: **QTable** and **QTableUI**.

## Stack

- Astro 7
- Starlight
- Static output for GitHub Pages
- No runtime database or server dependency
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
npm run verify:links
npm run build
npm run verify:dist
npm run verify:transfer
```

`verify:transfer` performs a second real Astro/Starlight production build while simulating the final `QingZoneX/qingzonex.github.io` repository. It verifies the root Pages base path, required routes, internal links/assets, QingZoneX canonical origin and Starlight edit links before the repository is transferred.

## GitHub Pages deployment

The repository automatically adapts its base path:

- `boychina/qingzonex.github.io` → project-site base `/qingzonex.github.io/`
- `QingZoneX/qingzonex.github.io` → organization Pages root `/`
- custom domain later → set Actions variable `SITE_URL`, root `/`

No application route rewrite is required during transfer.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the exact private-development, organization-transfer, public-launch and custom-domain procedure.

## Reproducible installs

`package-lock.json` is committed. CI and Pages deployment use `npm ci`; dependency changes must update `package.json` and the lockfile in the same change.

## Content contract

Portal claims should track current QTable/QTableUI README, release notes and GitHub Issues. The website intentionally distinguishes implemented baseline capabilities from active Alpha hardening and future roadmap work.

## License

QTable and QTableUI currently declare Apache License 2.0. Choose the portal repository license explicitly before making this repository public.
