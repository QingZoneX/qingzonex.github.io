---
title: Contributing to QTable
description: "Contribution entry points for the single QTable product across its backend and frontend implementation repositories."
---

QTable is one product, while contribution work is split across two repositories to keep engineering boundaries clear.

## Backend and domain services

For APIs, data models, permissions, automation, attachments, auditability or AI services, read [`QingZoneX/QTable` CONTRIBUTING.md](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md).

Common quality gates include:

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTable Web frontend

For work centers, views, dashboards, automation, collaboration, search or AI interactions, read [`QingZoneX/QTableUI` CONTRIBUTING.md](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md).

The frontend repository includes build, dependency, security, license and product-contract checks.

## Roadmap discussion

Use GitHub Issues in the relevant implementation repository for concrete defects, implementation and roadmap proposals. The portal roadmap is a QTable product-level summary, not a second issue tracker.
