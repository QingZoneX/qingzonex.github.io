---
title: QTable 前端开发
description: "开发 QTable Web App：本地运行、Docker 与前端安全约束。"
---

QTable 的 Web 前端实现仓库是 `QingZoneX/QTableUI`。

## 环境要求

- Node.js 22
- 本地运行的 QTable API（默认端口 `9000`）

## 本地开发

```bash
git clone https://github.com/QingZoneX/QTableUI.git
cd QTableUI
npm ci
npm run dev
```

开发服务器默认监听 `http://localhost:9100`，并把 API / GraphQL / WebSocket / Auth / OAuth 流量代理到 `http://localhost:9000`。

## Docker

```bash
docker build -t qtable-web .
docker run --rm -p 9100:9100 \
  -e QTABLE_HOST=host.docker.internal \
  -e QTABLE_PORT=9000 \
  qtable-web
```

容器提供 `/healthz` 健康检查。

## 前端安全不变量

- 不加载隐藏行来实现客户端 AI 或 Analytics。
- 不绕过 Preview → Confirm → Apply。
- 存在原子可审计 Mutation 时，不直接拼接多次写入。
- Workspace Member 候选必须来自当前 Workspace。
- Public Dashboard 必须使用 public-token-safe API。
- 大表路径保留服务端分页 / 聚合。
- 前端环境变量不能包含真实凭据。
