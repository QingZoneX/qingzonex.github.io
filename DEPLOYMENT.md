# Deployment and repository transfer

This portal is designed to move from the temporary private repository to the QingZoneX organization without changing application routes or hard-coding the temporary owner.

## 1. Private development gate

Keep `boychina/qingzonex.github.io` private while the portal is under development. Pull request CI verifies:

- reproducible `npm ci` installation;
- deployment configuration;
- source imports and required files;
- documentation links;
- a production build for the current personal-repository Pages path;
- generated routes, internal links and assets;
- a second production build simulating `QingZoneX/qingzonex.github.io` at the Pages root.

Run the same transfer proof locally with:

```bash
npm ci
npm run verify:transfer
```

The current personal repository is treated as a GitHub **project site**:

```text
site: https://boychina.github.io
base: /qingzonex.github.io/
```

The transfer verification separately proves the final organization mode:

```text
site: https://qingzonex.github.io
base: /
source repository: QingZoneX/qingzonex.github.io
```

## 2. Before transferring ownership

1. Ensure PR CI is green, including **Verify QingZoneX organization Pages transfer**.
2. Review product claims against the latest QTable/QTableUI README, release notes and release-gate Issues.
3. Merge the intended portal branch to `main` only when it is the version you want to move.
4. Confirm the destination repository name will remain exactly `qingzonex.github.io`.
5. Keep a local clone or tag/commit SHA for the transfer point.

## 3. Transfer to QingZoneX

In GitHub:

1. Open the repository **Settings → General**.
2. In the transfer-ownership section, transfer the repository to the `QingZoneX` organization.
3. Keep the repository name `qingzonex.github.io`.
4. Confirm the default branch remains `main` and that Actions are enabled by organization policy.
5. Re-open the repository under `QingZoneX/qingzonex.github.io` and check the latest CI/workflow files are present.

The application code does not need a path rewrite. `site-config.mjs` detects the organization Pages repository and switches to the root base automatically. Starlight edit links also use the runtime repository identity.

## 4. Public GitHub Pages launch

When the open-source release is ready:

1. Make `QingZoneX/qingzonex.github.io` public.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Run **Deploy to GitHub Pages** or push the final release commit to `main`.
5. Confirm the deployment environment reports `https://qingzonex.github.io/`.
6. Verify these routes:
   - `/`
   - `/qtable/`
   - `/qtable-ui/`
   - `/examples/`
   - `/roadmap/`
   - `/docs/`
   - `/docs/project/feature-matrix/`
   - `/docs/getting-started/production-checklist/`
7. Verify Docs search, dark/light theme, mobile navigation, 404 behavior and the interactive table tour.
8. Inspect page source for a `https://qingzonex.github.io/` canonical origin and confirm Docs **Edit page** links point to `QingZoneX/qingzonex.github.io`.

The deploy workflow always builds and verifies the site. Its actual Pages artifact/deploy jobs are intentionally gated until the repository is public.

## 5. Custom domain later

When a custom domain is selected:

1. Configure it under **Settings → Pages** and complete GitHub DNS verification.
2. Add repository Actions variable `SITE_URL`, for example `https://qingzonex.com`.
3. Add `public/CNAME` only if required by the chosen GitHub Pages setup.
4. Re-run the Pages deployment and verify canonical URLs.

`SITE_URL` switches the Astro base back to `/` and becomes the canonical site origin.

## 6. Dependency reproducibility

`package-lock.json` is committed and CI/deploy use `npm ci`. When dependencies intentionally change, update `package.json` and regenerate/commit the lockfile together.

## Final release checklist

- QTable/QTableUI version and release status on the portal match repository reality.
- Feature Matrix distinguishes implemented baseline, active hardening and future roadmap.
- QTable/QTableUI security and release notes are linked and current.
- Portal CI is green on the exact transfer/release commit.
- `npm run verify:transfer` passes before transfer.
- No secrets, private endpoints or development-only credentials are present.
- Organization Actions policy permits the Pages workflow.
- Repository is public before the deploy job is expected to publish.
- Settings → Pages uses GitHub Actions.
- The final Pages deployment is green and root/canonical/edit links are verified.
