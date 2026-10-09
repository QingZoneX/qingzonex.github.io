---
title: Guide de contribution
description: Choisir le bon point d'entrée de contribution entre qtable-server, qtable-web et le portail.
---

QTable est un produit, mais le code est maintenu dans des dépôts séparés selon les frontières d'implémentation. Avant de soumettre une issue ou une pull request, choisissez le dépôt responsable de la capacité.

## qtable-server

Pour modifier l'API, le modèle de données, les permissions, l'automatisation, les pièces jointes, l'audit, la recherche, OAuth ou les services IA, lisez le [CONTRIBUTING.md de `QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server/blob/main/CONTRIBUTING.md).

Les changements serveur doivent préserver les contrats de permission, migration, audit, écriture atomique et compatibilité.

## qtable-web

Pour modifier les centres de travail, les vues, Dashboard, Automation, la collaboration, la recherche, l'accessibilité, l'i18n ou les interactions IA, lisez le [CONTRIBUTING.md de `QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web/blob/main/CONTRIBUTING.md).

Le dépôt front contient des vérifications de build, dépendances, sécurité, licences, conteneurs et contrats produit.

## Portail et documentation

Le contenu du portail doit être maintenu en chinois simplifié, chinois traditionnel et anglais, avec pour source de vérité le code actuel, les fichiers de version, l'état des Releases et les issues des dépôts publics. Ne décrivez pas les capacités de la feuille de route comme livrées et n'assimilez pas l'état du code public à des artefacts publiés.
