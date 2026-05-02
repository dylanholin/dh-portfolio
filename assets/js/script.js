// ══════════════════════════════════════════════════════════
// ══  Portfolio Dylan Holin - Scripts                     ══
// ══════════════════════════════════════════════════════════

// ── Navigation scroll state ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Mobile menu ──
const menuBtn = document.getElementById('menu-btn');
const navLiens = document.getElementById('nav-liens');
menuBtn.addEventListener('click', () => {
  const isOpen = navLiens.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});
navLiens.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLiens.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll animations ──
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
animatedEls.forEach(el => observer.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-liens a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── Année dynamique footer ──
document.getElementById('annee-footer').textContent = new Date().getFullYear();

// ══════════════════════════════════════════════════════════
// ══  PIXEL ART SPACE ANIMATION - Thème Spatial 32x32     ══
// ══════════════════════════════════════════════════════════
(function() {
  const canvas = document.getElementById('pixel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let W, H, prevW = 0;
  
  // Palette spatiale améliorée
  const C = {
    // Étoiles
    star: '#FFFFFF',
    starDim: '#8899AA',
    starWarm: '#FFE4B5',
    starCool: '#B0C4DE',
    // Planètes
    sunCore: '#FFD700',
    sunGlow: '#FF8C00',
    sunCorona: '#FF4500',
    mercury: '#8B8682',
    venus: '#E6C35C',
    earthBlue: '#4A90D9',
    earthGreen: '#228B22',
    earthCloud: '#F0F8FF',
    mars: '#CD5C5C',
    marsDark: '#8B3A3A',
    jupiter: '#D4A574',
    jupiterBand: '#8B7355',
    saturn: '#F4D59E',
    saturnRing: '#C9A86C',
    neptune: '#4169E1',
    // Astéroïdes
    rock1: '#696969',
    rock2: '#808080',
    rock3: '#A9A9A9',
    rock4: '#5C5C5C',
    // Vaisseaux
    shipBody: '#C0C0C0',
    shipDark: '#708090',
    shipLight: '#E8E8E8',
    shipEngine: '#00BFFF',
    flame1: '#FF6347',
    flame2: '#FF8C00',
    flame3: '#FFD700',
    // Effets
    cyan: '#00E5CC',
    blue: '#4F90F7',
    purple: '#9370DB',
    nebula1: '#1a0a2e',
    nebula2: '#0d1b3e'
  };
  
  let stars = [], trails = [], spaceObjects = [], nebulaClouds = [], exclusionZones = [];

  // Canvas offscreen pour les nébuleuses : rendu statique dessiné 1 fois dans init()
  // puis blitté chaque frame via drawImage (beaucoup moins cher qu'un gradient par frame)
  const nebulaCanvas = document.createElement('canvas');
  const nebulaCtx = nebulaCanvas.getContext('2d');

  function renderNebulaLayer() {
    nebulaCanvas.width = W;
    nebulaCanvas.height = H;
    nebulaCtx.clearRect(0, 0, W, H);
    nebulaClouds.forEach(cloud => {
      const gradient = nebulaCtx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.radius
      );
      gradient.addColorStop(0, cloud.color);
      gradient.addColorStop(1, 'transparent');
      nebulaCtx.globalAlpha = cloud.alpha;
      nebulaCtx.fillStyle = gradient;
      nebulaCtx.fillRect(cloud.x - cloud.radius, cloud.y - cloud.radius,
                         cloud.radius * 2, cloud.radius * 2);
    });
    nebulaCtx.globalAlpha = 1;
  }

  // Calcule les zones protégées depuis les positions réelles des éléments texte
  function calcExclusionZones() {
    exclusionZones = [];
    const canvasRect = canvas.getBoundingClientRect();
    ['.hero-badge', '.hero-contenu'].forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const r = el.getBoundingClientRect();
      exclusionZones.push({
        x: r.left - canvasRect.left,
        y: r.top  - canvasRect.top,
        w: r.width,
        h: r.height
      });
    });
  }

  // Vérifie si (x, y) tombe dans une zone protégée (avec marge autour)
  function isInTextZone(x, y, margin = 10) {
    return exclusionZones.some(z =>
      x > z.x - margin && x < z.x + z.w + margin &&
      y > z.y - margin && y < z.y + z.h + margin
    );
  }
  
  // Position aléatoire hors zone texte
  function randomPosOutsideText() {
    let x, y, attempts = 0;
    do {
      x = Math.random() * W;
      y = Math.random() * H;
      attempts++;
    } while (isInTextZone(x, y, 15) && attempts < 50);
    return { x, y };
  }
  
  function resize() {
    const newW = canvas.offsetWidth;
    W = canvas.width = newW;
    H = canvas.height = canvas.offsetHeight;
    calcExclusionZones();
    if (prevW !== newW) {
      prevW = newW;
      init();
      // En mode reduced-motion, la boucle rAF est à l'arrêt : on force un
      // redraw manuel pour ne pas laisser un canvas vide après resize.
      if (motionQuery.matches && canvasVisible && !document.hidden) {
        draw(performance.now());
      }
    }
  }
  
  // Dessiner un pixel à une position absolue
  function px(x, y, color, alpha = 1) {
    if (x < 0 || x > W || y < 0 || y > H) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  }
  
  // Dessiner un carré de pixels
  function pxBlock(x, y, size, color, alpha = 1) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  }
  
  function init() {
    // Nuages de nébuleuse (fond)
    nebulaClouds = [];
    for (let i = 0; i < 5; i++) {
      nebulaClouds.push({
        x: Math.random() * W,
        y: Math.random() * H,
        radius: 80 + Math.random() * 120,
        color: Math.random() > 0.5 ? C.nebula1 : C.nebula2,
        alpha: 0.1 + Math.random() * 0.15
      });
    }
    // Pré-rendu des nébuleuses dans le canvas offscreen (statique)
    renderNebulaLayer();
    
    // Étoiles de fond (beaucoup plus)
    stars = [];
    for (let i = 0; i < 150; i++) {
      const type = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        bright: 0.3 + Math.random() * 0.7,
        speed: 0.002 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        size: type > 0.95 ? 3 : (type > 0.8 ? 2 : 1),
        color: type > 0.7 ? C.starWarm : (type > 0.4 ? C.star : C.starCool)
      });
    }
    
    // 15 traînées d'étoiles filantes
    trails = [];
    for (let i = 0; i < 15; i++) trails.push(createTrail());
    
    // Objets spatiaux pixel art 32x32
    spaceObjects = [];
    
    // ═══════════════════════════════════════════════════
    // ÉCHELLES RÉALISTES DU SYSTÈME SOLAIRE
    // Soleil: 1,392,000 km → 40px (référence)
    // Jupiter: 139,820 km → 32px
    // Saturne: 116,460 km → 28px
    // Neptune: 49,528 km → 16px
    // Terre: 12,742 km → 10px
    // Vénus: 12,104 km → 10px
    // Mars: 6,779 km → 7px
    // Astéroïdes: 1-500 km → 2-5px
    // ═══════════════════════════════════════════════════
    
    // SOLEIL (hors zone texte)
    const sunPos = randomPosOutsideText();
    spaceObjects.push({
      type: 'sun',
      x: sunPos.x,
      y: sunPos.y,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.05,
      size: 40,
      alpha: 0.9
    });
    
    // Planètes à échelle réaliste (hors zone texte)
    const planets = [
      { name: 'jupiter', size: 32, colors: [C.jupiter, C.jupiterBand] },
      { name: 'saturn', size: 28, hasRing: true },
      { name: 'neptune', size: 16, color: C.neptune },
      { name: 'earth', size: 10 },
      { name: 'venus', size: 10, color: C.venus },
      { name: 'mars', size: 7, colors: [C.mars, C.marsDark] }
    ];
    
    planets.forEach(p => {
      const pos = randomPosOutsideText();
      spaceObjects.push({
        type: 'planet',
        ...p,
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        alpha: 0.75 + Math.random() * 0.2
      });
    });
    
    // Astéroïdes PETITS (2-5px) - échelle réaliste
    for (let i = 0; i < 8; i++) {
      const pos = randomPosOutsideText();
      spaceObjects.push({
        type: 'asteroid',
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.floor(Math.random() * 4),
        seed: Math.random() * 1000,
        alpha: 0.6 + Math.random() * 0.3
      });
    }
    
    // 3 vaisseaux : BLEU, BLANC, ROUGE
    const shipColors = [
      { body: '#4A90D9', light: '#87CEEB', dark: '#1E3A5F', name: 'bleu' },
      { body: '#F0F0F0', light: '#FFFFFF', dark: '#A0A0A0', name: 'blanc' },
      { body: '#DC3545', light: '#FF6B6B', dark: '#8B0000', name: 'rouge' }
    ];
    
    shipColors.forEach((colors, i) => {
      const goingRight = i % 2 === 0;
      const yZone = i === 0 ? 0.15 : (i === 1 ? 0.5 : 0.85);
      const yPos = H * yZone + (Math.random() - 0.5) * H * 0.15;
      spaceObjects.push({
        type: 'ship',
        x: goingRight ? -30 : W + 30,
        y: yPos,
        vx: goingRight ? (0.2 + Math.random() * 0.15) : -(0.2 + Math.random() * 0.15),
        vy: (Math.random() - 0.5) * 0.05,
        facingRight: goingRight,
        scale: 1.2,
        shipColors: colors,
        pattern: buildShipPattern(colors),
        alpha: 0.9
      });
    });

    // Tri par taille (depth) calculé une fois ici plutôt qu'à chaque frame
    spaceObjects.sort((a, b) => (b.size || 0) - (a.size || 0));
  }
  
  function createTrail() {
    return {
      x: Math.random() * W,
      y: -20,
      speed: 1 + Math.random() * 2,
      len: 15 + Math.floor(Math.random() * 25),
      color: Math.random() > 0.5 ? C.cyan : C.blue
    };
  }
  
  // ══════════════════════════════════════════════════════════
  // ══  DESSIN DES OBJETS 32x32                              ══
  // ══════════════════════════════════════════════════════════
  
  function drawSun(obj, timestamp) {
    const { x, y, size, alpha } = obj;
    const cx = x + size/2, cy = y + size/2;
    const time = timestamp * 0.001;
    
    // Corona externe (effet de flammes)
    for (let angle = 0; angle < Math.PI * 2; angle += 0.3) {
      const flareLen = 8 + Math.sin(time * 2 + angle * 3) * 4;
      for (let r = size/2; r < size/2 + flareLen; r += 2) {
        const fx = cx + Math.cos(angle) * r;
        const fy = cy + Math.sin(angle) * r;
        const flareAlpha = (1 - (r - size/2) / flareLen) * 0.4 * alpha;
        pxBlock(fx - 1, fy - 1, 3, C.sunCorona, flareAlpha);
      }
    }
    
    // Glow externe
    for (let r = size/2 + 2; r < size/2 + 12; r += 2) {
      ctx.globalAlpha = (1 - (r - size/2) / 12) * 0.25 * alpha;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = C.sunGlow;
      ctx.fill();
    }
    
    // Corps du soleil
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dist = Math.sqrt((i - size/2)**2 + (j - size/2)**2);
        if (dist < size/2) {
          const gradient = dist / (size/2);
          const color = gradient < 0.6 ? C.sunCore : C.sunGlow;
          px(x + i, y + j, color, alpha);
        }
      }
    }
  }
  
  function drawPlanet(obj) {
    const { x, y, size, name, color, colors, hasRing, alpha } = obj;
    
    // Corps de la planète (cercle)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dist = Math.sqrt((i - size/2)**2 + (j - size/2)**2);
        if (dist < size/2) {
          let c;
          
          if (name === 'earth') {
            // Terre avec continents (pattern fixe, pas de random)
            const noise = Math.sin(i * 0.5 + size) * Math.cos(j * 0.4 + size);
            c = noise > 0.3 ? C.earthGreen : C.earthBlue;
            // Nuages fixes basés sur position
            if (Math.sin(i * 0.8 + j * 0.6) > 0.7) c = C.earthCloud;
          } else if (name === 'jupiter') {
            // Jupiter avec bandes
            c = (j % 6 < 3) ? colors[0] : colors[1];
          } else if (name === 'mars') {
            // Mars avec variations (pattern fixe)
            c = (Math.sin(i * 0.7 + j * 0.5) > 0.4) ? colors[1] : colors[0];
          } else if (name === 'saturn') {
            c = C.saturn;
          } else {
            c = color || C.rock2;
          }
          
          // Ombrage 3D
          const shade = 1 - (i / size) * 0.3;
          ctx.globalAlpha = alpha * shade;
          px(x + i, y + j, c, alpha * shade);
        }
      }
    }
    
    // Anneaux de Saturne
    if (hasRing) {
      const ringY = y + size/2;
      for (let r = -size * 0.8; r < size * 1.8; r++) {
        if (r < 0 || r > size) {
          const ringDist = Math.abs(r - size/2);
          const ringAlpha = Math.max(0, 1 - ringDist / (size * 0.8)) * 0.6;
          for (let ry = -2; ry <= 2; ry++) {
            px(x + r, ringY + ry * 0.3, C.saturnRing, ringAlpha * alpha);
          }
        }
      }
    }
  }
  
  function drawAsteroid(obj) {
    const { x, y, size, seed, alpha } = obj;
    
    // Génération procédurale basée sur seed
    const rng = (n) => Math.abs(Math.sin(seed + n * 127.1) * 43758.5453) % 1;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const dist = Math.sqrt((i - size/2)**2 + (j - size/2)**2);
        // Forme irrégulière
        const irregularity = rng(i * 17 + j * 31) * 0.3;
        const threshold = size/2 * (0.7 + irregularity);
        
        if (dist < threshold) {
          // Texture rocheuse
          const texNoise = rng(i * 13 + j * 7 + seed);
          let c;
          if (texNoise > 0.8) c = C.rock3;
          else if (texNoise > 0.5) c = C.rock2;
          else if (texNoise > 0.2) c = C.rock1;
          else c = C.rock4;
          
          // Cratères
          const craterCheck = rng(Math.floor(i/4) * 100 + Math.floor(j/4));
          if (craterCheck > 0.85) c = C.rock4;
          
          px(x + i, y + j, c, alpha);
        }
      }
    }
  }
  
  function buildShipPattern(sc) {
    return [
      { dx: 0, dy: 3, c: sc.dark },
      { dx: 1, dy: 2, c: sc.dark },
      { dx: 1, dy: 3, c: sc.body },
      { dx: 1, dy: 4, c: sc.dark },
      { dx: 2, dy: 1, c: sc.dark },
      { dx: 2, dy: 2, c: sc.body },
      { dx: 2, dy: 3, c: sc.light },
      { dx: 2, dy: 4, c: sc.body },
      { dx: 2, dy: 5, c: sc.dark },
      { dx: 3, dy: 1, c: sc.dark },
      { dx: 3, dy: 2, c: sc.body },
      { dx: 3, dy: 3, c: sc.light },
      { dx: 3, dy: 4, c: sc.body },
      { dx: 3, dy: 5, c: sc.dark },
      { dx: 4, dy: 2, c: sc.body },
      { dx: 4, dy: 3, c: sc.light },
      { dx: 4, dy: 4, c: sc.body },
      { dx: 5, dy: 2, c: sc.body },
      { dx: 5, dy: 3, c: sc.light },
      { dx: 5, dy: 4, c: sc.body },
      { dx: 6, dy: 3, c: '#00FFFF' },
      { dx: 7, dy: 3, c: sc.light }
    ];
  }
  
  function drawShip(obj, timestamp) {
    const { x, y, facingRight, alpha, scale = 1 } = obj;
    const time = timestamp * 0.01;
    const s = Math.floor(2 * scale);
    
    // Dessiner le vaisseau avec scale (pattern pré-calculé dans init)
    obj.pattern.forEach(p => {
      const px_ = facingRight ? p.dx : (7 - p.dx);
      pxBlock(x + px_ * s, y + p.dy * s, s, p.c, alpha);
    });
    
    // Flammes du réacteur (animées)
    const flameLen = Math.floor((4 + Math.sin(time) * 1.5) * scale);
    for (let f = 0; f < flameLen; f++) {
      const flameX = facingRight ? x - f * s - s : x + 8 * s + f * s;
      const flameAlpha = (1 - f / flameLen) * 0.8 * alpha;
      const flameColor = f < 2 ? C.flame3 : (f < 3 ? C.flame2 : C.flame1);
      pxBlock(flameX, y + 3 * s + Math.sin(time + f) * 1.5, s, flameColor, flameAlpha);
      pxBlock(flameX, y + 4 * s + Math.cos(time + f) * 1.5, s, flameColor, flameAlpha * 0.7);
    }
  }
  
  // ══════════════════════════════════════════════════════════
  // ══  BOUCLE PRINCIPALE                                    ══
  // ══════════════════════════════════════════════════════════
  
  function update() {
    // Traînées
    trails.forEach((t, i) => {
      t.y += t.speed;
      if (t.y > H + t.len) trails[i] = createTrail();
    });
    
    // Objets spatiaux
    spaceObjects.forEach(obj => {
      obj.x += obj.vx;
      obj.y += obj.vy;
      
      // Éviter la zone de texte (rebondir doucement)
      if (isInTextZone(obj.x, obj.y, obj.size || 20)) {
        const centerX = W / 2;
        const centerY = H / 2;
        const oldVx = obj.vx;
        
        // Inverser la direction pour sortir de la zone
        if (obj.x < centerX) obj.vx = Math.abs(obj.vx) * -1;
        else obj.vx = Math.abs(obj.vx);
        if (obj.y < centerY) obj.vy = Math.abs(obj.vy) * -1;
        else obj.vy = Math.abs(obj.vy);
        
        // Retourner le vaisseau si sa direction horizontale a changé
        if (obj.type === 'ship' && Math.sign(oldVx) !== Math.sign(obj.vx)) {
          obj.facingRight = obj.vx > 0;
        }
      }
      
      // Wrap around avec marge pour les gros objets
      const margin = obj.size || 40;
      if (obj.x < -margin) {
        obj.x = W + margin/2;
        if (obj.type === 'ship') obj.facingRight = obj.vx > 0;
      }
      if (obj.x > W + margin) {
        obj.x = -margin/2;
        if (obj.type === 'ship') obj.facingRight = obj.vx > 0;
      }
      if (obj.y < -margin) obj.y = H + margin/2;
      if (obj.y > H + margin) obj.y = -margin/2;
    });
  }
  
  function draw(timestamp) {
    ctx.clearRect(0, 0, W, H);
    
    // Nébuleuses de fond (canvas offscreen pré-rendu)
    ctx.globalAlpha = 1;
    ctx.drawImage(nebulaCanvas, 0, 0);
    
    // Étoiles
    const now = timestamp * 0.001;
    stars.forEach(s => {
      const twinkle = Math.sin(now * s.speed * 80 + s.phase);
      const alpha = 0.4 + (twinkle + 1) * 0.2 * s.bright;
      pxBlock(s.x, s.y, s.size, s.color, alpha);
    });
    
    // Traînées d'étoiles filantes
    trails.forEach(t => {
      for (let i = 0; i < t.len; i++) {
        const ty = t.y - i;
        if (ty >= 0 && ty < H) {
          const trailAlpha = (1 - i / t.len) * 0.6;
          pxBlock(t.x, ty, 2, t.color, trailAlpha);
        }
      }
    });
    
    // Objets spatiaux (triés par taille pour le depth, ordre calculé une fois dans init)
    spaceObjects.forEach(obj => {
      if (obj.type === 'sun') drawSun(obj, timestamp);
      else if (obj.type === 'planet') drawPlanet(obj);
      else if (obj.type === 'asteroid') drawAsteroid(obj);
      else if (obj.type === 'ship') drawShip(obj, timestamp);
    });
    
    ctx.globalAlpha = 1;
  }
  
  let animationId = null;
  let canvasVisible = true;
  let lastFrameTime = 0;
  const MIN_FRAME_DELTA = 1000 / 60; // plafonne à ~60 FPS (écrans 120/144 Hz)

  // Respect de prefers-reduced-motion : on dessine une seule frame statique
  // et on n'anime pas (positions/flammes/scintillement figés).
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function startLoop() {
    if (animationId || !canvasVisible || document.hidden) return;
    if (motionQuery.matches) {
      // Frame unique, pas de boucle rAF
      draw(performance.now());
      return;
    }
    animationId = requestAnimationFrame(loop);
  }

  // Pause l'animation quand le canvas sort du viewport (économie CPU/GPU)
  const canvasObserver = new IntersectionObserver((entries) => {
    canvasVisible = entries[0].isIntersecting;
    if (canvasVisible) startLoop();
  }, { threshold: 0 });
  canvasObserver.observe(canvas);

  function loop(timestamp) {
    if (!canvasVisible || document.hidden || motionQuery.matches) {
      animationId = null;
      return;
    }
    if (timestamp - lastFrameTime < MIN_FRAME_DELTA) {
      animationId = requestAnimationFrame(loop);
      return;
    }
    lastFrameTime = timestamp;
    update();
    draw(timestamp);
    animationId = requestAnimationFrame(loop);
  }

  // Debounce du resize : évite de ré-initialiser étoiles/nébuleuses à chaque event
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  resize();
  startLoop();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      startLoop();
    }
  });

  // Réagit au changement de préférence système (ex. utilisateur active/désactive
  // "réduire les animations" pendant la session)
  motionQuery.addEventListener('change', () => {
    if (motionQuery.matches) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      draw(performance.now());
    } else {
      startLoop();
    }
  });
})();

