---
title: QTable Documentation
description: "Complete documentation for QingZoneX’s open-source QTable product, covering the frontend experience, backend services, self-hosting, safety and AI workflows."
sidebar:
  order: 1
---

**QTable** is the open-source product currently presented by QingZoneX: an AI-native project and work management system built on multidimensional tables.

QTable is implemented across two engineering repositories:

- [`QingZoneX/QTable`](https://github.com/QingZoneX/QTable) — APIs, domain models, permissions, automation, auditability, attachments, search and AI services.
- [`QingZoneX/QTableUI`](https://github.com/QingZoneX/QTableUI) — QTable’s web frontend implementation for work centers, five views, dashboards, collaboration, automation and AI interactions.

These repositories are **implementation layers of one QTable product**, not two separate products. The current open-source preview is **`v0.1.0-alpha`** under **Apache License 2.0**.

## Recommended path

1. Follow [Quick start](./getting-started/quick-start/) to launch the complete QTable locally.
2. Read [QTable architecture](./qtable/architecture/) for the web, API, data and storage boundaries.
3. Review the [QTable product overview](./qtable/overview/) for the current capability baseline.
4. Use [Frontend development](./qtable-ui/development/) when working on the web implementation.
5. Before exposing a deployment, review the [security model](./qtable/security/) and [production checklist](./getting-started/production-checklist/).
6. Use the [feature matrix](./project/feature-matrix/) to distinguish implemented capability, active hardening and roadmap work.

:::caution[Alpha status]
The current release is suitable for evaluation, community development, staging and controlled trials. Public APIs, migrations and some product contracts may still change before v1.0.
:::
