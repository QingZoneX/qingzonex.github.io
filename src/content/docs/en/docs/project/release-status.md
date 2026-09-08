---
title: Release status
description: "Current Alpha status, implemented baseline and active public-release hardening for QTable and QTableUI."
---

QTable and QTableUI identify themselves as **`v0.1.0-alpha` — Alpha / Open Source Preview**.

The release should be understood in two layers: an implemented product baseline and an active release-hardening gate.

## Implemented baseline

Current main branches include, among other capabilities:

- Grid, Kanban, Gantt, Calendar and Gallery;
- Home/My Work and Projects Center;
- Dashboard Center / workbench and permission-safe public sharing;
- Automation engine and Automation Center;
- notifications, record collaboration/activity paths and deep links;
- permission-aware global search;
- ChangeSet foundations and a real Recycle Bin;
- durable private S3-compatible attachments;
- goal-to-workspace AI, task/workload/assignment planning, Project Steward and safe AI action plans;
- QNote / Clipper Source Inbox;
- OAuth2 + S256 PKCE;
- reproducible QTableUI container build/runtime and canonical full-stack Compose.

See the [feature matrix](../feature-matrix/) for a compact capability map.

## Active public-Alpha hardening

The repositories deliberately keep release work visible in GitHub Issues. Important active areas include:

- [QTable #139 — overall open-source readiness gate](https://github.com/QingZoneX/QTable/issues/139)
- [QTable #170 — fresh Compose + real-browser full-stack release E2E](https://github.com/QingZoneX/QTable/issues/170)
- [QTableUI #102 — keep private business data out of generic Service Worker caches](https://github.com/QingZoneX/QTableUI/issues/102)
- [QTable #168 — production password-reset fail-closed behavior](https://github.com/QingZoneX/QTable/issues/168)
- [QTable #169 — backend Docker portability](https://github.com/QingZoneX/QTable/issues/169)
- [QTableUI #103 — production browser security headers](https://github.com/QingZoneX/QTableUI/issues/103)
- [QTable #173 — backup / restore / upgrade runbook](https://github.com/QingZoneX/QTable/issues/173)

These items should not be confused with missing core product surfaces. They are release, security, operational or full-stack verification work for a safer public Alpha.

## Appropriate use during Alpha

Good fits:

- evaluation and architecture review;
- local/self-hosted testing;
- community development;
- staging and controlled internal pilots;
- early integration experiments with explicit upgrade testing.

Before relying on an Alpha deployment for production-critical data, review the latest release notes and active release gates, test migrations/backups in your own environment, and confirm the exact tagged commit you intend to deploy.

## Production preparation

Use the [production checklist](../../getting-started/production-checklist/) before exposing a self-hosted instance. Repository release notes and GitHub Issues remain the source of truth if they are newer than this portal.
