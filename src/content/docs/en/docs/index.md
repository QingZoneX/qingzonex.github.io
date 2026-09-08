---
title: QTable Docs
description: "Complete documentation for QingZoneX's open-source QTable product across the web experience, API services, self-hosting, security, attachments and AI workflows."
sidebar:
  order: 1
---

**QTable** is the open-source product currently presented by QingZoneX: an AI-native project and work management system built on multidimensional tables.

From a user perspective, QTable is one complete product. From an engineering perspective, it contains a web frontend layer and an API / Domain Services layer. Both layers share the same Table / Record / View / Dashboard / Permission model and work together through REST / GraphQL / WebSocket / Auth / OAuth contracts.

- [Backend and domain-services source](https://github.com/QingZoneX/QTable) — data models, permissions, automation, auditability, attachments, search and AI services.
- [Web frontend implementation source](https://github.com/QingZoneX/QTableUI) — work centers, five views, dashboards, collaboration, automation and AI interactions.

The current open-source preview is **`v0.1.0-alpha`** under the **Apache License 2.0**.

## Recommended path

1. Use the [Quick start](./getting-started/quick-start/) to launch the complete QTable locally.
2. Read [QTable architecture](./qtable/architecture/) for the web, API, data and storage boundaries.
3. Review the [QTable product overview](./qtable/overview/) for the current capability baseline.
4. For frontend implementation work, see [Frontend development](./qtable-ui/development/).
5. Before exposing a deployment, review the [Security model](./qtable/security/) and [Production checklist](./getting-started/production-checklist/).
6. Use the [Feature matrix](./project/feature-matrix/) to separate implemented capability, active hardening and roadmap work.

:::caution[Alpha status]
The current version is appropriate for evaluation, community development, staging and controlled trials. Public APIs, migration behavior and some product contracts may still change before v1.0.
:::
