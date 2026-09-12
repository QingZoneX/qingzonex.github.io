---
title: 快速開始
description: 使用目前公開的 qtable-server 與 qtable-web 儲存庫在本機啟動完整 QTable。
---

## 1. 克隆兩個實作儲存庫

將兩個儲存庫放在同一父目錄：

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

目錄應類似：

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. 設定伺服器端 Compose

```bash
cd qtable-server
cp .env.example .env
```

目前伺服器端 Compose 為舊目錄配置保留了相容預設值，因此使用目前公開儲存庫名稱時，**必須**在 `.env` 中明確設定：

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

本機開發可保留 `.env.example` 的開發憑證；任何共用或網際網路環境都必須更換 `SECRET_KEY`、附件儲存憑證，並設定穩定的 `ENCRYPTION_KEY`。

## 3. 啟動完整堆疊

```bash
docker compose up --build -d
```

開啟 `http://localhost:9100`。Web 是面向使用者的入口；API、PostgreSQL、Redis 與 MinIO 預設只綁定本機回環地址。

## 4. 驗證

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

核心表格能力不需要外部 AI Provider。啟用 AI 時，請透過 QTable 的加密 AI 設定流程配置 Provider 憑證，不要把真實 API Key 寫入前端環境變數或儲存庫檔案。

更多部署資訊請查看 [自託管](../self-hosting/) 與 [正式環境檢查清單](../production-checklist/)。
