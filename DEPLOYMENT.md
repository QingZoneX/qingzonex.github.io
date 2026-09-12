# Deployment

This repository is the canonical QingZoneX organization portal at `QingZoneX/qingzonex.github.io`. It is designed for GitHub Pages root deployment and for an optional future custom domain without application-route rewrites.

## 1. Release gate

Before merging a portal change to `main`, run the same checks as CI:

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

The verification suite covers reproducible installation, site configuration, source imports and required files, documentation links, multilingual route parity, generated assets, canonical paths and the organization Pages build.

## 2. Product-source verification

Portal product claims must be reviewed against the two current public implementation repositories:

- `QingZoneX/qtable-server` — API, domain services, data model, permissions, automation, auditability, attachments, search, OAuth and AI services;
- `QingZoneX/qtable-web` — React web application, work centers, five views, dashboards, collaboration, automation and AI interactions.

Both repositories currently carry the `0.1.0-alpha` source baseline. Public repository visibility and a source version do not automatically mean that a GitHub Release, Docker image or other distribution artifact has been published. The portal must distinguish those states explicitly.

Before deployment, verify that repository names, source links, runtime requirements, feature claims, security guidance and release status in all three portal locales still match repository reality.

## 3. GitHub Pages deployment

The canonical deployment identity is:

```text
site: https://qingzonex.github.io
base: /
source repository: QingZoneX/qingzonex.github.io
```

In GitHub:

1. Keep **Settings → Pages → Source** set to **GitHub Actions**.
2. Merge only a verified portal revision to `main`.
3. Confirm the **Deploy to GitHub Pages** workflow builds and publishes that exact revision.
4. Verify the deployment environment reports `https://qingzonex.github.io/`.
5. Verify these routes:
   - `/`
   - `/qtable/`
   - `/qtable-ui/` (legacy redirect kept for compatibility)
   - `/examples/`
   - `/roadmap/`
   - `/docs/`
   - `/docs/project/feature-matrix/`
   - `/docs/project/release-status/`
   - `/docs/getting-started/quick-start/`
   - `/docs/getting-started/self-hosting/`
   - `/docs/getting-started/production-checklist/`
6. Verify Docs search, dark/light theme, mobile navigation, language persistence, 404 behavior and the interactive table tour.
7. Inspect page source for a `https://qingzonex.github.io/` canonical origin and confirm Docs **Edit page** links point to `QingZoneX/qingzonex.github.io`.
8. Confirm all product-source links resolve to `QingZoneX/qtable-server` or `QingZoneX/qtable-web`, not retired repository names.

## 4. Custom domain later

When a custom domain is selected:

1. Configure it under **Settings → Pages** and complete GitHub DNS verification.
2. Add repository Actions variable `SITE_URL`, for example `https://qingzonex.com`.
3. Add `public/CNAME` only if required by the chosen GitHub Pages setup.
4. Re-run the Pages deployment and verify canonical URLs, localized alternate links and Docs edit links.

`SITE_URL` keeps the Astro base at `/` and becomes the canonical site origin.

## 5. Dependency reproducibility

`package-lock.json` is committed and CI/deploy use `npm ci`. When dependencies intentionally change, update `package.json` and regenerate/commit the lockfile together.

## Final release checklist

- `qtable-server` / `qtable-web` repository names and links are current in all locales.
- QTable version and source/release status match repository reality.
- Feature Matrix distinguishes implemented baseline, active hardening and future roadmap.
- Security and contribution links point to the correct implementation repository.
- Quick Start and self-hosting examples use the current clone paths and directory names.
- Portal CI is green on the exact commit intended for deployment.
- `npm run verify:transfer` passes for the organization Pages identity.
- No secrets, private endpoints or development-only credentials are present.
- Settings → Pages uses GitHub Actions.
- The final Pages deployment is green and root/canonical/edit/source links are verified.
