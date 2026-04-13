# dh-portfolio

Portfolio personnel de **Dylan Holin**, développeur avancé & IA en recherche d'alternance.

<img width="1841" height="938" alt="image" src="https://github.com/user-attachments/assets/fab3311b-efb0-47ea-aeb4-893215123704" />

## Voir le site

 [dylanholin.github.io/dh-portfolio](https://dylanholin.github.io/dh-portfolio)

## Stack

- HTML5 sémantique
- CSS3 (variables, grid, animations)
- JavaScript vanilla

## Sécurité et Confidentialité

Ce portfolio respecte les bonnes pratiques de sécurité et de confidentialité RGPD 2025/2026.

### Mesures de sécurité mises en place

**Content-Security-Policy (CSP) strict:**
- `script-src 'self'` - Scripts uniquement depuis le domaine
- `style-src 'self' 'sha256-...'` - Styles externes + hash SHA-256 pour CSS inline spécifique
- `img-src 'self' data:` - Images locales uniquement
- `frame-ancestors 'none'` - Protection contre clickjacking
- `connect-src 'self'` - Connexions uniquement vers le domaine

**Headers de sécurité (via meta tags http-equiv):**
- `X-Content-Type-Options: nosniff` - Protection MIME sniffing
- `X-Frame-Options: DENY` - Anti-clickjacking
- `X-XSS-Protection: 1; mode=block` - Protection XSS
- `Referrer-Policy: no-referrer` - Confidentialité des référents
- `Permissions-Policy` - Géolocalisation, caméra, microphone désactivés

**Confidentialité RGPD:**
- Aucun cookie ni tracking
- Polices système (pas de Google Fonts)
- Aucun script d'analytics tiers
- Email Proton.me (service privacy-first)
- Mentions légales et politique de confidentialité

### Contexte GitHub Pages

**Limitation technique:** GitHub Pages ne supporte pas les HTTP headers personnalisés côté serveur. Les headers de sécurité sont donc implémentés via meta tags `http-equiv` dans le HTML, qui sont moins efficaces que les vrais HTTP headers mais constituent la seule solution disponible sur cette plateforme.

**CSS inline avec hash SHA-256:** Le CSS inline pour les polices système est sécurisé via un hash SHA-256 dans le CSP. Cette approche permet de maintenir un CSP strict tout en autorisant uniquement ce CSS spécifique.

### Conscience des bonnes pratiques professionnelles

**Dans un environnement idéal (avec support HTTP headers):**
- Tous les headers de sécurité seraient configurés côté serveur
- Le CSS serait entièrement dans des fichiers externes (pas de inline)
- Aucun hash SHA-256 ne serait nécessaire
- CSP strict sans compromis

**Pourquoi ces choix sur GitHub Pages:**
- Meta tags http-equiv = seule solution disponible
- Hash SHA-256 = meilleure alternative à 'unsafe-inline' pour CSS inline
- CSP strict malgré les limitations de la plateforme
- Compromis pragmatique entre sécurité et contraintes techniques

Ces choix démontrent une expertise en cybersécurité (OWASP, hardening) tout en s'adaptant aux contraintes de l'hébergement GitHub Pages.

## Structure

```
dh-portfolio/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── images/
    └── fonts/
```

## Contact

- [holinpro@proton.me](mailto:holinpro@proton.me)
- [LinkedIn](https://www.linkedin.com/in/dylan-holin/)
