# Deployment and repository transfer

This portal is designed to move from the temporary private repository to the QingZoneX organization without changing application routes or hard-coding an owner.

## 1. Private development in `boychina/qingzonex.github.io`

Keep the repository private while the portal is under development. The CI workflow runs source installation, a production Astro build, and generated-link verification on every branch and pull request.

The Pages deployment job is intentionally disabled while the repository is private. This prevents accidentally publishing a work-in-progress portal.

The current repository name is a **project site** for the `boychina` account, so builds executed by GitHub Actions automatically use:

```text
site: https://boychina.github.io
base: /qingzonex.github.io/
```

No source code needs to be edited for that temporary location.

## 2. Transfer to the QingZoneX organization

Transfer the repository to the `QingZoneX` organization and keep the repository name exactly:

```text
qingzonex.github.io
```

After transfer, the build automatically detects that the repository is the organization Pages repository and switches to:

```text
site: https://qingzonex.github.io
base: /
```

The portal, documentation, assets, canonical URLs, Open Graph images, and internal navigation all use the detected base path. No route rewrite is required.

## 3. Public launch on GitHub Pages

When the first open-source release is ready:

1. Make `QingZoneX/qingzonex.github.io` public.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or manually run **Deploy to GitHub Pages**.
5. Confirm the deployment environment URL is `https://qingzonex.github.io/`.
6. Confirm `/docs/`, `/qtable/`, `/qtable-ui/`, `/examples/`, and `/roadmap/` render correctly.

The deployment workflow always builds the site, but the actual Pages deployment job only runs when the repository is public.

## 4. Custom domain later

The source already supports a future custom domain. When one is selected:

1. Configure the domain in **Settings → Pages** and complete GitHub's DNS verification steps.
2. Add the repository-level **Actions variable** `SITE_URL` (Settings → Secrets and variables → Actions → Variables), for example:

   ```text
   SITE_URL=https://qingzonex.com
   ```

3. If GitHub Pages requires a `CNAME` file for the chosen setup, add `public/CNAME` containing only the hostname.
4. Re-run the Pages deployment.

When `SITE_URL` is present, the Astro build uses `/` as its base automatically.

## 5. Dependency lockfile

Direct framework versions are pinned in `package.json`. This package does not currently include `package-lock.json` only because the initial package install could not be performed in the construction environment.

On the first machine or CI environment with npm registry access, run:

```bash
npm install
npm run build
npm run verify:dist
```

Then commit the generated `package-lock.json`. From that point onward CI automatically uses `npm ci` for reproducible installs.

## Release checklist

Before making the portal public, verify all of the following:

- QTable and QTableUI release status shown on the portal matches the repositories.
- Product claims still match implemented capabilities.
- License links and contribution links resolve.
- `npm run build` succeeds on Node 22.
- `npm run verify:dist` succeeds.
- No secrets or private API endpoints appear in source or generated HTML.
- GitHub Pages source is set to GitHub Actions.
- The deployment URL and canonical URLs use the intended owner/domain.
- Mobile navigation, theme switching, Docs search, and the interactive product tour work in the deployed site.
