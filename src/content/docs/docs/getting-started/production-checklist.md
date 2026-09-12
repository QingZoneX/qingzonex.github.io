---
title: 生产环境检查清单
description: "评估 QTable v0.1.1-alpha 自托管部署时应执行的实际检查。"
---

`v0.1.1-alpha` 是 Open Source Preview Git tag。把 QTable 暴露给真实用户之前，应在与生产拓扑一致的环境中完成下面的检查。

## 版本与来源

- [ ] `qtable-server` 与 `qtable-web` 使用经过共同验证的 `v0.1.1-alpha` Tag 或更明确的精确 commit。
- [ ] 若使用源码 Compose，两个仓库为同级目录且 `.env` 中 `QTABLE_UI_CONTEXT=../qtable-web`。
- [ ] 若使用预构建镜像，已确认 Registry 中真实存在目标 Tag，并记录 digest。
- [ ] 不把“Git tag 已发布”误当成“已发布 GitHub Release / 稳定版制品”。

## 配置与秘密

- [ ] `APP_ENV=production`。
- [ ] 更换默认 `SECRET_KEY`、数据库密码和对象存储凭据。
- [ ] 设置稳定且格式正确的 Fernet `ENCRYPTION_KEY`，多实例共享同一密钥。
- [ ] OAuth plain PKCE、动态客户端注册、密码重置调试 Token 保持关闭。
- [ ] Provider API Key 不进入前端环境变量、普通表字段或日志。

## 网络与浏览器安全

- [ ] 只公开 Web / 反向代理入口；API、PostgreSQL、Redis、MinIO 管理面保持私网或回环地址。
- [ ] 配置 TLS、HTTP → HTTPS 与 HSTS。
- [ ] 检查 qtable-web 的 CSP、X-Content-Type-Options、Referrer-Policy、frame 防护和 Permissions-Policy 未被外层代理削弱。

## 产品闭环

1. 登录并验证 Workspace / 对象 / 行级权限。
2. 实际执行 Grid、Kanban、Gantt、Calendar、Gallery 中有代表性的读写路径。
3. 验证 Dashboard 聚合、公开分享和权限变化后的访问行为。
4. 验证附件上传 / 下载，以及失去权限后的拒绝行为。
5. 验证 Recycle Bin Restore / Purge。
6. 验证至少一条 Automation 规则及执行历史。
7. 若启用 AI，验证 Preview → Confirm → Apply 与权限重新校验。
8. 在非生产副本上实际执行一次 PostgreSQL + 对象存储备份与恢复。

Alpha 阶段的备份、恢复与升级 Runbook 仍会持续完善。生产部署应把真实恢复演练、版本固定和升级回滚验证作为上线前置条件，而不是只确认“存在备份文件”。
