---
title: QTableUI overview
description: "Frontend product surfaces and technology stack for the QTableUI v0.1.0-alpha open-source preview."
---

QTableUI is the React frontend for QTable. The current baseline is a complete application shell around the multidimensional-table model, not only a table renderer.

## Current product surfaces

- Home / My Work.
- Projects Center backed by Task Profile and My Work semantics.
- Grid / Kanban / Gantt / Calendar / Gallery.
- Dashboard Center and Dashboard Workbench.
- Automation Center with real rules and execution history.
- Notification Center and realtime notification paths.
- Record detail/collaboration and activity/source context surfaces.
- Global command/search paths.
- Recycle Bin with restore/purge semantics.
- Settings and Help surfaces without planned-placeholder navigation.
- AI planning, Project Steward and action workflows.
- QNote Source Inbox.

## Stack

- React 19
- TypeScript 6
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## Runtime

The development server listens on port `9100` and proxies API, GraphQL, WebSocket, Auth and OAuth traffic to QTable on port `9000`.

The production container uses Nginx and exposes `/healthz`. `PORT`, `QTABLE_HOST` and `QTABLE_PORT` control the runtime boundary. The repository also retains Rainbond deployment support.

Frontend CI covers build/contract checks plus dependency/security/license policy work and publishes dependency/license/SBOM artifacts for tested commits.

## Safety boundary

QTableUI must preserve QTable's server-side security model. It should not load hidden rows for client-side AI/analytics, bypass Preview → Confirm → Apply, or substitute local-only state for server-confirmed collaborative behavior. Large-table paths should retain server paging and aggregation.

See the [feature matrix](../../project/feature-matrix/) for current Alpha boundaries.
