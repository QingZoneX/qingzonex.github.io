---
title: 参与 QTable 开发
description: "QTable 单一产品在后端与前端实现仓库中的贡献入口。"
---

QTable 是一个产品，但为了保持工程边界清晰，贡献工作分布在两个仓库。

## 后端与领域服务

在修改 API、数据模型、权限、自动化、附件、审计或 AI 服务时，请阅读 [`QingZoneX/QTable` 的 CONTRIBUTING.md](https://github.com/QingZoneX/QTable/blob/main/CONTRIBUTING.md)。

常用质量门禁包括：

```bash
pytest -q
python scripts/check_secrets.py --history
python scripts/check_open_source_readiness.py
```

## QTable Web 前端

在修改工作中心、视图、Dashboard、Automation、协作、搜索或 AI 交互时，请阅读 [`QingZoneX/QTableUI` 的 CONTRIBUTING.md](https://github.com/QingZoneX/QTableUI/blob/main/CONTRIBUTING.md)。

前端仓库包含 Build、依赖、安全、许可证与产品契约检查。

## 路线图讨论

具体缺陷、实现与路线图讨论使用对应代码仓库的 GitHub Issues。门户路线图只做 QTable 产品级摘要，不作为第二套 Issue Tracker。
