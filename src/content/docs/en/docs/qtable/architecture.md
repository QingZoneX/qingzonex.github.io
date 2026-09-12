---
title: Architecture
description: QTable architecture, runtime services and storage boundaries across qtable-web and qtable-server.
---

QTable separates frontend and backend source repositories while keeping one product model:

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## Web layer: qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) owns the end-user experience, routing, view rendering, collaboration interactions and AI workflow UI. Its development server listens on `9100` by default; the production image uses Nginx for the SPA, proxy routes and security headers.

## Service layer: qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) listens on `9000` by default and owns the data model, permissions, automation, audit, search, attachments, OAuth and AI services. The server is the final trusted boundary for authorization and writes.

## Data and runtime

The canonical self-hosted stack uses PostgreSQL 16, Redis 7 and MinIO or external S3-compatible object storage. SQLite is an explicit lightweight fallback, not the normal production default.

## Security boundary

Record detail, search, dashboard aggregation, attachment access and AI context all pass through server authorization. The client must never download hidden data for analytics or AI processing.
