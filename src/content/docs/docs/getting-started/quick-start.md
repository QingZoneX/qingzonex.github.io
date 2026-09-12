---
title: 快速开始
description: 使用当前 qtable-server 与 qtable-web 公开仓库在本地启动完整 QTable。
---

## 1. 克隆两个实现仓库

将两个仓库放在同一父目录：

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

目录应类似：

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. 配置服务端 Compose

```bash
cd qtable-server
cp .env.example .env
```

当前服务端 Compose 的兼容默认值仍是 `../QTableUI`，因此使用新公开仓库名时，必须在 `.env` 中设置：

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

本地开发可以保留 `.env.example` 中的开发凭据；对任何共享或公网环境都必须更换 `SECRET_KEY`、附件存储凭据，并配置稳定的 `ENCRYPTION_KEY`。

## 3. 启动完整栈

```bash
docker compose up --build -d
```

打开 `http://localhost:9100`。Web 是面向用户的入口；API、PostgreSQL、Redis 与 MinIO 默认只绑定到本机回环地址。

## 4. 验证

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

核心表格能力不要求配置外部 AI Provider。需要 AI 时，通过 QTable 的加密 AI 配置流程设置 Provider 凭据，不要把真实 API Key 写入前端环境变量或仓库文件。

更多部署细节请查看 [自托管](./self-hosting/) 与 [生产环境检查清单](./production-checklist/)。
