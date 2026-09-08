---
title: Quick start
description: Start QTable and QTableUI locally with the recommended PostgreSQL development stack.
---

The recommended development stack uses **PostgreSQL + Redis + S3-compatible attachment storage**. SQLite is an explicit lightweight fallback, not the normal deployment default.

## Requirements

- Python 3.12 recommended for QTable.
- Node.js 22 for QTableUI.
- Docker / Docker Compose for PostgreSQL, Redis and MinIO.

## 1. Start QTable dependencies

```bash
git clone https://github.com/QingZoneX/QTable.git
cd QTable
cp .env.example .env

docker compose up -d db redis minio
```

## 2. Start the backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

alembic upgrade head
uvicorn app.main:app --reload --port 9000
```

GraphQL is available at `http://localhost:9000/graphql`.

## 3. Start QTableUI

In a second terminal:

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

Open `http://localhost:9100`.

The frontend development server proxies API, GraphQL, WebSocket and OAuth traffic to the backend on port `9000`.

## Next steps

- [Architecture](../../qtable/architecture/)
- [AI workflows](../../qtable/ai-workflows/)
- [Security model](../../qtable/security/)
- [QTableUI development](../../qtable-ui/development/)
