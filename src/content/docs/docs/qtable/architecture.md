---
title: Architecture
description: QTable and QTableUI architecture, runtime services and storage boundaries.
---

The current architecture separates the frontend from the QTable API while keeping permissions and mutation rules on the server side.

```text
QTableUI (React + TypeScript + VTable + Apollo)
               │
        HTTP / GraphQL / WS
               │
QTable API (FastAPI + Strawberry GraphQL)
       │                 │
 PostgreSQL/SQLite      Redis
       │
 Permission / ChangeSet / AI services
       │
 S3-compatible attachment storage
```

## Database modes

**PostgreSQL** is the default database for normal development and deployment.

**SQLite** is available for lightweight evaluation, offline development or constrained single-instance use. QTable does not automatically fall back from PostgreSQL to SQLite; switching database engines is explicit through configuration.

## Migrations

QTable carries an Alembic migration baseline. For a fresh database:

```bash
alembic upgrade head
```

Schema evolution should be delivered through versioned migrations.
