---
title: Self-hosting
description: Run the canonical QTable and QTableUI stack with Docker Compose.
---

The canonical one-command stack is maintained in the **QTable backend repository**.

Clone QTable and QTableUI as siblings:

```text
qingzone/
├── QTable/
└── QTableUI/
```

Then run:

```bash
cd QTable
cp .env.example .env
docker compose up --build -d
```

Open `http://localhost:9100`.

## Included services

The current Compose stack contains:

- QTable API
- QTableUI
- PostgreSQL 16
- Redis 7
- MinIO S3-compatible private attachment storage

## Production checklist

For a production deployment:

- Keep PostgreSQL as the database.
- Set `APP_ENV=production`.
- Replace `SECRET_KEY`.
- Use a stable `ENCRYPTION_KEY`.
- Replace example attachment-storage credentials or configure a managed S3-compatible provider.
- Configure durable PostgreSQL and object-storage backups.
- Add TLS and an appropriate reverse proxy.
- Do not use the SQLite fallback template for multi-user production deployments.

:::caution[Secrets]
Never commit real credentials, API keys or production `.env` files to source control.
:::
