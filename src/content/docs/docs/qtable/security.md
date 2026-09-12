---
title: 安全模型
description: QTable 的权限、认证、公开分享、AI 与私有附件安全边界。
---

QTable 将 `qtable-server` 作为最终数据安全边界，`qtable-web` 只呈现当前用户被授权看到和执行的能力。

## 核心不变量

- Workspace、对象与行级权限必须在服务端执行。
- 搜索、Dashboard 聚合、AI 上下文和附件访问不能绕过同一权限模型。
- AI 写入遵循 Preview → Confirm → Apply；Apply 时重新校验权限与当前状态。
- Public Dashboard 数据按照发布者当前仍可读取的数据范围计算。
- OAuth Public Client 使用 S256 PKCE。
- Secret 不得写入普通表字段、前端环境变量或日志。
- 私有附件的上传、读取、删除与恢复都必须重新检查授权。

## Web 容器

`qtable-web` 的生产 Nginx 镜像设置 CSP、`X-Content-Type-Options`、`Referrer-Policy`、点击劫持防护和受限 `Permissions-Policy`。公网入口仍应由反向代理负责 TLS、HTTP → HTTPS 与 HSTS。

## 生产环境建议

对公网开放部署前，请阅读 [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md)、[`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md) 以及计划部署版本的发布说明，并完成 [生产环境检查清单](../../getting-started/production-checklist/)。
