---
title: QTable release status
description: "QTable Alpha status, implemented product baseline and active public-release hardening."
---

QTable is currently **`v0.1.0-alpha` — Open Source Preview**.

The release is delivered across two implementation repositories: `QingZoneX/QTable` for backend services and `QingZoneX/QTableUI` for the web frontend. The portal treats them as **one release surface for one QTable product**.

## Implemented product baseline

The current main branches include, among other capabilities:

- Grid, Kanban, Gantt, Calendar and Gallery;
- Home / My Work and Projects Center;
- Dashboard Center / Workbench and permission-safe public sharing;
- Automation Engine / Center and execution history;
- notifications, record collaboration / activity and deep links;
- permission-aware global search;
- ChangeSet foundations and Recycle Bin;
- durable private S3-compatible attachments;
- goal-to-workspace, task / workload / assignment planning, Project Steward and safe Action Plans;
- QNote / Clipper Source Inbox;
- OAuth2 + S256 PKCE;
- a canonical self-hosted Web + API + PostgreSQL + Redis + MinIO stack.

## Active public-Alpha hardening

Active release tracks include browser-level full-stack E2E, production password-reset fail-closed behavior, Docker portability, browser security headers, private-data Service Worker protection, and backup / restore / upgrade runbooks.

These are **QTable Release / Security / Operations / Full-stack Verification** tracks. They do not imply that a separate frontend product remains incomplete.

## Appropriate Alpha use

The Alpha is suited to evaluation, architecture review, local or self-hosted testing, community development, staging and controlled internal trials. Before production-critical adoption, read the latest release notes, validate migrations and backups, and pin the exact tag or commit you plan to deploy.

Use the [production checklist](../getting-started/production-checklist/) before exposing a self-hosted instance.
