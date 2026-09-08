---
title: Security model
description: Security invariants for permissions, AI, attachments, public dashboards and OAuth flows.
---

QTable's security model is part of the application design, not a frontend convention.

## Important invariants

- AI context must respect current-user row visibility.
- Preview operations must not mutate business data.
- Apply operations re-check permission and optimistic/concurrent state.
- Member values must refer to current workspace members.
- Attachment record values must resolve to an active registry entry bound to the same table, row and attachment field.
- Direct or presigned URLs are not valid persisted attachment data.
- Attachment reads re-check current table + row permission and are served `private, no-store`.
- Public Dashboard data is evaluated against the publisher's current readable scope.
- OAuth public clients use S256 PKCE.
- Secrets must not be written to ordinary table fields or logs.

## Production guidance

Before exposing an internet-facing deployment, review the repository's current [`SECURITY.md`](https://github.com/QingZoneX/QTable/blob/main/SECURITY.md) and the release notes for the version you deploy.
