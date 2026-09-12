---
title: Contributing
description: Choose the correct contribution entry point across qtable-server, qtable-web and the portal.
---

QTable is one product with source split by implementation responsibility. Before opening an issue or pull request, choose the repository that owns the capability.

## qtable-server

For API, data-model, permissions, automation, attachments, audit, search, OAuth or AI-service changes, read [`QingZoneX/qtable-server` CONTRIBUTING.md](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md).

Server changes must preserve authorization, migration, audit, atomic-write and compatibility contracts.

## qtable-web

For work centers, views, dashboards, automation UI, collaboration, search, accessibility, localization or AI interactions, read [`QingZoneX/qtable-web` CONTRIBUTING.md](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md).

The web repository includes build, dependency, security, license, container and product-contract gates.

## Portal and docs

Portal content must remain aligned across Simplified Chinese, Traditional Chinese and English. Treat current public source, version files, Release state and GitHub Issues as the evidence base. Do not present roadmap work as shipped capability, and do not present public source status as a published release artifact.
