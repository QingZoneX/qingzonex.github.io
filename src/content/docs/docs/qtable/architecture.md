---
title: 系统架构
description: QTable 与 QTableUI 的架构、运行服务与存储边界。
---

当前架构把前端与 QTable API 分离，同时把权限与变更规则保留在服务端。

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

## 数据库模式

**PostgreSQL** 是常规开发与部署的默认数据库。

**SQLite** 可用于轻量评估、离线开发或受限单实例场景。QTable 不会在 PostgreSQL 失败时自动切换到 SQLite；数据库引擎必须通过配置显式选择。

## 数据库迁移

QTable 使用 Alembic Migration Baseline。全新数据库执行：

```bash
alembic upgrade head
```

后续 Schema 演进应通过版本化 Migration 交付。
