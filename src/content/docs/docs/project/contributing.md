---
title: 贡献指南
description: 在 qtable-server、qtable-web 与门户之间选择正确的贡献入口。
---

QTable 是一个产品，但代码按实现边界维护在不同仓库。提交 Issue 或 Pull Request 前，请先选择负责该能力的仓库。

## qtable-server

修改 API、数据模型、权限、自动化、附件、审计、搜索、OAuth 或 AI 服务时，请阅读 [`QingZoneX/qtable-server` 的 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md)。

服务端变更需要保留权限、迁移、审计、原子写入与兼容性契约。

## qtable-web

修改工作中心、视图、Dashboard、Automation、协作、搜索、可访问性、国际化或 AI 交互时，请阅读 [`QingZoneX/qtable-web` 的 CONTRIBUTING.md](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md)。

前端仓库包含 Build、依赖、安全、许可证、容器与产品契约检查。

## 门户与文档

门户内容必须同时维护简体中文、繁体中文和英文，并以当前公开仓库的源码、版本文件、Release 状态和 Issues 为事实来源。不要把路线图能力写成已经交付，也不要把公开源码状态等同于已发布发行制品。
