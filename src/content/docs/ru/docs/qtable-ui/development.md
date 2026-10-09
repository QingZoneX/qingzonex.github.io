---
title: Разработка веб-фронтенда
description: Локальная разработка qtable-web, соглашения о прокси и гейты качества.
---

Репозиторий реализации фронтенда QTable — [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web).

## Локальная разработка

Требования: Node.js 22 и qtable-server, слушающий `http://localhost:9000`.

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

Сервер разработки слушает `http://localhost:9100` по умолчанию и проксирует трафик API / GraphQL / WebSocket / Auth / OAuth к qtable-server.

Не кладите реальные учётные данные в переменные окружения фронтенда. npm и корневой `package-lock.json` — воспроизводимый путь установки.

## Основные гейты качества

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

В репозитории также есть контрактные проверки OAuth, поиска, ИИ, полей Member, Source Inbox, Dashboard, Automation, вложений и service workers. Перед коммитом ориентируйтесь на текущие `package.json` и CI репозитория как на итоговый источник команд.

## Связка с сервером

Для полного стека склонируйте `qtable-server` и `qtable-web` рядом по [быстрому старту](../../getting-started/quick-start/) и убедитесь, что `QTABLE_UI_CONTEXT` указывает на `../qtable-web`.
