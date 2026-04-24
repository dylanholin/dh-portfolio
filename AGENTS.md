# AGENTS.md

Instructions pour les assistants IA (Cascade, Cursor, Copilot, Claude Code, etc.) travaillant sur ce dépôt.

> Ce fichier suit la convention émergente AGENTS.md, utilisée par plusieurs assistants IA en 2026 (Codex, Cursor, Cascade, Claude Code, etc.). Il ne s'adresse **pas** aux IA externes (recruteurs, crawlers) — pour cela voir [`llms.txt`](./llms.txt).

## Contexte du projet

- Portfolio personnel de Dylan Holin, étudiant Développeur avancé & IA en recherche d'alternance.
- Production : https://dylanholin.github.io/dh-portfolio
- Repo : https://github.com/dylanholin/dh-portfolio

## Contraintes d'hébergement (GitHub Pages)

- Serveur statique pur : **pas de backend, pas de headers HTTP personnalisés, pas de build serveur**.
- Jekyll est actif par défaut ; ce projet n'utilise pas ses fonctionnalités (pas de front matter, pas de `_config.yml`).
- Les fichiers commençant par `_` seraient ignorés — il n'y en a aucun, ne pas en créer.
- Un push sur `main` déclenche le déploiement automatique.

## Stack technique

- HTML5 sémantique, CSS3 (custom properties, grid, media queries, `@keyframes`), JavaScript vanilla ES6+.
- **Zéro dépendance externe** : pas de `package.json`, pas de CDN, pas de framework, pas de bundler.
- Pas de build, pas de transpilation, pas de minification automatisée.

## Structure du projet

```
├── index.html          # Page unique (toutes les sections)
├── assets/
│   ├── css/style.css   # Tous les styles (variables dans :root, responsive en fin de fichier)
│   ├── js/script.js    # Tout le JS : nav, scroll, animations, canvas spatial (IIFE), modales
│   ├── images/         # favicon.svg, og-image (png + svg)
│   └── docs/           # PDF officiels d'alternance (ne pas renommer)
├── llms.txt            # Résumé public pour IA externes (recruteurs)
├── AGENTS.md           # Ce fichier — instructions pour IA dev
└── README.md           # Documentation humaine du projet
```

## Développement local

Aucune installation n'est nécessaire (zéro dépendance). Pour prévisualiser le site en local :

```bash
# Option 1 : Python (présent sur la plupart des systèmes)
python3 -m http.server 8000

# Option 2 : Node
npx serve .
```

Puis ouvrir http://localhost:8000. Un simple double-clic sur `index.html` fonctionne aussi mais la CSP peut être plus stricte en protocole `file://`.

## Règles non négociables

### Sécurité & CSP
- La CSP déclarée dans `index.html` est stricte : `default-src 'self'`, `script-src 'self'`, `style-src 'self'`, `img-src 'self' data:`.
- Conséquences interdites : CSS inline (attributs `style="..."`), JS inline (`onclick="..."`, `<script>...</script>`), ressources externes (Google Fonts, CDN, analytics, iframes tiers).
- Toute nouvelle intégration doit rester conforme à la CSP existante ou la CSP doit être révisée avec justification.

### Confidentialité RGPD
- Zéro cookie, zéro tracking, zéro collecte de données personnelles.
- Aucun service tiers (analytics, maps, réseaux sociaux embeds).
- Polices système uniquement (variables `--font-*` dans `style.css`).

### Accessibilité (WCAG 2.1 AA)
- Respecter `prefers-reduced-motion` dans **CSS et JavaScript** (l'animation canvas gère déjà ce cas).
- Conserver le skip link, les `aria-label`, `aria-labelledby`, `role="list"` sur listes stylées.
- SVG décoratifs : `aria-hidden="true"` ; SVG porteurs de sens : `aria-label` explicite.
- Focus visible et focus trap dans les modales : ne pas casser.

## Conventions de code

- **Langue des commentaires et noms de classes** : français (cohérence avec l'existant). Ne pas angliciser en cours de route sans refacto globale.
- **Indentation** : 2 espaces en CSS/JS, 4 espaces en HTML.
- **CSS** : variables dans `:root`, nommage kebab-case, pas de `!important` sauf justification.
- **JS** : pas de `var`, préférer `const` ; IIFE pour le code isolé (cf. canvas spatial) ; écouteurs `{ passive: true }` pour `scroll`.
- Pas de commentaires parasites ou blagues dans le code de prod.

## Validation des changements

Aucune suite de tests automatisée n'existe (YAGNI sur ce projet). Avant de proposer une modif, vérifier manuellement :

- **Console navigateur vierge** (pas d'erreur CSP, pas de 404).
- **Accessibilité** : navigation clavier (Tab/Shift+Tab), skip link fonctionnel, focus visible.
- **Reduced motion** : activer `prefers-reduced-motion: reduce` dans les DevTools → le canvas doit être statique, aucune animation CSS.
- **Responsive** : tester 320px, 768px, 1440px minimum.
- **Lighthouse** (DevTools → Lighthouse) : viser Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- **Print** : aperçu avant impression lisible (une fiche papier peut être demandée par un recruteur).

## Workflow Git

- Commits atomiques : **une intention = un commit**. Pas de god commit.
- Format Conventional Commits, messages en français :
  - `feat(scope): ...` — nouvelle fonctionnalité
  - `fix(scope): ...` — correction de bug
  - `chore(scope): ...` — maintenance, nettoyage
  - `docs(scope): ...` — documentation
  - `refactor(scope): ...` — refacto sans changement fonctionnel
  - `style(scope): ...` — mise en forme, CSS cosmétique
- Push direct sur `main` (déploiement GH Pages). Pas de branches par défaut, mais les encourager pour les gros changements.

## Fichiers sensibles

- `index.html` (meta CSP, headers sécurité) : modifier avec justification.
- `llms.txt` : résumé public destiné aux IA externes ; maintenir à jour à chaque modif du CV (disponibilité, projets, formations).
- `assets/docs/*.pdf` : documents officiels d'alternance, ne pas renommer.
- `README.md` : documentation publique du projet, ton professionnel. **À tenir à jour** — avant chaque commit/push, vérifier si les modifications impactent le README (nouvelle fonctionnalité, nouveau fichier à la racine, stack modifiée, contrainte technique mentionnée, section déplacée…). Adapter dans le même commit atomique si possible, sinon dans un commit `docs(readme): ...` séparé immédiatement après.

## Checklist avant de proposer un changement

- [ ] Reste compatible GitHub Pages (pas de backend, pas de build).
- [ ] Respecte la CSP stricte (pas d'inline, pas d'externe).
- [ ] Respecte `prefers-reduced-motion` si nouvelle animation.
- [ ] Pas de nouvelle dépendance externe sans validation explicite.
- [ ] Commit atomique avec message Conventional Commits en français.
- [ ] Pas de régression a11y (skip link, focus, aria).
- [ ] `README.md` à jour si le changement impacte la doc publique (nouvelle section, nouveau fichier, stack, contrainte, structure).
