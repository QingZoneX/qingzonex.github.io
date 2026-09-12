---
title: Self-hosting
description: Run qtable-web, API, PostgreSQL, Redis and object storage with qtable-server Docker Compose.
---

The canonical source-based self-hosting layout uses sibling `qtable-server` and `qtable-web` repositories:

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

Inside `qtable-server`:

```bash
cp .env.example .env
```

Update the web build context to the current repository directory:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

Then run:

```bash
docker compose up --build -d
```

Default ports are Web `9100`, API `9000`, PostgreSQL `5432`, Redis `6379`, MinIO API `9001` and MinIO Console `9002`. The canonical Compose setup binds data-plane and admin endpoints to `127.0.0.1` by default, except for the user-facing web service.

## Production

- Set `APP_ENV=production`.
- Use a strong `SECRET_KEY` and a stable valid Fernet `ENCRYPTION_KEY`.
- Replace PostgreSQL and object-storage credentials.
- Terminate TLS at a reverse proxy and configure HTTPS redirects plus HSTS.
- Keep OAuth plain PKCE, dynamic client registration and password-reset debug tokens disabled.
- Perform a real restore drill for PostgreSQL, object storage and critical configuration.
- Record the exact deployed qtable-server and qtable-web commit / tag.

Public source does not imply that a particular container tag has been published. Before using prebuilt images, confirm that the exact version exists in the target registry and matches the source baseline you intend to deploy.
