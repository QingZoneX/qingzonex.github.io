---
title: QTable 前端開發
description: "開發 QTable Web App：本機執行、Docker 與前端安全約束。"
---

QTable 的 Web 前端實作儲存庫是 `QingZoneX/QTableUI`。

## 環境需求

- Node.js 22
- 本機執行的 QTable API（預設連接埠 `9000`）

## 本機開發

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

開發伺服器預設監聽 `http://localhost:9100`，並把 API / GraphQL / WebSocket / Auth / OAuth 流量代理到 `http://localhost:9000`。

## Docker

```bash
docker build -t qtable-web .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-web
```

容器提供 `/healthz` 健康檢查。

## 前端安全不變量

- 不載入隱藏列來實作用戶端 AI 或 Analytics。
- 不繞過 Preview → Confirm → Apply。
- 存在原子可稽核 Mutation 時，不直接拼接多次寫入。
- Workspace Member 候選必須來自目前 Workspace。
- Public Dashboard 必須使用 public-token-safe API。
- 大型表格路徑保留伺服器端分頁 / 聚合。
- 前端環境變數不能包含真實憑證。
