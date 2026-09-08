---
title: QingZoneX 說明文件
description: "QingZoneX 首次開源版本 QTable 與 QTableUI 的說明文件。"
sidebar:
  order: 1
---

QingZoneX 首次開源範圍包含 **QTable** 與 **QTableUI**。

- **QTable** 是以多維表格建構的 AI 原生專案與工作管理後端及產品模型基礎。
- **QTableUI** 是 React 前端，提供 Grid、Kanban、Gantt、Calendar、Gallery、工作中心、儀表板、自動化、協作與 AI 工作流程。

兩個儲存庫目前均標記為 **`v0.1.0-alpha` — Open Source Preview**，並採用 **Apache License 2.0**。

## 建議閱讀順序

1. 依照 [快速開始](./getting-started/quick-start/) 在本機啟動系統。
2. 閱讀 [QTable 架構](./qtable/architecture/) 瞭解系統邊界。
3. 對外開放部署前檢查 [安全模型](./qtable/security/)。
4. 前端開發請參考 [QTableUI 開發指南](./qtable-ui/development/)。
5. 正式環境採用前查看 [發佈狀態](./project/release-status/)。

:::caution[Alpha 狀態]
目前版本適合評估、社群開發與受控試用。v1.0 之前，公開 API 與 Migration 行為仍可能調整。
:::

## 原始碼儲存庫

- [QingZoneX/QTable](https://github.com/QingZoneX/QTable)
- [QingZoneX/QTableUI](https://github.com/QingZoneX/QTableUI)
