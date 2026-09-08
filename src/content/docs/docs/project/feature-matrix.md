---
title: Feature matrix
description: "Implemented QTable/QTableUI capabilities, active Alpha hardening, and future roadmap boundaries."
sidebar:
  order: 2
---

This matrix is intentionally conservative. **Implemented baseline** means the capability exists in the current product/repository main branches; it does not imply v1.0 API stability.

| Area | Current baseline | Status |
| --- | --- | --- |
| Table model | Fields, records, filters, multi-sort, grouping, named views | Implemented baseline |
| Views | Grid, Kanban, Gantt, Calendar, Gallery | Implemented baseline |
| Work shell | Home / My Work, Projects Center | Implemented baseline |
| Dashboard | Dashboard Center/workbench, widgets, server aggregation, public sharing | Implemented baseline; UX continues to evolve |
| Automation | Backend automation engine + real Automation Center + execution history | Implemented baseline |
| Collaboration | Notifications, realtime notification lifecycle, record collaboration/activity paths | Implemented baseline; collaboration depth continues to evolve |
| Search | Permission-aware global search / command discovery | Implemented baseline |
| Delete safety | ChangeSet/undo foundations + Recycle Bin restore/purge | Implemented baseline |
| Attachments | Stable private S3-compatible references, permission-aware access, lifecycle cleanup, upload-intent recovery | Implemented baseline; release gate verification continues |
| AI planning | Goal-to-workspace, task planning, workload, assignment, Project Steward | Implemented baseline |
| AI actions | Preview → Confirm → Apply, partial acceptance, permission/state revalidation | Implemented baseline |
| AI visuals | AI-generated Views and Dashboards using existing models | Implemented baseline |
| Source Inbox | QNote / Clipper intake, source context and duplicate hints | Implemented baseline |
| Identity | OAuth2 Authorization Code + S256 PKCE | Implemented baseline; session/security hardening continues |
| Self-host | QTable API + QTableUI + PostgreSQL + Redis + MinIO canonical Compose | Implemented baseline; ops/runbook hardening continues |
| Lightweight DB | Explicit SQLite fallback | Implemented for evaluation/constrained single instance |

## Active hardening, not new product marketing

The public Alpha gate still includes browser-level full-stack E2E, selected authentication/security defaults, Service Worker private-data safeguards, browser security headers, operations runbooks and large-table performance work. See [Release status](../release-status/).

## Planned capabilities

The following should **not** be presented as shipped:

- Form View / Public Form — [QTable #148](https://github.com/QingZoneX/QTable/issues/148)
- Stable developer-facing Table-as-API/token/webhook platform — [QTable #116](https://github.com/QingZoneX/QTable/issues/116)
- Installable Skill / Connector platform — [QTable #117](https://github.com/QingZoneX/QTable/issues/117)
- Fully hardened self-hosted / BYO AI provider platform — [QTable #120](https://github.com/QingZoneX/QTable/issues/120)
- Semantic duplicate detection beyond current source/duplicate hints — [QTable #119](https://github.com/QingZoneX/QTable/issues/119)
- Complete million-row performance target — [QTable #104](https://github.com/QingZoneX/QTable/issues/104)

GitHub Issues and the repository release notes are authoritative when newer than this page.
