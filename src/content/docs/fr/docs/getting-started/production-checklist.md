---
title: Checklist de production
description: "Vérifications concrètes à effectuer lors de l'évaluation d'un déploiement QTable v0.1.1-alpha auto-hébergé."
---

`v0.1.1-alpha` est un tag Git d'aperçu open source. Avant d'exposer QTable à de vrais utilisateurs, complétez les vérifications ci-dessous dans un environnement reflétant la topologie de production.

## Version et provenance

- [ ] `qtable-server` et `qtable-web` utilisent un tag `v0.1.1-alpha` validé en commun, ou un commit précis plus explicite.
- [ ] En Compose depuis les sources, les deux dépôts sont côte à côte et `QTABLE_UI_CONTEXT=../qtable-web` dans `.env`.
- [ ] Avec des images préconstruites, le tag cible existe réellement dans le registry et le digest est enregistré.
- [ ] Ne pas confondre « tag Git publié » avec « GitHub Release / artefact stable publié ».

## Configuration et secrets

- [ ] `APP_ENV=production`.
- [ ] `SECRET_KEY` par défaut, mot de passe de base de données et identifiants de stockage objet changés.
- [ ] `ENCRYPTION_KEY` Fernet stable et bien formée, partagée entre instances.
- [ ] OAuth plain PKCE, enregistrement dynamique et jeton de débogage désactivés.
- [ ] La clé API du fournisseur n'entre pas dans les variables front, les champs de table ou les journaux.

## Réseau et sécurité navigateur

- [ ] N'exposer que l'entrée web / reverse proxy ; garder API, PostgreSQL, Redis et l'administration MinIO en réseau privé ou boucle locale.
- [ ] Configurer TLS, HTTP → HTTPS et HSTS.
- [ ] Vérifier que CSP, X-Content-Type-Options, Referrer-Policy, la protection anti-frame et Permissions-Policy de qtable-web ne sont pas affaiblies par un proxy externe.

## Boucle produit

1. Connectez-vous et vérifiez les permissions Workspace / objet / ligne.
2. Exécutez réellement des chemins de lecture/écriture représentatifs dans Grid, Kanban, Gantt, Calendar et Gallery.
3. Vérifiez l'agrégation Dashboard, le partage public et le comportement d'accès après changement de permission.
4. Vérifiez l'upload / téléchargement des pièces jointes et le refus après perte de droit.
5. Vérifiez Recycle Bin Restore / Purge.
6. Vérifiez au moins une règle d'automatisation et son historique.
7. Si l'IA est activée, vérifiez Preview → Confirm → Apply et la revalidation des permissions.
8. Effectuez réellement une sauvegarde et une restauration PostgreSQL + stockage objet sur une copie non production.

Le runbook de sauvegarde, restauration et mise à niveau continue d'évoluer pendant l'Alpha. Le déploiement de production doit faire de vrais exercices de restauration, de l'épinglage de version et de la validation de rollback une condition de mise en ligne, pas seulement la présence de « fichiers de sauvegarde ».
