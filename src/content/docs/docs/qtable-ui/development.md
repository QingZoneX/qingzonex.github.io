---
title: Web 前端开发
description: qtable-web 的本地开发、代理约定与质量门禁。
---

QTable 的 Web 前端实现仓库是 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)。

## 本地开发

要求：Node.js 22，以及一个运行在 `http://localhost:9000` 的 qtable-server。

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

开发服务器默认监听 `http://localhost:9100`，并将 API / GraphQL / WebSocket / Auth / OAuth 流量代理到 qtable-server。

不要把真实凭据放入前端环境变量。npm 与根目录 `package-lock.json` 是可重复安装的支持路径。

## 主要质量门禁

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

仓库还包含 OAuth、搜索、AI、Member 字段、Source Inbox、Dashboard、Automation、附件与服务工作线程等契约检查。提交前应以仓库当前 `package.json` 与 CI 为最终命令来源。

## 与服务端联调

若需要完整栈，按照 [快速开始](../../getting-started/quick-start/) 将 `qtable-server` 与 `qtable-web` 克隆为同级目录，并确保 Compose 的 `QTABLE_UI_CONTEXT` 指向 `../qtable-web`。
