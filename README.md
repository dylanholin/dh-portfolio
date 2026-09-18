# dh-portfolio

Portfolio personnel

[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen?style=flat-square)](https://github.com/dylanholin/dh-portfolio)
[![RGPD](https://img.shields.io/badge/RGPD-Privacy--friendly-blue?style=flat-square)](https://www.cnil.fr/)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA_visé-8b5cf6?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![No Tracking](https://img.shields.io/badge/Tracking-None-critical?style=flat-square)](https://github.com/dylanholin/dh-portfolio)


## Voir le site

[https://dylanholin.github.io/dh-portfolio](https://dylanholin.github.io/dh-portfolio)

## Stack

- HTML5 sémantique et accessible
- CSS3 : custom properties, Grid, Flexbox, animations `@keyframes`, media queries et `prefers-reduced-motion`
- JavaScript vanilla ES6+ : navigation mobile, `IntersectionObserver`, thème clair/sombre, modales accessibles, copie de l’adresse email et pagination des projets
- GitHub Pages pour l’hébergement statique
- **Zéro dépendance externe, zéro build, zéro cookie, zéro outil d’analytics tiers**

## Sécurité et confidentialité

Le projet applique une approche de sécurité et de confidentialité adaptée à un site statique GitHub Pages.

### Mesures appliquées

- Politique de sécurité du contenu (CSP) déclarée dans le document HTML
- Ressources locales privilégiées : scripts, styles, images et polices système
- Aucune police Google Fonts ou service tiers chargé par défaut
- `Referrer-Policy: no-referrer` déclaré dans le document
- `Permissions-Policy` restrictive : géolocalisation, microphone, caméra, paiement et USB désactivés
- Balises de compatibilité de sécurité déclarées dans le document HTML
- Liens externes ouverts avec `rel="noopener noreferrer"`
- Aucun formulaire de collecte, cookie, tracker ou analytics tiers
- Adresse de contact Proton Mail
- Mentions légales et politique de confidentialité disponibles dans le site

> **Note GitHub Pages :** GitHub Pages est un hébergement statique et ne permet pas de configurer librement des en-têtes HTTP côté serveur. Les protections applicables au niveau du document sont donc déclarées dans `index.html`. Pour un contrôle complet des en-têtes HTTP de sécurité, un reverse proxy ou un hébergement avec configuration serveur serait nécessaire.

### CSP déclarée

La CSP limite les ressources aux origines attendues :

- `default-src 'self'`
- `script-src 'self'`
- `style-src 'self'`
- `img-src 'self' data:`
- `font-src 'self'`
- `connect-src 'self'`
- `base-uri 'self'`
- `form-action 'self'`

Le projet n’utilise pas `X-XSS-Protection`, mécanisme déprécié et non recommandé comme protection moderne contre les XSS. La défense principale repose sur une CSP restrictive et sur l’absence de scripts tiers ou de code inline inutile.

## Accessibilité

L’objectif est de viser WCAG 2.1 niveau AA, avec notamment :

- Lien d’évitement vers le contenu principal
- Navigation clavier et styles `:focus-visible`
- Cibles tactiles adaptées sur mobile
- Navigation mobile accessible avec bouton et états ARIA
- Modales avec gestion du focus et fermeture via la touche `Échap`
- Icônes décoratives masquées des lecteurs d’écran lorsque nécessaire
- Zone d’annonce `aria-live` après la copie de l’adresse email
- Respect de `prefers-reduced-motion` : animations et transitions réduites, scroll fluide désactivé pour les personnes qui le demandent
- Mode clair et sombre détecté via `prefers-color-scheme`, avec sélecteur manuel et préférence conservée en local via `localStorage`
- Styles d’impression fournis

## Structure

```text
dh-portfolio/
├── index.html           # Page unique : contenu, métadonnées et données structurées
├── assets/
│   ├── css/style.css    # Variables, thèmes, composants, responsive et impression
│   ├── js/script.js     # Navigation, animations, thème, modales, copie et projets
│   ├── images/          # Favicon et images Open Graph
│   └── docs/            # CV PDF et documents complémentaires
├── llms.txt             # Résumé structuré destiné aux IA qui consultent le site
├── AGENTS.md            # Instructions pour les assistants IA qui modifient le projet
└── README.md            # Documentation du projet
```

## Fichiers destinés aux IA

Le dépôt contient deux fichiers complémentaires destinés aux usages IA :

- **`llms.txt`** : résumé public et structuré pour les IA qui consultent ou résument le portfolio, par exemple dans un contexte de recrutement.
- **`AGENTS.md`** : règles de contribution pour les assistants de développement tels que Cursor, Copilot, Claude Code ou Cascade ; il documente les contraintes GitHub Pages, CSP, accessibilité et workflow Git.

Ces fichiers ont des rôles distincts : `llms.txt` décrit le portfolio, tandis que `AGENTS.md` décrit comment modifier le projet sans casser ses contraintes techniques.

## Contact

- Email : [holinpro@proton.me](mailto:holinpro@proton.me)
- GitHub : [github.com/dylanholin](https://github.com/dylanholin)
- LinkedIn : [linkedin.com/in/dylan-holin](https://www.linkedin.com/in/dylan-holin/)
- CV Informatique : disponible depuis la section Contact du site
- CV Commerce & administratif : disponible depuis la section Contact du site

Pour des raisons de sécurité, le numéro de téléphone n’est pas publié en ligne. Il est communiqué par email après un premier échange.

## Licence

Le code source est public à titre de démonstration. Les contenus personnels, CV, documents PDF, identité visuelle et informations professionnelles restent la propriété de Dylan Holin.
