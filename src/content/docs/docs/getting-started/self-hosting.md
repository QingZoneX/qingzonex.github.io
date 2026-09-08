---
title: 自托管
description: 使用 Docker Compose 运行标准 QTable 与 QTableUI 全栈。
---

标准的一键启动栈由 **QTable 后端仓库**维护。

将 QTable 与 QTableUI 作为同级目录克隆：

```text
qingzone/
├── QTable/
└── QTableUI/
```

然后运行：

```bash
cd QTable
cp .env.example .env
docker compose up --build -d
```

打开 `http://localhost:9100`。

## 包含的服务

当前 Compose 栈包含：

- QTable API
- QTableUI
- PostgreSQL 16
- Redis 7
- MinIO S3 兼容私有附件存储

## 生产部署检查

生产环境建议：

- 数据库使用 PostgreSQL。
- 设置 `APP_ENV=production`。
- 替换示例 `SECRET_KEY`。
- 使用稳定的 `ENCRYPTION_KEY`。
- 替换示例附件存储凭据，或配置托管的 S3 兼容服务。
- 为 PostgreSQL 与对象存储配置持久备份。
- 配置 TLS 与合适的反向代理。
- 多用户生产部署不要使用 SQLite 回退模板。

:::caution[密钥]
不要把真实凭据、API Key 或生产 `.env` 文件提交到源码仓库。
:::
