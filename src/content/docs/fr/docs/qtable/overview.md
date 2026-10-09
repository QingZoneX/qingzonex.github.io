---
title: Aperçu du produit QTable
description: "Capacités complètes de QTable v0.1.1-alpha et frontière d'implémentation entre qtable-web et qtable-server."
---

QTable est un produit open source AI-native complet de gestion de projet et du travail. **Le front web et le serveur forment ensemble un même QTable**, partageant le modèle Table / Record / View / Dashboard / Permission.

Le code actuel vit dans deux dépôts publics :

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App ;
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API, services de domaine et frontières de sécurité des données.

## QTable Web App

`qtable-web` fournit actuellement :

- Home / My Work / Projects Center ;
- Grid / Kanban / Gantt / Calendar / Gallery ;
- Dashboard Center / Workbench ;
- Automation Center et historique d'exécution ;
- Notification Center, espace de travail des enregistrements, Activity et temps réel ;
- recherche globale consciente des droits et Recycle Bin ;
- AI Planning, Project Steward, plan d'action sûr et Source Inbox.

## QTable API & Domain Services

`qtable-server` gère :

- champs, enregistrements, filtres, tris, regroupements, vues nommées et Task Profile ;
- permissions workspace, objet et ligne ;
- automatisation, agrégation Dashboard, ChangeSet, audit et cycle de vie de corbeille ;
- OAuth2 + S256 PKCE ;
- pile PostgreSQL + Redis, avec repli léger explicite SQLite ;
- cycle de vie des pièces jointes privées S3-compatible ;
- services IA conscients des droits et chemin d'écriture Preview → Confirm → Apply.

## Un contrat produit unique

Web et API se combinent en un QTable auto-hébergé via REST / GraphQL / WebSocket / Auth / OAuth. Le front ne peut pas contourner les permissions, la pagination, l'audit ou la sécurité des pièces jointes côté serveur. Les capacités table de base n'exigent aucun fournisseur IA externe.

## Frontières de l'Alpha

Les deux dépôts utilisent actuellement la base `v0.1.1-alpha` / Open Source Preview. Ils sont publics, mais aucun GitHub Release n'est publié pour l'instant ; l'état du code et l'état des artefacts de version doivent être compris séparément. Voir la [matrice de fonctionnalités](../../project/feature-matrix/) et le [statut de version](../../project/release-status/).
