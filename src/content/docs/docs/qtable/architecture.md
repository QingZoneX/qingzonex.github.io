---
title: 系统架构
description: qtable-web 与 qtable-server 共同组成的 QTable 架构、运行服务与存储边界。
---

QTable 采用前后端分仓、产品模型统一的架构：

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## Web 层：qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) 负责最终用户体验、路由、视图渲染、协作交互和 AI 工作流界面。开发服务器默认监听 `9100`，生产镜像使用 Nginx 提供 SPA、代理与安全响应头。

## 服务层：qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) 默认监听 `9000`，负责数据模型、权限、自动化、审计、搜索、附件、OAuth 与 AI 服务。服务端是权限与写入规则的最终可信边界。

## 数据与运行时

标准自托管栈使用 PostgreSQL 16、Redis 7 与 MinIO / 外部 S3-compatible 对象存储。SQLite 只用于显式轻量回退，不是正常生产部署的默认路径。

## 安全边界

所有详情、搜索、Dashboard 聚合、附件访问与 AI 上下文都必须经过服务端权限校验。客户端不能为了分析或 AI 下载当前用户不可见的数据。
