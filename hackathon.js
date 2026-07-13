/**
 * Edge AI Hackathon 2026 Page Script
 * Manages theme toggling, accordion menus, timelines, and scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initDarkMode();
  initMobileNav();
  initHeaderScroll();
  initFAQAccordion();
  initScrollAnimations();
  initScrollSpy();
  initCircuitCanvas();

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Always return to the top (home section) on page load/refresh
  window.scrollTo({ top: 0, behavior: 'instant' });
});

/* ==========================================================================
   1. Dark Mode Theme Synchronization
   ========================================================================== */
function initDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      console.warn("localStorage not accessible:", e);
    }
    updateThemeIcon(isDark);
  };

  const updateThemeIcon = (isDark) => {
    if (isDark) {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  };

  themeToggleBtn.addEventListener('click', toggleTheme);

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {
    console.warn("localStorage not accessible:", e);
  }

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    updateThemeIcon(false);
  } else {
    // Default: dark theme — the site's signature circuit look
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ==========================================================================
   3. Header Scroll Utilities (Sticky Header, Progress Bar, Back-To-Top)
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky Header
    if (header) {
      if (scrollPos > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    // Scroll Progress Bar
    if (scrollProgress) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = windowHeight > 0 ? (scrollPos / windowHeight) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    }

    // Back to Top Button visibility
    if (backToTopBtn) {
      if (scrollPos > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   4. FAQ Accordion Functionality
   ========================================================================== */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = item.classList.contains('active');

      // Close all other active accordion panels
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. Scroll reveal animation observer
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

/* ==========================================================================
   6. Scrollspy - Highlight Active Link on Scroll
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120; // offset for sticky nav

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   Interactive Circuit-Board Canvas (Hero Background)
   Mirrors the main site — PCB traces, travelling data pulses, and a
   mouse-reactive chip glow, matching the Edge-AI Hackathon brochure.
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let nodes = [];
  let pulses = [];
  const mouse = { x: -9999, y: -9999, active: false };

  const themeColors = () => {
    const s = getComputedStyle(document.body);
    return {
      line: s.getPropertyValue('--circuit-line').trim() || 'rgba(10,95,194,0.22)',
      node: s.getPropertyValue('--circuit-node').trim() || 'rgba(18,196,232,0.55)',
      glow: (s.getPropertyValue('--glow') || '#35E4FF').trim(),
      accent: (s.getPropertyValue('--accent') || '#FFC53D').trim()
    };
  };
  let colors = themeColors();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildNodes();
  };

  const buildNodes = () => {
    const target = Math.min(90, Math.floor((width * height) / 16000));
    nodes = [];
    for (let i = 0; i < target; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1
      });
    }
  };

  const spawnPulse = () => {
    if (nodes.length < 2 || pulses.length > 14) return;
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    let best = null, bestD = Infinity;
    for (const b of nodes) {
      if (b === a) continue;
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d < bestD && d > 400) { bestD = d; best = b; }
    }
    if (best && bestD < 26000) {
      pulses.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.012 });
    }
  };

  const CONNECT_DIST = 130;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      if (mouse.active) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.8;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONNECT_DIST) {
          const alpha = 1 - dist / CONNECT_DIST;
          ctx.strokeStyle = colors.line;
          ctx.globalAlpha = alpha * 0.9;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = colors.node;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
      g.addColorStop(0, hexToRgba(colors.glow, 0.16));
      g.addColorStop(1, hexToRgba(colors.glow, 0));
      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220);
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.speed;
      if (p.t >= 1) { pulses.splice(i, 1); continue; }
      const midx = p.b.x, midy = p.a.y;
      let px, py;
      if (p.t < 0.5) {
        const k = p.t / 0.5;
        px = p.a.x + (midx - p.a.x) * k;
        py = p.a.y;
      } else {
        const k = (p.t - 0.5) / 0.5;
        px = midx;
        py = midy + (p.b.y - midy) * k;
      }
      ctx.beginPath();
      ctx.fillStyle = i % 3 === 0 ? colors.accent : colors.glow;
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animId = requestAnimationFrame(draw);
  };

  function hexToRgba(hex, a) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  let animId = null;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
  });
  window.addEventListener('mouseout', () => { mouse.active = false; });
  window.addEventListener('resize', resize);
  resize();

  if (prefersReduced) {
    draw();
    cancelAnimationFrame(animId);
  } else {
    draw();
    setInterval(spawnPulse, 700);
  }

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTimeout(() => { colors = themeColors(); }, 50);
    });
  }
}
