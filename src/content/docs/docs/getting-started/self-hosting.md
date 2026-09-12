---
title: 自托管
description: 使用 qtable-server 的 Docker Compose 运行 qtable-web、API、PostgreSQL、Redis 与对象存储。
---

QTable 的标准源码自托管路径使用两个同级仓库：`qtable-server` 与 `qtable-web`。

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

在 `qtable-server` 中：

```bash
cp .env.example .env
```

将 `.env` 中的 Web 构建上下文改为当前仓库目录：

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

然后运行：

```bash
docker compose up --build -d
```

默认端口：Web `9100`、API `9000`、PostgreSQL `5432`、Redis `6379`、MinIO API `9001`、MinIO Console `9002`。除 Web 外，标准 Compose 将数据面和管理端口绑定到 `127.0.0.1`。

## 生产环境

- 将 `APP_ENV` 设置为 `production`；
- 使用高强度 `SECRET_KEY` 和稳定有效的 Fernet `ENCRYPTION_KEY`；
- 更换 PostgreSQL 与对象存储凭据；
- 在反向代理配置 TLS、HTTPS 重定向和 HSTS；
- 保持 OAuth plain PKCE、动态客户端注册和密码重置调试 Token 关闭；
- 对 PostgreSQL、对象存储和关键配置执行真实备份 / 恢复演练；
- 记录实际部署的 qtable-server 与 qtable-web commit / tag。

源码公开不意味着某个容器 Tag 已经发布。使用预构建镜像前，请先确认对应 Registry 中存在该精确版本，并与计划部署的源码版本匹配。
