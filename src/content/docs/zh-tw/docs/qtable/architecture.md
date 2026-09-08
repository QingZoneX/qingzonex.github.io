---
title: 系統架構
description: QTable 與 QTableUI 的架構、執行服務與儲存邊界。
---

目前架構把前端與 QTable API 分離，同時把權限與變更規則保留在伺服器端。

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

## 資料庫模式

**PostgreSQL** 是一般開發與部署的預設資料庫。

**SQLite** 可用於輕量評估、離線開發或受限單一執行個體。QTable 不會在 PostgreSQL 失敗時自動切換 SQLite；資料庫引擎必須透過設定明確選擇。

## 資料庫 Migration

QTable 使用 Alembic Migration Baseline。全新資料庫執行：

```bash
alembic upgrade head
```

後續 Schema 演進應透過版本化 Migration 交付。
