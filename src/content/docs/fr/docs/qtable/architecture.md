---
title: Architecture du système
description: Architecture de QTable composée de qtable-web et qtable-server, services d'exécution et frontières de stockage.
---

QTable adopte une architecture à dépôts séparés front/backend avec un modèle produit unifié :

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## Couche web : qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) gère l'expérience utilisateur, le routage, le rendu des vues, la collaboration et les interfaces de workflow IA. Le serveur de développement écoute `9100` par défaut ; l'image de production utilise Nginx pour servir la SPA, le proxy et les en-têtes de sécurité.

## Couche de services : qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) écoute `9000` par défaut et gère le modèle de données, les permissions, l'automatisation, l'audit, la recherche, les pièces jointes, OAuth et les services IA. Le serveur est la frontière de confiance finale pour les permissions et les règles d'écriture.

## Données et runtime

La pile auto-hébergée standard utilise PostgreSQL 16, Redis 7 et MinIO ou un stockage objet externe S3-compatible. SQLite n'est qu'un repli léger explicite, pas le chemin de déploiement de production par défaut.

## Frontières de sécurité

Tous les détails, la recherche, l'agrégation Dashboard, l'accès aux pièces jointes et le contexte IA doivent passer par la validation des permissions côté serveur. Le client ne peut pas télécharger des données invisibles pour l'utilisateur courant à des fins d'analyse ou d'IA.
