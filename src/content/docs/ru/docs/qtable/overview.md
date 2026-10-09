---
title: Обзор продукта QTable
description: "Полные возможности QTable v0.1.1-alpha и границы реализации между qtable-web и qtable-server."
---

QTable — цельный открытый AI-native продукт управления проектами и работой. **Веб-фронтенд и сервер вместе образуют один QTable**, использующий модель Table / Record / View / Dashboard / Permission.

Текущий код поддерживается в двух публичных репозиториях:

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App;
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API, доменные сервисы и границы безопасности данных.

## QTable Web App

`qtable-web` сейчас предоставляет:

- Home / My Work / Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center и историю выполнения;
- Notification Center, рабочую область записи, Activity и реальное время;
- глобальный поиск с учётом прав и Recycle Bin;
- AI Planning, Project Steward, безопасный план действий и Source Inbox.

## QTable API & Domain Services

`qtable-server` отвечает за:

- поля, записи, фильтры, сортировки, группировки, именованные представления и Task Profile;
- права Workspace, объекта и строки;
- автоматизацию, агрегацию Dashboard, ChangeSet, аудит и жизненный цикл корзины;
- OAuth2 + S256 PKCE;
- стек PostgreSQL + Redis с явным лёгким откатом к SQLite;
- жизненный цикл приватных вложений, совместимых с S3;
- ИИ-сервисы с учётом прав и путь записи Preview → Confirm → Apply.

## Один продуктовый контракт

Web и API объединяются в самодостаточный QTable через REST / GraphQL / WebSocket / Auth / OAuth. Фронтенд не может обойти права сервера, пагинацию, аудит или правила безопасности вложений. Базовые табличные возможности не требуют внешнего ИИ-провайдера.

## Границы Alpha

Оба репозитория сейчас используют базу `v0.1.1-alpha` / Open Source Preview. Они публичны, но GitHub Release пока нет; состояние кода и состояние артефактов релиза нужно понимать раздельно. См. [матрицу возможностей](../../project/feature-matrix/) и [статус релиза](../../project/release-status/).
