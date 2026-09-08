---
title: QTableUI 開發
description: QTableUI 的本機開發、Docker 執行方式與前端安全要求。
---

## 環境需求

- Node.js 22
- `9000` 連接埠上執行的 QTable API

## 本機開發

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

開發伺服器監聽 `http://localhost:9100`，並代理到 `http://localhost:9000` 的 API / GraphQL / WebSocket / OAuth 流量。

## Docker

只建置並執行 UI 映像：

```bash
docker build -t qtable-ui .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-ui
```

容器提供 `/healthz` 健康檢查端點。

## 前端安全不變條件

- 不載入隱藏列來實作用戶端 AI 或分析。
- 不繞過 Preview → Confirm → Apply。
- 有原子可稽核 Mutation 時，不直接繞過寫入 Record。
- Workspace Member 候選必須來自目前 Workspace。
- Public Dashboard 必須使用適用 Public Token 的安全 API。
- 大型表格路徑應維持伺服器端分頁 / 聚合，不下載整張表。
- 真實憑證不得放入前端環境變數。
