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
  initFinalistCounters();
  initFinalistSearch();
  initAnnouncementCarousel();

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Handle hash scrolling if present, otherwise start at top on refresh
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
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

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    // Default: light theme
    document.body.classList.remove('dark-mode');
    updateThemeIcon(false);
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
      if (windowHeight > 0) {
        const progressPercentage = (scrollPos / windowHeight) * 100;
        scrollProgress.style.width = `${progressPercentage}%`;
      }
    }

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current FAQ
      if (!isOpen) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = null;
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
    threshold: 0.01,
    rootMargin: '100px 0px 50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => {
    // Immediately activate if already in viewport or near top
    const rect = reveal.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      reveal.classList.add('active');
    }
    observer.observe(reveal);
  });
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

/* ==========================================================================
   Finalists Animated Counter (IntersectionObserver - Dynamically Derived)
   ========================================================================== */
function initFinalistCounters() {
  const counterElements = document.querySelectorAll('.counter');
  if (counterElements.length === 0) return;

  // Determine dynamic count from actual finalist table rows
  const finalistRows = document.querySelectorAll('.finalist-table tbody tr:not(#finalist-no-results)');
  const dynamicTotal = finalistRows.length;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = dynamicTotal > 0 ? dynamicTotal : parseInt(el.getAttribute('data-target') || '0', 10);
        const duration = 1400;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing function: easeOutExpo
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeOut * target);
          el.innerText = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.innerText = target;
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  counterElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Finalists Search Functionality (Dynamic Real-Time Filtering)
   ========================================================================== */
function initFinalistSearch() {
  const searchInput = document.getElementById('finalist-search');
  const tableRows = document.querySelectorAll('.finalist-table tbody tr:not(#finalist-no-results)');
  const countBadge = document.getElementById('finalist-count-badge');
  const noResultsRow = document.getElementById('finalist-no-results');
  const clearBtn = document.getElementById('finalist-search-clear');

  if (!searchInput || tableRows.length === 0) return;

  const totalTeams = tableRows.length;

  // Initialize count badge dynamically
  if (countBadge) {
    countBadge.innerHTML = `Showing all <strong>${totalTeams}</strong> Finalist Teams`;
  }

  const filterTable = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    tableRows.forEach(row => {
      const teamName = (row.getAttribute('data-team') || '').toLowerCase();
      const leader = (row.getAttribute('data-leader') || '').toLowerCase();
      const inst = (row.getAttribute('data-inst') || '').toLowerCase();

      const matchesSearch = !query || teamName.includes(query) || leader.includes(query) || inst.includes(query);

      if (matchesSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (noResultsRow) {
      noResultsRow.style.display = visibleCount === 0 ? '' : 'none';
    }

    if (countBadge) {
      if (visibleCount === totalTeams) {
        countBadge.innerHTML = `Showing all <strong>${totalTeams}</strong> Finalist Teams`;
      } else {
        countBadge.innerHTML = `Showing <strong>${visibleCount}</strong> of ${totalTeams} Finalist Teams`;
      }
    }

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }
  };

  searchInput.addEventListener('input', filterTable);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterTable();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   Announcement Carousel (Dynamic Auto-Scrolling Multi-Announcement Ticker)
   ========================================================================== */
function initAnnouncementCarousel() {
  const carouselEl = document.getElementById('announcement-carousel');
  if (!carouselEl) return;

  const track = document.getElementById('announcement-slides-track');
  const slides = carouselEl.querySelectorAll('.announcement-slide');
  const dots = carouselEl.querySelectorAll('.dot-indicator');
  const prevBtn = document.getElementById('announcement-prev');
  const nextBtn = document.getElementById('announcement-next');
  const progressBar = document.getElementById('announcement-progress-bar');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let slideTimer = null;
  const slideIntervalTime = 4200; // 4.2 seconds per slide
  let isHovered = false;

  const resetProgressBar = () => {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth;
    if (!isHovered) {
      progressBar.style.transition = `width ${slideIntervalTime}ms linear`;
      progressBar.style.width = '100%';
    }
  };

  const showSlide = (index) => {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    currentIndex = index;

    // Smooth horizontal slide transform
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    resetProgressBar();
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    isHovered = false;
    resetProgressBar();
    slideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideIntervalTime);
  };

  const stopAutoPlay = () => {
    isHovered = true;
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
    if (progressBar) {
      const computedWidth = window.getComputedStyle(progressBar).width;
      progressBar.style.transition = 'none';
      progressBar.style.width = computedWidth;
    }
  };

  // Nav buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  // Dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex)) {
        showSlide(slideIndex);
        startAutoPlay();
      }
    });
  });

  // Pause on hover
  carouselEl.addEventListener('mouseenter', stopAutoPlay);
  carouselEl.addEventListener('mouseleave', startAutoPlay);

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carouselEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  }, { passive: true });

  carouselEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 35) {
      if (swipeDistance > 0) {
        // Swiped Left -> Next slide
        showSlide(currentIndex + 1);
      } else {
        // Swiped Right -> Prev slide
        showSlide(currentIndex - 1);
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Start initial auto-play and slide display
  showSlide(0);
  startAutoPlay();
}



