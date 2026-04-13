# dh-portfolio

Portfolio de Dylan Holin - Développeur avancé & IA en recherche d'alternance à partir de juillet 2026.

Ce portfolio n'est pas juste un site, c'est une déclaration : la sécurité et la vie privée ne sont pas des options, c'est le point de départ.

<img width="1841" height="938" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/fab3311b-efb0-47ea-aeb4-893215123704" />

## Voir le site

[https://dylanholin.github.io/dh-portfolio](https://dylanholin.github.io/dh-portfolio)

## Stack

- HTML5 sémantique & accessible
- CSS3 (variables, grid, animations)
- JavaScript vanilla (ES6+)

## Sécurité et Confidentialité

Parce que votre vie privée mérite mieux que des "terms of service" de 50 pages.

Ce portfolio applique les bonnes pratiques de sécurité et de confidentialité RGPD 2025/2026 dès la première ligne de code. Pas de compromis, pas de tracking, juste du code propre.

### Ce qui est sécurisé

**Content-Security-Policy strict:**
- `script-src 'self'` - Scripts uniquement depuis le domaine (bye bye XSS)
- `style-src 'self'` - Styles externes uniquement (variables CSS, pas de inline)
- `img-src 'self' data:` - Images locales uniquement
- `frame-ancestors 'none'` - Protection contre clickjacking
- `connect-src 'self'` - Connexions uniquement vers le domaine

**Headers de sécurité (via meta tags http-equiv):**
- `X-Content-Type-Options: nosniff` - Protection MIME sniffing
- `X-Frame-Options: DENY` - Anti-clickjacking
- `X-XSS-Protection: 1; mode=block` - Protection XSS
- `Referrer-Policy: no-referrer` - Confidentialité des référents
- `Permissions-Policy` - Géolocalisation, caméra, microphone désactivés

### Ce qui est privacy-friendly

- Zéro cookie, zéro tracking, zéro collecte de données
- Polices système (pas de Google Fonts qui vous traquent)
- Aucun script d'analytics tiers (pas de Google Analytics)
- Email Proton.me
- Mentions légales et politique de confidentialité transparentes

### Contexte GitHub Pages

GitHub Pages ne permet pas les HTTP headers côté serveur (dommage), donc on utilise les meta tags http-equiv. C'est moins efficace que les vrais headers, mais c'est la seule option sur cette plateforme. On fait avec ce qu'on a.

**Variables CSS pour polices système:** Tout est dans style.css (--font-heading, --font-body, --font-mono). Pas de CSS inline, donc pas besoin de hash SHA-256. Simple et propre.

**Pourquoi ces choix:**
- Meta tags http-equiv = seule solution sur GitHub Pages
- Variables CSS = bonnes pratiques professionnelles (pas de inline)
- CSP strict simple = optimal sans complexité inutile
- Conforme aux standards 2025/2026


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
