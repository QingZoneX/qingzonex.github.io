---
title: 參與 QTable 開發
description: "QTable 單一產品在後端與前端實作儲存庫中的貢獻入口。"
---

QTable 是一個產品，但為了保持工程邊界清晰，貢獻工作分布在兩個儲存庫。

## 後端與領域服務

修改 API、資料模型、權限、自動化、附件、稽核或 AI 服務時，請閱讀 [`QingZoneX/QTable` 的 CONTRIBUTING.md](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md)。

常用品質門檻包括：

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTable Web 前端

修改工作中心、檢視、Dashboard、Automation、協作、搜尋或 AI 互動時，請閱讀 [`QingZoneX/QTableUI` 的 CONTRIBUTING.md](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md)。

前端儲存庫包含 Build、相依性、安全、授權與產品契約檢查。

## 路線圖討論

具體缺陷、實作與路線圖討論使用對應程式碼儲存庫的 GitHub Issues。入口網站路線圖只做 QTable 產品級摘要，不作為第二套 Issue Tracker。
