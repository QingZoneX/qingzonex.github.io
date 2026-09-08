---
title: Production checklist
description: "Practical checklist for evaluating a QTable v0.1.0-alpha self-hosted deployment."
---

QTable `v0.1.0-alpha` is an Open Source Preview. The canonical Compose stack makes evaluation and controlled deployment straightforward, but production ownership still requires explicit security, backup and upgrade decisions.

## Before exposing an instance

### Application and identity

- Set `APP_ENV=production`.
- Replace the example `SECRET_KEY`.
- Configure a stable Fernet `ENCRYPTION_KEY`; all instances sharing a database must use the same key.
- Review the latest authentication/security release gates before public internet exposure.
- Configure TLS and an appropriate reverse proxy/gateway.
- Do not store real credentials in frontend environment variables or source control.

### Database

- Use PostgreSQL for normal multi-user deployment.
- Run `alembic upgrade head` in staging before production rollout.
- Do not rely on the SQLite fallback for normal multi-user production.
- Take a tested PostgreSQL backup before every migration/upgrade.

### Attachments

- Replace development MinIO/S3 credentials.
- Configure persistent object storage and backups.
- For external S3-compatible storage, configure endpoint, region/TLS and Compose endpoint mapping consistently.
- Treat the database and object store as one application-data set when designing backup/restore.

### AI

- Core tables can run without an external AI provider.
- Store AI credentials through QTable's encrypted AI configuration flow.
- Review what data a chosen provider will receive before enabling AI for sensitive workspaces.

## Canonical startup

Clone QTable and QTableUI as siblings, then run from QTable:

```bash
cp .env.example .env
docker compose up --build -d
```

The canonical stack contains QTable API, QTableUI, PostgreSQL, Redis and MinIO.

## Release verification

Before production-critical use:

1. Read both repositories' latest release notes.
2. Check the [release status](../project/release-status/) and open release-gate Issues.
3. Verify fresh install, login, core table writes, hard refresh persistence and permission-negative paths.
4. Verify upload/download plus permission loss for attachments if you use them.
5. Verify Recycle Bin restore/purge behavior.
6. Verify a representative automation and Dashboard path.
7. Verify backup and restore on a non-production copy.
8. Record the exact QTable and QTableUI commit/tag deployed.

A formal backup/restore/upgrade runbook is tracked in [QTable #173](https://github.com/QingZoneX/QTable/issues/173). Until that work is closed, operators should treat backup/restore validation as their own release gate.
