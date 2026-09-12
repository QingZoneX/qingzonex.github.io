---
title: Production checklist
description: "Practical checks for evaluating a QTable v0.1.1-alpha self-hosted deployment."
---

`v0.1.1-alpha` is an Open Source Preview Git tag. Before exposing QTable to real users, complete these checks in an environment that matches your production topology.

## Version and source

- [ ] `qtable-server` and `qtable-web` use the `v0.1.1-alpha` tags or more explicit exact commits that were validated together.
- [ ] For source Compose, both repositories are siblings and `.env` contains `QTABLE_UI_CONTEXT=../qtable-web`.
- [ ] For prebuilt images, the target tags actually exist in the registry and their digests are recorded.
- [ ] A published Git tag is not being mistaken for a published GitHub Release or stable artifact.

## Configuration and secrets

- [ ] `APP_ENV=production`.
- [ ] Default `SECRET_KEY`, database password and object-storage credentials are replaced.
- [ ] A stable, correctly formatted Fernet `ENCRYPTION_KEY` is configured and shared by all instances.
- [ ] OAuth plain PKCE, dynamic client registration and password-reset debug tokens remain disabled.
- [ ] Provider API keys do not enter frontend environment variables, ordinary table fields or logs.

## Network and browser security

- [ ] Only the web / reverse-proxy entry point is public; API, PostgreSQL, Redis and MinIO administration remain private or loopback-only.
- [ ] TLS, HTTP → HTTPS and HSTS are configured.
- [ ] qtable-web CSP, X-Content-Type-Options, Referrer-Policy, frame protection and Permissions-Policy are not weakened by the outer proxy.

## Product closure

1. Sign in and verify workspace, object and row-level permissions.
2. Exercise representative writes across Grid, Kanban, Gantt, Calendar and Gallery.
3. Verify dashboard aggregation, public sharing and access after permission changes.
4. Verify attachment upload / download and denial after access loss.
5. Verify Recycle Bin restore / purge.
6. Run at least one representative automation and inspect execution history.
7. If AI is enabled, verify Preview → Confirm → Apply and permission re-validation.
8. Perform a real PostgreSQL + object-storage backup and restore on a non-production copy.

The formal backup / restore / upgrade runbook is tracked in [`qtable-server #173`](https://github.com/QingZoneX/qtable-server/issues/173). Until that work is closed, treat a real restore drill as a production prerequisite rather than relying only on the existence of backup files.
