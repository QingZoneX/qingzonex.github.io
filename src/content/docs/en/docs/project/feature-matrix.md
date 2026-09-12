---
title: Feature matrix
description: Separate the QTable v0.1.1-alpha implemented baseline, release hardening and future roadmap.
---

This page tracks the `v0.1.1-alpha` tags and current source in `qtable-server` and `qtable-web` so planned capabilities are not presented as shipped.

## Implemented baseline

| Capability | Status | Primary implementation |
| --- | --- | --- |
| Home / My Work / Projects Center | Implemented | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | Implemented | qtable-web + qtable-server |
| Dashboard Center / Workbench / server aggregation | Implemented | Both |
| Automation Center / rule execution / history | Implemented | Both |
| Notifications / record collaboration / activity | Implemented | Both |
| Permission-aware global search / Recycle Bin | Implemented | Both |
| Private S3-compatible attachment lifecycle | Implemented | qtable-server + qtable-web |
| Goal / task / workload / Project Steward AI workflows | Baseline implemented | Both |
| Source Inbox | Baseline implemented | Both |
| OAuth2 + S256 PKCE | Implemented | qtable-server + qtable-web |

## Active hardening

These items improve Alpha release quality; they do not mean the product surfaces above are absent:

- Full-stack browser release E2E — [`qtable-server #170`](https://github.com/QingZoneX/qtable-server/issues/170)
- Large-table performance and realtime paths — [`qtable-server #104`](https://github.com/QingZoneX/qtable-server/issues/104)
- Self-host backup / restore / upgrade runbook — [`qtable-server #173`](https://github.com/QingZoneX/qtable-server/issues/173)
- Frontend responsive behavior, accessibility, i18n and consistent states — [`qtable-web #56`](https://github.com/QingZoneX/qtable-web/issues/56)

## Next capabilities

The following **must not be described as shipped**:

- Form View / Public Form — [`qtable-server #148`](https://github.com/QingZoneX/qtable-server/issues/148)
- Table-as-API / token / webhook platform — [`qtable-server #116`](https://github.com/QingZoneX/qtable-server/issues/116)
- Skill / Connector platform — [`qtable-server #117`](https://github.com/QingZoneX/qtable-server/issues/117)
- Self-hosted / BYO AI standardization — [`qtable-server #120`](https://github.com/QingZoneX/qtable-server/issues/120)
- Semantic duplicate detection for Source Inbox — [`qtable-server #119`](https://github.com/QingZoneX/qtable-server/issues/119)

Use the linked GitHub Issues, `v0.1.1-alpha` tags and current source as the final status authority.
