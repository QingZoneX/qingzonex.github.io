---
title: Quick start
description: Run the complete QTable stack locally from the current public qtable-server and qtable-web repositories.
---

## 1. Clone both implementation repositories

Place them under the same parent directory:

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

The layout should look like:

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. Configure server Compose

```bash
cd qtable-server
cp .env.example .env
```

The current server Compose keeps a compatibility default of `../QTableUI`, so with the current public repository name you **must** set this in `.env`:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

For local development you may keep the example development credentials. For any shared or internet-facing environment, replace `SECRET_KEY` and attachment-storage credentials and configure a stable `ENCRYPTION_KEY`.

## 3. Start the full stack

```bash
docker compose up --build -d
```

Open `http://localhost:9100`. The web app is the user-facing endpoint; the API, PostgreSQL, Redis and MinIO are loopback-bound by default.

## 4. Verify

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

Core table capability does not require an external AI provider. If you enable AI, configure provider credentials through QTable's encrypted AI configuration flow rather than frontend environment variables or repository files.

See [Self-hosting](./self-hosting/) and the [Production checklist](./production-checklist/) for deployment guidance.
