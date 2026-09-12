---
title: Web frontend development
description: Local development, proxy contracts and quality gates for qtable-web.
---

QTable's web frontend implementation lives in [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web).

## Local development

Requirements: Node.js 22 and a qtable-server instance available at `http://localhost:9000`.

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

The development server listens on `http://localhost:9100` by default and proxies API / GraphQL / WebSocket / Auth / OAuth traffic to qtable-server.

Do not put real credentials into frontend environment variables. npm plus the root `package-lock.json` is the supported reproducible-install path.

## Main quality gates

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

The repository also contains contract checks for OAuth, search, AI, member fields, Source Inbox, dashboards, automation, attachments and service-worker behavior. Treat the current `package.json` and CI workflow as the final command source.

## Full-stack development

For the complete stack, follow [Quick start](../getting-started/quick-start/), clone `qtable-server` and `qtable-web` as sibling directories, and make sure Compose `QTABLE_UI_CONTEXT` points to `../qtable-web`.
