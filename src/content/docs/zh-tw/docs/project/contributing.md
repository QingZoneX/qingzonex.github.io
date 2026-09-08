---
title: 參與貢獻
description: QTable、QTableUI 與 QingZoneX 開源路線圖的貢獻入口。
---

貢獻細節應盡量靠近各自程式碼庫維護，避免命令與品質門檻和真實實作發生偏移。

## QTable

提交 Pull Request 前，請閱讀儲存庫 [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md)。

後端 README 目前記錄的高層檢查包括：

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTableUI

請閱讀前端 [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md)。

前端儲存庫把 Build、Dependency、License 與 Product Contract 檢查作為品質門檻的一部分。

## 路線圖討論

具體路線圖提案、缺陷與實作討論請使用 GitHub Issues。入口網站路線圖只提供摘要，不作為第二套 Issue Tracker。