// ── Modal RGPD (avec focus trap pour accessibilité) ──
function openModal(target) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  document.body.appendChild(overlay);
  target.classList.add('modal-visible');
  
  // Sauvegarder l'élément qui avait le focus
  const previousFocus = document.activeElement;
  
  // Focus trap : éléments focusables dans la modale
  const focusableEls = target.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];
  
  // Focus sur le bouton fermer
  firstFocusable?.focus();
  
  const close = () => {
    target.classList.remove('modal-visible');
    if (document.body.contains(overlay)) document.body.removeChild(overlay);
    document.removeEventListener('keydown', handleKeydown);
    // Restaurer le focus
    previousFocus?.focus();
  };
  
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    // Focus trap : Tab cycling dans la modale
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };
  
  overlay.addEventListener('click', close, { once: true });
  target.querySelector('.modal-close')?.addEventListener('click', close, { once: true });
  document.addEventListener('keydown', handleKeydown);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target && target.classList.contains('modal-content')) {
      e.preventDefault();
      openModal(target);
    }
  });
});

// ── Bouton "Copier l'email" ──
// Copie la valeur de data-copy dans le presse-papier, swap d'icône
// instantané (.copied), revert après 2s, annonce SR via aria-live.
document.querySelectorAll('.btn-copy').forEach(btn => {
  const labelDefault = btn.getAttribute('aria-label') || 'Copier';
  const status = document.getElementById('copy-status');
  let resetTimer;
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('copied');
      btn.setAttribute('aria-label', 'Adresse email copiée');
      if (status) status.textContent = 'Adresse email copiée dans le presse-papier';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-label', labelDefault);
        if (status) status.textContent = '';
      }, 2000);
    } catch (err) {
      console.error('Échec de la copie dans le presse-papier :', err);
    }
  });
});
