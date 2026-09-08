---
title: 快速开始
description: 使用推荐的 PostgreSQL 开发栈在本地启动 QTable 与 QTableUI。
---

推荐开发栈为 **PostgreSQL + Redis + S3 兼容附件存储**。SQLite 是显式的轻量回退方案，不是常规部署默认值。

## 环境要求

- QTable 推荐 Python 3.12。
- QTableUI 使用 Node.js 22。
- 使用 Docker / Docker Compose 启动 PostgreSQL、Redis 与 MinIO。

## 1. 启动 QTable 依赖

```bash
git clone https://github.com/QingZoneX/QTable.git
cd QTable
cp .env.example .env

docker compose up -d db redis minio
```

## 2. 启动后端

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

alembic upgrade head
uvicorn app.main:app --reload --port 9000
```

GraphQL 地址为 `http://localhost:9000/graphql`。

## 3. 启动 QTableUI

在第二个终端中：

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

打开 `http://localhost:9100`。

前端开发服务器会把 API、GraphQL、WebSocket 与 OAuth 流量代理到 `9000` 端口的后端。

## 下一步

- [系统架构](../../qtable/architecture/)
- [AI 工作流](../../qtable/ai-workflows/)
- [安全模型](../../qtable/security/)
- [QTableUI 开发](../../qtable-ui/development/)
