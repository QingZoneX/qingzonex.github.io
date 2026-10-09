---
title: Модель безопасности
description: Границы прав, аутентификации, публичного доступа, ИИ и приватных вложений в QTable.
---

QTable делает `qtable-server` конечной границей безопасности данных, а `qtable-web` показывает только то, что текущему пользователю разрешено видеть и делать.

## Ключевые инварианты

- Права Workspace, объекта и строки должны выполняться на сервере.
- Поиск, агрегация Dashboard, контекст ИИ и доступ к вложениям не могут обходить одну и ту же модель прав.
- Запись ИИ идёт по Preview → Confirm → Apply с повторной проверкой прав и состояния при Apply.
- Данные Public Dashboard считаются в пределах данных, которые издатель всё ещё может читать.
- OAuth Public Client использует S256 PKCE.
- Секреты нельзя писать в обычные поля таблиц, переменные окружения фронтенда или логи.
- Загрузка, чтение, удаление и восстановление приватных вложений должны повторно проверять авторизацию.

## Веб-контейнер

Прод-образ Nginx для `qtable-web` задаёт CSP, `X-Content-Type-Options`, `Referrer-Policy`, защиту от кликджекинга и ограниченную `Permissions-Policy`. Публичный вход должен обеспечивать reverse proxy: TLS, HTTP → HTTPS и HSTS.

## Рекомендации для production

Перед публичным развёртыванием прочитайте [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md), [`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md) и примечания к версии, затем пройдите [чек-лист production](../../getting-started/production-checklist/).
