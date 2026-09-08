---
title: 安全模型
description: 权限、AI、附件、公开 Dashboard 与 OAuth 流程的重要安全不变量。
---

QTable 的安全模型属于应用架构的一部分，而不是前端约定。

## 重要不变量

- AI 上下文必须遵守当前用户的行可见性。
- Preview 不得修改业务数据。
- Apply 必须重新校验权限以及乐观/并发状态。
- Member 值必须指向当前 Workspace 成员。
- Attachment 值必须解析到绑定同一 Table、Row 与 Attachment Field 的有效 Registry 条目。
- 直接 URL 或 presigned URL 不能作为持久附件数据。
- 附件读取会重新检查当前 Table + Row 权限，并以 `private, no-store` 方式提供。
- Public Dashboard 数据基于发布者当前仍可读取的数据范围计算。
- OAuth Public Client 使用 S256 PKCE。
- Secret 不得写入普通表字段或日志。

## 生产环境建议

对公网开放部署前，请阅读仓库最新 [`SECURITY.md`](https://github.com/QingZoneX/QTable/blob/main/SECURITY.md) 以及计划部署版本的 Release Notes。
