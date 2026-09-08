---
title: 快速開始
description: 使用建議的 PostgreSQL 開發堆疊在本機啟動 QTable 與 QTableUI。
---

建議開發堆疊為 **PostgreSQL + Redis + S3 相容附件儲存**。SQLite 是明確的輕量回退方案，不是一般部署預設值。

## 環境需求

- QTable 建議 Python 3.12。
- QTableUI 使用 Node.js 22。
- 使用 Docker / Docker Compose 啟動 PostgreSQL、Redis 與 MinIO。

## 1. 啟動 QTable 相依服務

```bash
git clone https://github.com/QingZoneX/QTable.git
cd QTable
cp .env.example .env

docker compose up -d db redis minio
```

## 2. 啟動後端

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

alembic upgrade head
uvicorn app.main:app --reload --port 9000
```

GraphQL 位於 `http://localhost:9000/graphql`。

## 3. 啟動 QTableUI

在第二個終端機中：

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

開啟 `http://localhost:9100`。

前端開發伺服器會把 API、GraphQL、WebSocket 與 OAuth 流量代理到 `9000` 連接埠的後端。

## 下一步

- [系統架構](../../qtable/architecture/)
- [AI 工作流程](../../qtable/ai-workflows/)
- [安全模型](../../qtable/security/)
- [QTableUI 開發](../../qtable-ui/development/)
