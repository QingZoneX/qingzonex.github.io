---
title: 貢獻指南
description: 在 qtable-server、qtable-web 與入口網站之間選擇正確的貢獻入口。
---

QTable 是一個產品，但程式碼依實作責任分倉維護。提交 Issue 或 Pull Request 前，請先選擇負責該能力的儲存庫。

## qtable-server

修改 API、資料模型、權限、自動化、附件、稽核、搜尋、OAuth 或 AI 服務時，請閱讀 [`QingZoneX/qtable-server` 的 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md)。

伺服器端變更必須保留授權、遷移、稽核、原子寫入與相容性契約。

## qtable-web

修改工作中心、檢視、Dashboard、Automation、協作、搜尋、可及性、國際化或 AI 互動時，請閱讀 [`QingZoneX/qtable-web` 的 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md)。

Web 儲存庫包含 Build、相依套件、安全、授權、容器與產品契約檢查。

## 入口網站與文件

入口網站內容必須同步維護簡體中文、繁體中文與英文，並以目前公開原始碼、版本檔、Release 狀態與 GitHub Issues 作為事實依據。不要把路線圖工作描述成已交付，也不要把公開原始碼狀態描述成已發佈的發行成品。
