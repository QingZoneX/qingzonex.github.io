---
title: QTable overview
description: "Product capabilities and current scope of the QTable v0.1.0-alpha open-source preview."
---

QTable is an AI-native, open-source project and work management backend built on multidimensional tables. It supplies the product models and server-side contracts used by QTableUI.

## Current baseline

### Table and work model

- Grid / Kanban / Gantt / Calendar / Gallery view models.
- Filters, multi-field sorting, grouping and named views.
- Formula, relation, auto-number, Workspace Member, select, date, attachment and other field types.
- Task Profile/business semantics and server-backed My Work/project aggregation.
- Workspace membership, item permissions and row-level permissions.
- Permission-aware global search.

### Operations and lifecycle

- Automation engine with validation, scheduling/execution and execution history.
- Dashboard widgets with server-side aggregation and permission-safe public sharing.
- ChangeSet-based audit/undo foundations and recycle lifecycle.
- OAuth 2.0 Authorization Code Flow with S256 PKCE.
- PostgreSQL + Redis recommended stack, with SQLite as an explicit lightweight fallback.

### Private attachments

Attachments use an S3-compatible storage contract. Table records persist stable `attachmentId` / `objectKey` metadata rather than temporary presigned URLs. Upload/download/delete re-check current table and row permission. Recycle/restore preserves object identity, purge participates in durable cleanup, and upload intents make abandoned object writes recoverable.

The canonical Compose stack includes MinIO. External S3-compatible endpoints can be configured without editing the Compose file.

### AI workflow

- Goal-driven workspace generation.
- Task planning.
- Workload/schedule estimation.
- Workspace-member assignment suggestions.
- AI Project Steward diagnostics and question answering.
- AI action plans with diff preview, partial acceptance and permission/state revalidation.
- AI-generated Views and Dashboards using existing product models.
- QNote / Clipper Source Inbox with source context and duplicate hints.

Core table functionality does **not** require an external AI service.

## Alpha boundary

`v0.1.0-alpha` is an Open Source Preview. The implemented product baseline is broader than the future roadmap, but release hardening is still active around full-stack browser E2E, operations guidance, security defaults and large-table performance. See the [feature matrix](../../project/feature-matrix/) and [release status](../../project/release-status/).
