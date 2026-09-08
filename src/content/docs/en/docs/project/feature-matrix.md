---
title: QTable feature matrix
description: "QTable implemented capability, public-Alpha hardening and future roadmap boundaries."
sidebar:
  order: 2
---

This matrix describes capability at the **single QTable product** level. The frontend implementation repository `QingZoneX/QTableUI` and backend implementation repository `QingZoneX/QTable` jointly deliver these product capabilities.

**Implemented baseline** means the capability exists in the current product / main branches; it does not imply v1.0 API stability.

| Product area | Current baseline | Status |
| --- | --- | --- |
| Table model | Fields, records, filters, multi-field sorting, grouping, named views | Implemented baseline |
| Work views | Grid, Kanban, Gantt, Calendar, Gallery | Implemented baseline |
| Work entry | Home / My Work, Projects Center | Implemented baseline |
| Dashboard | Center / Workbench, widgets, server aggregation, public sharing | Implemented; UX continues |
| Automation | Server engine + Automation Center + execution history | Implemented baseline |
| Collaboration | Notifications, realtime lifecycle, record collaboration / activity | Implemented; depth continues |
| Search | Permission-aware global search / command discovery | Implemented baseline |
| Delete safety | ChangeSet / undo foundations + Recycle Bin restore / purge | Implemented baseline |
| Private attachments | Stable S3-compatible references, permission access, lifecycle cleanup, Upload Intent recovery | Implemented; release verification continues |
| AI planning | Goal-to-workspace, task planning, workload, assignment, Project Steward | Implemented baseline |
| AI actions | Preview → Confirm → Apply, partial acceptance, permission / state revalidation | Implemented baseline |
| AI visualization | Generate View and Dashboard through existing models | Implemented baseline |
| Source Inbox | QNote / Clipper, source context and duplicate hints | Implemented baseline |
| Identity | OAuth2 Authorization Code + S256 PKCE | Implemented; session/security hardening continues |
| Self-host | Web App + API + PostgreSQL + Redis + MinIO Compose | Implemented; operations guidance continues |
| Lightweight database | Explicit SQLite fallback | Evaluation / constrained single instance |

## Active hardening

The public Alpha still includes browser-level full-stack E2E, auth and security defaults, private-data Service Worker protections, browser security headers, operations runbooks and large-table performance work. These are **QTable release-quality tracks**, not independent roadmaps for a second product.

## Planned capabilities

The following must **not** be represented as shipped:

- Form View / Public Form — [QTable #148](https://github.com/QingZoneX/QTable/issues/148)
- Table-as-API / token / webhook platform — [QTable #116](https://github.com/QingZoneX/QTable/issues/116)
- Skill / Connector platform — [QTable #117](https://github.com/QingZoneX/QTable/issues/117)
- More complete self-hosted / BYO AI provider platform — [QTable #120](https://github.com/QingZoneX/QTable/issues/120)
- Semantic duplicate detection — [QTable #119](https://github.com/QingZoneX/QTable/issues/119)
- Full million-row performance target — [QTable #104](https://github.com/QingZoneX/QTable/issues/104)

If release notes or GitHub Issues are newer, treat them as the source of truth.
