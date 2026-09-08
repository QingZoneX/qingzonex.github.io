---
title: QTable product overview
description: "The complete QTable v0.1.0-alpha product: web frontend, backend services, multidimensional work model, automation, collaboration, safety, attachments and AI."
---

QTable is a complete AI-native open-source project and work management product. **The web frontend and backend services together make QTable**, sharing the same Table / Record / View / Dashboard / Permission product model.

## Product implementation layers

### QTable Web App

[Web frontend implementation source](https://github.com/QingZoneX/QTableUI) currently provides:

- Home / My Work / Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center and execution history;
- Notification Center, record workspace, activity and realtime paths;
- permission-aware global search and Recycle Bin;
- AI Planning, Project Steward, Action Plans and Source Inbox.

### QTable API & Domain Services

[Backend and domain-services source](https://github.com/QingZoneX/QTable) owns:

- fields, records, filters, sorting, grouping, named views and Task Profile semantics;
- workspace, object and row-level permissions;
- automation, Dashboard aggregation, ChangeSet and recycle lifecycle;
- OAuth2 with S256 PKCE;
- PostgreSQL + Redis runtime, with SQLite as an explicit lightweight fallback;
- private S3-compatible attachment lifecycle;
- permission-aware AI services and safe Preview → Confirm → Apply mutations.

## One product contract

The web and API layers combine through REST / GraphQL / WebSocket / Auth / OAuth contracts into one self-hosted QTable. The frontend must not bypass server-side permission, paging, auditability or attachment safety rules.

Core table capability **does not require** an external AI provider.

## Alpha boundary

`v0.1.0-alpha` is an Open Source Preview. The product baseline already covers the major work surfaces, while public-release hardening continues around browser-level full-stack E2E, security defaults, operations runbooks and large-table performance. See the [feature matrix](../../project/feature-matrix/) and [release status](../../project/release-status/).
