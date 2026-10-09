---
title: Front web QTable
description: "Interface produit QTable Web App fournie par qtable-web, pile technique et frontières de sécurité."
---

Ce chapitre décrit le **QTable Web App**. Il est implémenté par le dépôt public [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web), la couche front du produit QTable, qui partage les contrats de permission, de données et de version avec [`qtable-server`](https://github.com/QingZoneX/qtable-server).

## Interface produit actuelle

- Home / My Work / Projects Center ;
- Grid / Kanban / Gantt / Calendar / Gallery ;
- Dashboard Center / Workbench ;
- Automation Center et historique d'exécution ;
- Notification Center, Record Workspace / Collaboration / Activity ;
- Global Search / Command paths et Recycle Bin ;
- AI Planning, Project Steward, plan d'action sûr et Source Inbox.

## Pile technique

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## Contrat d'exécution

Le serveur de développement écoute `9100` par défaut et proxifie les requêtes API / GraphQL / WebSocket / Auth / OAuth vers qtable-server qui écoute `9000`. Le conteneur de production sert via Nginx les ressources statiques, le routage SPA et les en-têtes de sécurité.

## Frontières produit

Le front doit respecter les contrats de qtable-server sur les permissions, la pagination, l'audit, les pièces jointes privées et **Preview → Confirm → Apply**. Les grandes tables, l'IA, les Dashboard et le partage public ne peuvent pas télécharger des données cachées côté client ni contourner les frontières de sécurité serveur.
