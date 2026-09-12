---
title: QTable documentation
description: "Complete documentation for the QingZoneX QTable open-source product across the web experience, API services, self-hosting, security, attachments and AI workflows."
sidebar:
  order: 1
---

**QTable** is QingZoneX's open-source, AI-native project and work management product built on a multidimensional table model.

Users experience one QTable product. Engineering work is split across two public implementation repositories that share the Table / Record / View / Dashboard / Permission model and coordinate through REST / GraphQL / WebSocket / Auth / OAuth contracts.

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — FastAPI / Strawberry GraphQL backend, data model, permissions, automation, auditability, attachments, search, OAuth and AI services.
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — React web application, work centers, Grid / Kanban / Gantt / Calendar / Gallery, dashboards, collaboration, automation and AI interactions.

Both repositories currently use the **`v0.1.1-alpha` / Open Source Preview** tag baseline under **Apache License 2.0**. Public source visibility or a source tag does not itself mean that a GitHub Release, container image or other distribution artifact has been published. See [Release status](./project/release-status/) for that distinction.

## Recommended path

1. Use [Quick start](./getting-started/quick-start/) to run the complete QTable stack locally.
2. Read [Architecture](./qtable/architecture/) for web, API, data and storage boundaries.
3. Review the [QTable product overview](./qtable/overview/) for the implemented baseline.
4. For frontend implementation work, see [Web frontend development](./qtable-ui/development/).
5. Before internet-facing deployment, review the [Security model](./qtable/security/) and [Production checklist](./getting-started/production-checklist/).
6. Use the [Feature matrix](./project/feature-matrix/) to distinguish shipped baseline, active hardening and future roadmap work.

:::caution[Alpha status]
The current baseline is appropriate for evaluation, community development, staging and controlled trials. Before v1.0, public APIs, migration behavior and some product contracts may still change.
:::
