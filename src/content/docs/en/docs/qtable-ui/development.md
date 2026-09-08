---
title: QTableUI development
description: Local development, Docker runtime and frontend safety requirements for QTableUI.
---

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

The development server listens on `http://localhost:9100` and proxies API / GraphQL / WebSocket / OAuth traffic to `http://localhost:9000`.

## Docker

Build and run only the UI image:

```bash
docker build -t qtable-ui .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-ui
```

The container exposes `/healthz` as a health endpoint.

## Frontend safety invariants

- Do not load hidden rows to implement client-side AI or analytics.
- Do not bypass Preview → Confirm → Apply flows.
- Do not write records directly when an atomic audited mutation exists.
- Workspace Member candidates must come from the current workspace.
- Public dashboard pages must use public-token-safe APIs.
- Large-table paths should preserve server paging / aggregation rather than downloading the entire table.
- No real credential belongs in frontend environment variables.
