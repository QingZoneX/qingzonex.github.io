---
title: 参与贡献
description: QTable、QTableUI 与 QingZoneX 开源路线图的贡献入口。
---

贡献细节应尽量靠近各自代码库维护，避免命令与质量门禁和真实实现发生漂移。

## QTable

提交 Pull Request 前，请阅读仓库 [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md)。

后端 README 当前记录的高层检查包括：

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTableUI

请阅读前端 [`CONTRIBUTING.md`](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md)。

前端仓库把 Build、Dependency、License 与 Product Contract 检查作为质量门禁的一部分。

## 路线图讨论

具体路线图提案、缺陷与实现讨论请使用 GitHub Issues。门户路线图只提供摘要，不作为第二套 Issue Tracker。
