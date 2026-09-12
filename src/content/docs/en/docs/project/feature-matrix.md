---
title: Feature matrix
description: Separate the QTable v0.1.1-alpha implemented baseline from future product direction.
---

This page tracks the current `qtable-server` and `qtable-web` `v0.1.1-alpha` tags / main branches so planned direction is not presented as shipped.

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

## Future product direction

The roadmap is intentionally expressed as durable product themes instead of binding portal documentation to specific GitHub issue numbers:

- **Release quality & scale**: strengthen end-to-end validation, large-table performance, realtime stability, responsive/accessibility quality, internationalization, and self-host backup, restore and upgrade workflows.
- **Open intake & integrations**: expand forms/public intake, APIs, webhooks, connectors and source intake so QTable can fit more naturally into existing business systems.
- **AI & automation platform**: extend BYO / self-hosted AI, permission-aware agents and automation orchestration while preserving the Preview → Confirm → Apply safety model.
- **QingZoneX product ecosystem**: future higher-level work experiences can reuse QTable structured data, permissions, collaboration and automation instead of creating a second data model.

These are directional themes, not committed dates or claims that the capabilities have already shipped. Treat the `v0.1.1-alpha` tags, current source and actual published artifacts as the authority for what is available today.
