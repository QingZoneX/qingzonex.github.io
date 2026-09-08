---
title: QTable frontend development
description: "Develop the QTable Web App locally, in Docker, and within the frontend safety contracts."
---

QTable’s web frontend implementation repository is `QingZoneX/QTableUI`.

## Requirements

- Node.js 22
- A running QTable API on port `9000`

## Local development

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

The development server listens on `http://localhost:9100` and proxies API / GraphQL / WebSocket / Auth / OAuth traffic to `http://localhost:9000`.

## Docker

```bash
docker build -t qtable-web .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-web
```

The container exposes `/healthz`.

## Frontend safety invariants

- Do not load hidden rows for client-side AI or analytics.
- Do not bypass Preview → Confirm → Apply.
- Do not compose direct writes when an atomic audited mutation exists.
- Workspace Member candidates must come from the current workspace.
- Public Dashboard pages must use public-token-safe APIs.
- Large-table paths must preserve server paging / aggregation.
- Real credentials do not belong in frontend environment variables.
