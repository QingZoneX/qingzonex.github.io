---
title: Statut de version
description: "État actuel du code public de QTable, tag Alpha et frontières des artefacts de version."
---

La version publique actuelle de QTable est **`v0.1.1-alpha` — Open Source Preview**.

## Code public et tag

Les deux dépôts d'implémentation sont publics et portent tous deux le tag Git `v0.1.1-alpha` :

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

Ils forment ensemble une version produit de QTable. Le front, l'API / Domain Services, la couche de données et le stockage objet doivent être validés sur la même base compatible.

## État des artefacts de version

À ce jour, aucun des deux dépôts n'a de GitHub Release publié correspondant à `v0.1.1-alpha`. Par conséquent, **un tag Git publié ne doit pas être interprété comme un GitHub Release, une image Docker Hub ou un artefact stable publié**. Toute image, Release ou autre artefact dépend des enregistrements de publication réels du dépôt correspondant.

## Attentes de l'Alpha

Cette base convient à l'évaluation du code, au développement communautaire, au staging et aux essais contrôlés. Avant la v1.0, les API publiques, le comportement de migration, le runbook de déploiement et certains contrats produit peuvent encore évoluer.

Avant tout déploiement de production, complétez la [checklist de production](../../getting-started/production-checklist/) et lisez la [matrice de fonctionnalités](../feature-matrix/).
