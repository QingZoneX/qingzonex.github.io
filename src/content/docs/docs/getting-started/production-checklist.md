---
title: 生产环境检查清单
description: "评估 QTable v0.1.0-alpha 自托管部署时应执行的实际检查。"
---

QTable `v0.1.0-alpha` 属于 Open Source Preview。标准 Compose 可以方便地用于评估与受控部署，但生产运维仍需要明确的安全、备份与升级决策。

## 对外开放实例之前

### 应用与身份

- 设置 `APP_ENV=production`。
- 替换示例 `SECRET_KEY`。
- 配置稳定的 Fernet `ENCRYPTION_KEY`；共享同一数据库的所有实例必须使用相同密钥。
- 在暴露到公网前检查最新的认证与安全发布门禁。
- 配置 TLS 与合适的反向代理 / Gateway。
- 不要在前端环境变量或源码中保存真实凭据。

### 数据库

- 常规多用户部署使用 PostgreSQL。
- 上生产前先在 staging 执行 `alembic upgrade head`。
- 常规多用户生产环境不要依赖 SQLite 回退。
- 每次迁移或升级前都要创建并验证 PostgreSQL 备份。

### 附件

- 替换开发用 MinIO/S3 凭据。
- 配置持久对象存储与备份。
- 使用外部 S3 兼容存储时，确保 endpoint、region/TLS 与 Compose endpoint 映射一致。
- 设计备份/恢复时，把数据库与对象存储视为同一套应用数据。

### AI

- 不配置外部 AI Provider 时，核心表格功能仍可运行。
- AI 凭据应通过 QTable 的加密 AI 配置流程保存。
- 对敏感工作空间启用 AI 前，先确认所选 Provider 会接收哪些数据。

## 标准启动方式

把 QTable 与 QTableUI 克隆为同级目录，然后在 QTable 中运行：

```bash
cp .env.example .env
docker compose up --build -d
```

标准栈包含 QTable API、QTableUI、PostgreSQL、Redis 与 MinIO。

## 发布验证

生产关键用途之前：

1. 阅读两个仓库最新 Release Notes。
2. 查看 [发布状态](../../project/release-status/) 与仍开放的发布门禁 Issue。
3. 验证 fresh install、登录、核心表写入、硬刷新持久化与权限拒绝路径。
4. 如果使用附件，验证上传/下载以及失去权限后的拒绝行为。
5. 验证回收站 Restore / Purge。
6. 验证一条具有代表性的 Automation 与 Dashboard 路径。
7. 在非生产副本上实际执行一次备份与恢复。
8. 记录部署的 QTable 与 QTableUI 精确 commit/tag。

正式的备份/恢复/升级 Runbook 由 [QTable #173](https://github.com/QingZoneX/QTable/issues/173) 跟踪。在该任务关闭前，运维方应把备份恢复验证作为自己的发布门禁。
