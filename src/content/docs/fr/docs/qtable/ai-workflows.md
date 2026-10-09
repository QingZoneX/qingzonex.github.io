---
title: Workflows IA
description: Comment QTable organise la planification et l'exécution IA à partir du modèle produit existant et du contrôle utilisateur.
---

Les capacités IA de QTable partagent le même modèle Table / View / Dashboard / Permission que le travail manuel.

Parcours type :

```text
Décrire un objectif
   ↓
Générer Workspace / Tables
   ↓
Planifier les tâches
   ↓
Estimer la charge et le planning
   ↓
Suggérer des responsables
   ↓
Diagnostiquer les risques du projet
   ↓
Prévisualiser et appliquer les actions
```

## Preview → Confirm → Apply

Le plan d'action IA garde le processus de changement explicite et contrôlable :

1. L'IA ne lit que le contexte visible par l'utilisateur courant.
2. Génère un plan d'action structuré.
3. La prévisualisation ne modifie pas les données métier.
4. L'utilisateur peut n'accepter qu'une partie du plan.
5. Apply revalide les permissions et l'état optimiste/concurrent.

## Configuration du fournisseur

Le code actuel prend en charge les chemins OpenAI-compatible et DeepSeek-compatible. La clé API est enregistrée via le flux de configuration IA chiffré de l'application, pas dans le code source.

Les capacités table de base restent utilisables sans fournisseur IA externe.
