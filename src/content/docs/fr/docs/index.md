---
title: Documentation QTable
description: "Documentation complète de QTable, le produit open source de QingZoneX, couvrant l'expérience web, les services API, l'auto-hébergement, la sécurité, les pièces jointes et les workflows IA."
sidebar:
  order: 1
---

**QTable** est le produit actuellement présenté par QingZoneX en open source : un système de gestion de projet et du travail AI-native construit sur des tables multidimensionnelles.

Du point de vue utilisateur, QTable est un produit complet ; d'un point de vue ingénierie, il est composé de deux dépôts publics d'implémentation. Les deux couches partagent le même modèle Table / Record / View / Dashboard / Permission et collaborent via des contrats REST / GraphQL / WebSocket / Auth / OAuth.

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — backend FastAPI / Strawberry GraphQL, modèle de données, permissions, automatisation, audit, pièces jointes, recherche, OAuth et services IA.
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — application React, centres de travail, Grid / Kanban / Gantt / Calendar / Gallery, tableaux de bord, collaboration, automatisation et interactions IA.

Les deux dépôts reposent actuellement sur la base `v0.1.1-alpha` / Open Source Preview, sous **Apache License 2.0**. Un dépôt public ne signifie pas qu'un GitHub Release, une image Docker ou un autre artefact est publié ; consultez le [statut de version](./project/release-status/) et les Releases de chaque dépôt.

## Parcours de lecture recommandé

1. Lancez le QTable complet en local via le [démarrage rapide](./getting-started/quick-start/).
2. Lisez l'[architecture de QTable](./qtable/architecture/) pour comprendre les frontières web, API, données et stockage.
3. Consultez l'[aperçu produit QTable](./qtable/overview/) pour la base de capacités actuelle.
4. Pour l'implémentation front et le développement local, voyez le [développement front](./qtable-ui/development/).
5. Avant tout déploiement public, vérifiez le [modèle de sécurité](./qtable/security/) et la [checklist de production](./getting-started/production-checklist/).
6. Utilisez la [matrice de fonctionnalités](./project/feature-matrix/) pour distinguer livré, en consolidation et planifié.

:::caution[Statut Alpha]
Cette version convient à l'évaluation, au développement communautaire, au staging et aux essais contrôlés. Avant la v1.0, les API publiques, les comportements de migration et certains contrats produit peuvent encore évoluer.
:::
