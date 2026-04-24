# dh-portfolio

Portfolio de Dylan Holin - Développeur avancé & IA en recherche d'alternance à partir de juillet 2026.

<img width="1841" height="938" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/fab3311b-efb0-47ea-aeb4-893215123704" />

## Voir le site

[https://dylanholin.github.io/dh-portfolio](https://dylanholin.github.io/dh-portfolio)

## Stack

- HTML5 sémantique & accessible
- CSS3 (variables, grid, animations)
- JavaScript vanilla (ES6+)

## Sécurité et Confidentialité

Parce que votre vie privée mérite mieux et que la sécurité ne doit pas être une option.

Ce portfolio applique les bonnes pratiques de sécurité et de confidentialité RGPD dès la première ligne de code, le tracking est tout simplement banni et le portfolio est conforme aux standards 2026

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
- `Referrer-Policy: no-referrer` - Confidentialité des référents
- `Permissions-Policy` - Géolocalisation, caméra, microphone désactivés

> Note : `X-XSS-Protection` n'est volontairement pas utilisé (déprécié, retiré de Chrome, déconseillé par OWASP — il peut introduire des vulnérabilités dans certains scénarios). La protection repose sur la CSP stricte.

### Ce qui est privacy-friendly

- Zéro cookie, zéro tracking, zéro collecte de données
- Polices système (pas de Google Fonts qui vous traquent)
- Aucun script d'analytics tiers (pas de Google Analytics)
- Email Proton.me
- Mentions légales et politique de confidentialité transparentes

### Contexte GitHub Pages

GitHub Pages ne permet pas les HTTP headers côté serveur (dommage), donc on utilise les meta tags http-equiv. C'est moins efficace que les vrais headers, mais c'est la seule option dans ce cas sur cette plateforme... faut parfois faire avec ce qu'on a.

**Variables CSS pour polices système:** Tout est dans style.css (--font-heading, --font-body, --font-mono). Pas de CSS inline, donc plus besoin de hash SHA-256. C'est plus simple et propre.

**Pourquoi ces choix:**
- Meta tags http-equiv = seule solution sur GitHub Pages
- Variables CSS = bonnes pratiques professionnelles (pas de inline)
- CSP strict simple = optimal sans complexité inutile

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
oui Linkedin... j'optimise mes chances, ce n'est pas dans une cave seul que je vais pouvoir progresser, une alternative privacy friendly à linkedin serait bienvenue
