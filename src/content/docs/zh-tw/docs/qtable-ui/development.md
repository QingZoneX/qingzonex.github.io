---
title: Web 前端開發
description: qtable-web 的本機開發、代理契約與品質門檻。
---

QTable 的 Web 前端實作儲存庫是 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)。

## 本機開發

需求：Node.js 22，以及可從 `http://localhost:9000` 存取的 qtable-server。

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

開發伺服器預設監聽 `http://localhost:9100`，並將 API / GraphQL / WebSocket / Auth / OAuth 流量代理到 qtable-server。

不要把真實憑證放入前端環境變數。npm 搭配根目錄 `package-lock.json` 是支援的可重現安裝路徑。

## 主要品質門檻

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

儲存庫還包含 OAuth、搜尋、AI、Member 欄位、Source Inbox、Dashboard、Automation、附件與 Service Worker 等契約檢查。實際命令以目前 `package.json` 與 CI Workflow 為準。

## 完整堆疊聯調

若需要完整堆疊，請依 [快速開始](../getting-started/quick-start/) 將 `qtable-server` 與 `qtable-web` 克隆為同層目錄，並確認 Compose 的 `QTABLE_UI_CONTEXT` 指向 `../qtable-web`。
