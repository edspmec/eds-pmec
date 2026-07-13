/**
 * IEEE EDS PMEC — Shared FX Layer
 * Interactive effects loaded on every page: cursor follower, card spotlight,
 * 3D tilt, magnetic buttons, button ripple, and hero mouse parallax.
 * All effects respect prefers-reduced-motion and skip touch-only devices.
 */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    fxRipple();
    if (reduced || !finePointer) return;
    fxCursorGlow();
    fxCardSpotlight();
    fxTiltCards();
    fxMagneticButtons();
    fxHeroParallax();
  });

  /* ------------------------------------------------------------------
     Cursor glow — a soft ambient light that follows the pointer.
     No ring, no dot: the native cursor stays exactly as it is.
  ------------------------------------------------------------------ */
  function fxCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'fx-cursor-glow';
    glow.style.opacity = '0';
    document.body.appendChild(glow);

    let mx = -500, my = -500;   // target (mouse)
    let gx = -500, gy = -500;   // glow lerped position

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    (function follow() {
      gx += (mx - gx) * 0.2;
      gy += (my - gy) * 0.2;
      glow.style.transform = `translate(${gx.toFixed(1)}px, ${gy.toFixed(1)}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();
  }

  /* ------------------------------------------------------------------
     Card spotlight — a soft radial glow inside cards that tracks the
     cursor (CSS reads --mx / --my on the .fx-spotlight element).
  ------------------------------------------------------------------ */
  function fxCardSpotlight() {
    const selector = [
      '.activity-card', '.associate-card', '.member-card', '.statement-panel',
      '.benefit-item', '.contact-form-card', '.contact-method', '.event-banner-card',
      '.overview-card', '.info-card', '.faq-item', '.timeline-content', '.track-card'
    ].join(', ');

    document.querySelectorAll(selector).forEach(card => {
      card.classList.add('fx-spotlight');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ------------------------------------------------------------------
     3D tilt on cards
  ------------------------------------------------------------------ */
  function fxTiltCards() {
    const selector = '.activity-card, .associate-card, .member-card, .statement-panel, .benefit-item';
    const MAX = 8;

    document.querySelectorAll(selector).forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * MAX * 2;
        const ry = (px - 0.5) * MAX * 2;
        card.style.transform =
          `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------
     Magnetic buttons — subtle pull toward the cursor
  ------------------------------------------------------------------ */
  function fxMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-accent, .btn-lg').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px) translateY(-3px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------
     Button ripple on click (works on touch too)
  ------------------------------------------------------------------ */
  function fxRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'fx-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  }

  /* ------------------------------------------------------------------
     Hero parallax — content and logo drift gently opposite the mouse
  ------------------------------------------------------------------ */
  function fxHeroParallax() {
    const hero = document.querySelector('.hero, .hackathon-hero');
    if (!hero) return;
    const layers = [
      { el: hero.querySelector('.hero-image-area, .hero-poster-area'), depth: 14 },
      { el: hero.querySelector('.hero-content'), depth: 6 }
    ].filter(l => l.el);
    if (layers.length === 0) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(({ el, depth }) => {
        el.style.transform = `translate(${(-nx * depth).toFixed(1)}px, ${(-ny * depth).toFixed(1)}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      layers.forEach(({ el }) => { el.style.transform = ''; });
    });
  }
})();
