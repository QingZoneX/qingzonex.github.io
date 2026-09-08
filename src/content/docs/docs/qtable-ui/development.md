---
title: QTableUI 开发
description: QTableUI 的本地开发、Docker 运行方式与前端安全要求。
---

## 环境要求

- Node.js 22
- `9000` 端口上运行的 QTable API

## 本地开发

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

开发服务器监听 `http://localhost:9100`，并代理到 `http://localhost:9000` 的 API / GraphQL / WebSocket / OAuth 流量。

## Docker

只构建并运行 UI 镜像：

```bash
docker build -t qtable-ui .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-ui
```

容器提供 `/healthz` 健康检查端点。

## 前端安全不变量

- 不加载隐藏行来实现客户端 AI 或分析。
- 不绕过 Preview → Confirm → Apply。
- 存在原子可审计 Mutation 时，不直接绕过写入 Record。
- Workspace Member 候选必须来自当前 Workspace。
- Public Dashboard 必须使用适用于 Public Token 的安全 API。
- 大表路径应保持服务端分页 / 聚合，不下载整张表。
- 真实凭据不得放入前端环境变量。
