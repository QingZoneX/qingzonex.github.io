---
title: Веб-фронтенд QTable
description: "Продуктовый интерфейс QTable Web App от qtable-web, стек и границы безопасности."
---

Эта глава описывает **QTable Web App**. Его реализует публичный репозиторий [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — веб-слой продукта QTable, который разделяет контракты прав, данных и релиза с [`qtable-server`](https://github.com/QingZoneX/qtable-server).

## Текущий продуктовый интерфейс

- Home / My Work / Projects Center;
- Grid / Kanban / Gantt / Calendar / Gallery;
- Dashboard Center / Workbench;
- Automation Center и история выполнения;
- Notification Center, Record Workspace / Collaboration / Activity;
- Global Search / Command paths и Recycle Bin;
- AI Planning, Project Steward, безопасный план действий и Source Inbox.

## Стек

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## Контракт выполнения

Сервер разработки слушает `9100` по умолчанию и проксирует API / GraphQL / WebSocket / Auth / OAuth к qtable-server, который слушает `9000`. Прод-контейнер через Nginx отдаёт статику, SPA-маршрутизацию и защитные заголовки.

## Границы продукта

Фронтенд обязан соблюдать контракты qtable-server по правам, пагинации, аудиту, приватным вложениям и **Preview → Confirm → Apply**. Большие таблицы, ИИ, Dashboard и публичный доступ не могут скачивать скрытые данные на клиенте или обходить серверные границы безопасности.
