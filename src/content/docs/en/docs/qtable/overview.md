---
title: QTable product overview
description: "QTable v0.1.0-alpha product capabilities and the implementation boundaries between qtable-web and qtable-server."
---

QTable is one AI-native open-source project and work management product. **The web application and backend services together form QTable**, sharing the Table / Record / View / Dashboard / Permission product model.

The code is maintained in two public repositories:

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — the QTable Web App;
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API, domain services and the trusted data boundary.

## QTable Web App

`qtable-web` currently provides:

- Home / My Work / Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center and execution history;
- Notification Center, record workspace, activity and realtime paths;
- permission-aware global search and Recycle Bin;
- AI planning, Project Steward, safe action plans and Source Inbox.

## QTable API & Domain Services

`qtable-server` is responsible for:

- fields, records, filtering, sorting, grouping, named views and Task Profile;
- workspace, object and row-level permissions;
- automation, dashboard aggregation, ChangeSet, audit and recycle lifecycle;
- OAuth2 with S256 PKCE;
- PostgreSQL + Redis runtime, with SQLite only as an explicit lightweight fallback;
- private S3-compatible attachment lifecycle;
- permission-aware AI services and Preview → Confirm → Apply writes.

## One product contract

The web and API layers compose into one self-hosted QTable through REST / GraphQL / WebSocket / Auth / OAuth contracts. The client cannot bypass server permissions, pagination, audit or attachment security. Core table functionality does not require an external AI provider.

## Alpha boundary

Both repositories currently use the `v0.1.0-alpha` / Open Source Preview source baseline. The source repositories are public, but neither currently has a published GitHub Release. Treat source status and distribution-artifact status separately. See the [Feature matrix](../../project/feature-matrix/) and [Release status](../../project/release-status/).
