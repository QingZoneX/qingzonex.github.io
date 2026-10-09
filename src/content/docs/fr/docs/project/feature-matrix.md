---
title: Matrice de fonctionnalités
description: Distinguer les capacités livrées de QTable v0.1.1-alpha des directions produit futures.
---

Cette page s'appuie sur le tag `v0.1.1-alpha` / les capacités main actuelles de `qtable-server` et `qtable-web`, pour éviter de décrire les directions planifiées comme livrées.

## Base livrée

| Capacité | État actuel | Dépôt principal |
| --- | --- | --- |
| Home / My Work / Projects Center | Livré | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | Livré | qtable-web + qtable-server |
| Dashboard Center / Workbench / agrégation serveur | Livré | les deux |
| Automation Center / exécution des règles / historique | Livré | les deux |
| Notification / Record Collaboration / Activity | Livré | les deux |
| Recherche globale consciente des droits / Recycle Bin | Livré | les deux |
| Cycle de vie des pièces jointes privées S3-compatible | Livré | qtable-server + qtable-web |
| Workflows Goal / Task / Workload / Project Steward | Base livrée | les deux |
| Source Inbox | Base livrée | les deux |
| OAuth2 + S256 PKCE | Livré | qtable-server + qtable-web |

## Plans produit futurs

Le travail continue selon des directions produit plutôt qu'en liant le portail à des numéros d'issue GitHub précis :

- **Qualité de version et mise à l'échelle** : renforcer la validation de bout en bout, la performance des grandes tables, la stabilité temps réel, le responsive, l'accessibilité, l'i18n, ainsi que l'expérience de sauvegarde, restauration et mise à niveau en auto-hébergement.
- **Ouverture et intégration** : étendre progressivement formulaires / collecte publique, API, Webhook, Connector et ingestion de sources pour intégrer QTable aux systèmes existants.
- **Plateforme IA et automatisation** : étendre BYO / Self-hosted AI, les agents conscients des droits et l'orchestration de l'automatisation, en conservant le chemin d'écriture sûr Preview → Confirm → Apply.
- **Écosystème QingZoneX** : les futures expériences de travail de plus haut niveau réutiliseront les données structurées, les permissions, la collaboration et l'automatisation de QTable plutôt que de reconstruire un second modèle de données.

Ces éléments sont directionnels, ne constituent pas des dates de livraison engagées et ne doivent pas être décrits comme livrés. Les capacités disponibles restent définies par le tag `v0.1.1-alpha`, le code actuel et les artefacts réels.
