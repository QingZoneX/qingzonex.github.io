---
title: 系統架構
description: qtable-web 與 qtable-server 共同組成的 QTable 架構、執行服務與儲存邊界。
---

QTable 採用前後端分倉、產品模型統一的架構：

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

## Web 層：qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) 負責最終使用者體驗、路由、檢視呈現、協作互動與 AI 工作流程介面。開發伺服器預設監聽 `9100`；正式映像使用 Nginx 提供 SPA、Proxy 路由與安全回應標頭。

## 服務層：qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) 預設監聽 `9000`，負責資料模型、權限、自動化、稽核、搜尋、附件、OAuth 與 AI 服務。伺服器端是授權與寫入規則的最終可信任邊界。

## 資料與執行時

標準自託管堆疊使用 PostgreSQL 16、Redis 7 與 MinIO / 外部 S3-compatible 物件儲存。SQLite 僅作為明確的輕量回退，不是一般正式部署的預設路徑。

## 安全邊界

記錄詳情、搜尋、Dashboard 聚合、附件存取與 AI 脈絡都必須經過伺服器端權限檢查。用戶端不能為分析或 AI 下載目前使用者無權查看的資料。
