---
title: Быстрый старт
description: Запустите полный QTable локально из публичных репозиториев qtable-server и qtable-web.
---

## 1. Склонируйте два репозитория реализации

Положите оба репозитория в одну родительскую папку:

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

Структура должна выглядеть так:

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. Настройте Compose сервера

```bash
cd qtable-server
cp .env.example .env
```

Текущий Compose сервера сохраняет совместимые значения по умолчанию для старой структуры каталогов, поэтому с текущими публичными именами репозиториев нужно явно задать в `.env`:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

Для локальной разработки можно оставить учётные данные из `.env.example`; для любых общих или публичных сред смените `SECRET_KEY`, учётные данные хранилища вложений и задайте стабильный `ENCRYPTION_KEY`.

## 3. Запустите полный стек

```bash
docker compose up --build -d
```

Откройте `http://localhost:9100`. Web — вход для пользователя; API, PostgreSQL, Redis и MinIO по умолчанию привязаны только к локальному адресу.

## 4. Проверка

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

Базовые табличные возможности не требуют внешнего ИИ-провайдера. При необходимости настройте провайдера через зашифрованный процесс настройки ИИ в QTable и не пишите реальный API-ключ в переменные окружения фронтенда или файлы репозитория.

Подробнее о развёртывании — [самостоятельный хостинг](../self-hosting/) и [чек-лист production](../production-checklist/).
