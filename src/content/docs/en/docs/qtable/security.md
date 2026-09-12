---
title: Security model
description: QTable permission, authentication, public-sharing, AI and private-attachment security boundaries.
---

QTable treats `qtable-server` as the final data-security boundary. `qtable-web` only presents capabilities and data authorized for the current user.

## Core invariants

- Workspace, object and row-level permissions are enforced on the server.
- Search, dashboard aggregation, AI context and attachment access use the same permission model.
- AI writes follow Preview → Confirm → Apply, with permissions and current state re-validated at apply time.
- Public Dashboard data is evaluated against what the publisher is still allowed to read.
- OAuth public clients use S256 PKCE.
- Secrets must not be written to ordinary table fields, frontend environment variables or logs.
- Private attachment upload, read, delete and restore operations re-check authorization.

## Web container

The `qtable-web` production Nginx image sets CSP, `X-Content-Type-Options`, `Referrer-Policy`, clickjacking protection and a restricted `Permissions-Policy`. The internet-facing reverse proxy is still responsible for TLS, HTTP → HTTPS and HSTS.

## Production guidance

Before exposing QTable to the internet, review [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md), [`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md), the release evidence for the exact versions you plan to deploy, and the [Production checklist](../../getting-started/production-checklist/).
