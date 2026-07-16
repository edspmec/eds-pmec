/**
 * IEEE EDS PMEC Student Branch Chapter - Main Script
 * Handles responsive interactions, dark mode, animations, and dynamic content.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initDarkMode();
  initMobileNav();
  initStickyHeader();
  initTypingEffect();
  initStatsCounters();
  renderCommitteeMembers();
  initScrollAnimations();
  initGalleryLightbox();
  initGalleryCarousel();
  initContactForm();
  initBackToTop();
  initScrollSpy();
  initCircuitCanvas();
  // Tilt, magnetic buttons, cursor FX, spotlights & ripples live in effects.js

  // Always return to the top (home section) on every page load/refresh
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. Dark Mode Toggle
   ========================================================================== */
function initDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (!themeToggleBtn) return;

  // Toggle function
  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {
      console.warn("localStorage is not accessible in this context:", e);
    }
    updateThemeIcon(isDark);
  };

  // Update theme icons
  const updateThemeIcon = (isDark) => {
    if (isDark) {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    } else {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    }
  };

  // Event listener
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Check saved preference — default is LIGHT unless user has explicitly chosen dark
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme');
  } catch (e) {
    console.warn("localStorage is not accessible in this context:", e);
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
   2. Mobile Navigation Hamburger Menu
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

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. Sticky Header & Scroll Progress Bar
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  
  if (!header) return;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Sticky Header
    if (scrollPos > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Scroll Progress
    if (scrollProgress) {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPos / windowHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  });
}

/* ==========================================================================
   4. Typing Animation (Hero Section)
   ========================================================================== */
function initTypingEffect() {
  const typedTextSpan = document.getElementById('typed-text');
  
  if (!typedTextSpan) return;

  const textArray = [
    "Electronics Engineering",
    "Semiconductor Technology",
    "VLSI Design & Chips",
    "Embedded Systems & IoT",
    "Technical Research",
    "Innovation & Workshops"
  ];
  
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Start the typing animation
  setTimeout(type, 1000);
}

/* ==========================================================================
   5. Scroll-triggered Statistics Counter
   ========================================================================== */
function initStatsCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const speed = 100; // lower is faster
    const increment = target / speed;
    let count = 0;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count) + suffix;
        setTimeout(updateCount, 15);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCount();
  };

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   6. Scroll Reveal Animations (Intersection Observer)
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
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

/* ==========================================================================
   7. Dynamic Executive Committee Rendering from members.js
   ========================================================================== */
function renderCommitteeMembers() {
  const committeeContainer = document.getElementById('committee-members');
  
  if (!committeeContainer) return;

  if (typeof membersData === 'undefined' || !Array.isArray(membersData)) {
    committeeContainer.innerHTML = '<p class="error-msg">Committee member data failed to load.</p>';
    return;
  }

  committeeContainer.innerHTML = ''; // Clear container

  membersData.forEach((member, index) => {
    const card = document.createElement('div');
    card.className = `member-card reveal delay-${(index % 4) + 1}`;
    
    card.innerHTML = `
      <div class="member-image-wrapper">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" 
             data-src="${member.image}" 
             alt="${member.name}" 
             class="member-img lazy-img" 
             loading="lazy">
        <div class="member-linkedin-overlay">
          ${member.linkedin ? `
            <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="member-linkedin-link" aria-label="LinkedIn Profile">
              <i class="fab fa-linkedin-in"></i>
            </a>
          ` : ''}
          ${member.personal ? `
            <a href="${member.personal}" target="_blank" rel="noopener noreferrer" class="member-linkedin-link" aria-label="Personal Webpage">
              <i class="fas fa-globe"></i>
            </a>
          ` : ''}
          ${member.email ? `
            <a href="mailto:${member.email}" class="member-linkedin-link" aria-label="Send Email">
              <i class="fas fa-envelope"></i>
            </a>
          ` : ''}
        </div>
      </div>
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
      </div>
    `;
    
    committeeContainer.appendChild(card);
  });

  // Re-run lazy loading binding for newly added member images
  bindLazyLoading();
}

/* ==========================================================================
   8. Image Lazy Loading with Blur Effect
   ========================================================================== */
function bindLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-img');
  
  if (lazyImages.length === 0) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.getAttribute('data-src');
        image.addEventListener('load', () => {
          image.classList.add('loaded');
        });
        imageObserver.unobserve(image);
      }
    });
  }, {
    rootMargin: '100px'
  });

  lazyImages.forEach(image => imageObserver.observe(image));
}

/* ==========================================================================
   9. Gallery Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item:not(.gallery-link-item)');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (galleryItems.length === 0 || !lightbox) return;

  // Flat list of EVERY image across all gallery cards, so prev/next also
  // steps through each slide of multi-image (carousel) cards.
  const slides = [];
  let currentIndex = 0;

  galleryItems.forEach((item) => {
    const imgs = Array.from(item.querySelectorAll('.gallery-thumb'));
    const title = item.querySelector('.gallery-title').textContent;
    const cat = item.querySelector('.gallery-cat').textContent;
    const descEl = item.querySelector('.gallery-desc');
    const desc = descEl ? descEl.textContent.trim() : '';
    const startIndex = slides.length;

    imgs.forEach((img, slideIdx) => {
      slides.push({ img, title, cat, desc, slideIdx, groupSize: imgs.length });
    });

    item.addEventListener('click', () => {
      // Open on the slide currently visible in the card's carousel
      const activeImg = item.querySelector('.gallery-thumb.active');
      const offset = activeImg ? Math.max(0, imgs.indexOf(activeImg)) : 0;
      currentIndex = startIndex + offset;
      openLightbox();
    });
  });

  const srcOf = (img) => img.getAttribute('data-src') || img.src;

  const openLightbox = () => {
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
    updateLightboxContent(0);
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  // direction: 1 = came from the right (next), -1 = from the left (prev), 0 = none
  const updateLightboxContent = (direction) => {
    const slide = slides[currentIndex];
    lightboxImg.src = srcOf(slide.img);

    const counter = slide.groupSize > 1
      ? `<span style="display: inline-block; margin-left: 10px; padding: 2px 10px; border-radius: 50px; background: rgba(255,255,255,0.12); color: #fff; font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; vertical-align: middle;">${slide.slideIdx + 1} / ${slide.groupSize}</span>`
      : '';

    lightboxCaption.innerHTML = `
      <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 0 10px;">
        <h4 style="margin: 0 0 4px 0; font-size: 1.15rem; color: #ffffff; font-weight: 600;">${slide.title}${counter}</h4>
        <span style="color: var(--secondary); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 6px;">${slide.cat}</span>
        ${slide.desc ? `<p style="margin: 8px 0 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.85); line-height: 1.45; font-weight: 400; text-align: center;">${slide.desc}</p>` : ''}
      </div>
    `;

    // Quick slide-in animation matching the travel direction
    if (direction) {
      lightboxImg.style.transition = 'none';
      lightboxImg.style.opacity = '0';
      lightboxImg.style.transform = `translateX(${direction * 42}px)`;
      void lightboxImg.offsetWidth; // reflow so the transition below applies
      lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'translateX(0)';
    }
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % slides.length;
    updateLightboxContent(1);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateLightboxContent(-1);
  };

  // Bind Events
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // --- Swipe navigation (touch) — swipe left = next, swipe right = prev ---
  const SWIPE_MIN = 45; // px of horizontal travel to count as a swipe
  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? showNext() : showPrev();
    }
  }, { passive: true });

  // --- Drag-to-swipe with the mouse (desktop) ---
  let mouseDownX = null;

  lightboxImg.addEventListener('mousedown', (e) => {
    mouseDownX = e.clientX;
    e.preventDefault(); // stop native image drag
  });

  document.addEventListener('mouseup', (e) => {
    if (mouseDownX === null || !lightbox.classList.contains('active')) {
      mouseDownX = null;
      return;
    }
    const dx = e.clientX - mouseDownX;
    mouseDownX = null;
    if (Math.abs(dx) > SWIPE_MIN) {
      dx < 0 ? showNext() : showPrev();
    }
  });

  lightboxImg.addEventListener('dragstart', (e) => e.preventDefault());
}

/* ==========================================================================
   10. Contact Form Handler (Mock Submission)
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Mock send notification
    showToast(`Thank you, ${name}! Your message has been received.`, 'success');
    contactForm.reset();
  });
}

// Custom Toast notification helper
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const isDark = document.body.classList.contains('dark-mode');
  
  toast.style.cssText = `
    padding: 16px 24px;
    border-radius: 8px;
    color: ${isDark ? '#F8FAFC' : '#1F2937'};
    background-color: ${isDark ? '#1E293B' : '#FFFFFF'};
    border-left: 5px solid ${type === 'success' ? 'var(--secondary)' : '#EF4444'};
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  `;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Remove toast after delay
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

/* ==========================================================================
   11. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. Scrollspy - Highlight Active Link on Scroll
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
   13. Gallery Carousel Slideshow
   ========================================================================== */
function initGalleryCarousel() {
  const carouselItems = document.querySelectorAll('.gallery-carousel-item');
  carouselItems.forEach(item => {
    const slides = item.querySelectorAll('.gallery-slides .gallery-thumb');
    const indicators = item.querySelectorAll('.carousel-indicators .indicator');
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    
    setInterval(() => {
      // Deactivate current slide
      slides[currentSlide].classList.remove('active');
      if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
      
      // Go to next slide
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Lazy load next image if needed
      const nextImg = slides[currentSlide];
      const dataSrc = nextImg.getAttribute('data-src');
      if (dataSrc && (!nextImg.src || nextImg.src.includes('data:image'))) {
        nextImg.src = dataSrc;
        nextImg.classList.remove('lazy-img');
      }
      
      // Activate next slide
      nextImg.classList.add('active');
      if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    }, 3000);
  });
}

/* ==========================================================================
   14. Interactive Circuit-Board Canvas (Hero Background)
   Nodes wired like a PCB, with data pulses travelling the traces and a
   mouse-reactive "chip" field — echoing the Edge-AI Hackathon brochure.
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

  // Pull live theme colours from CSS variables so it matches light/dark mode
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
    // Density scales with area but stays capped for performance
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
    // find a near neighbour to travel to
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

    // Update + draw connecting traces
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse repulsion — the field "parts" around the cursor
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
          // right-angle "PCB traces" instead of straight diagonals
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Nodes (solder pads)
    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = colors.node;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glow around the cursor — the "chip"
    if (mouse.active) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
      g.addColorStop(0, hexToRgba(colors.glow, 0.16));
      g.addColorStop(1, hexToRgba(colors.glow, 0));
      ctx.fillStyle = g;
      ctx.fillRect(mouse.x - 110, mouse.y - 110, 220, 220);
    }

    // Data pulses travelling the traces
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.speed;
      if (p.t >= 1) { pulses.splice(i, 1); continue; }
      // L-shaped path (matches the traces)
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
  const heroSection = document.getElementById('home');

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
    // Static single frame — no animation loop or pulses
    draw();
    cancelAnimationFrame(animId);
  } else {
    draw();
    setInterval(spawnPulse, 700);
  }

  // Keep colours in sync when the user toggles dark mode
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      setTimeout(() => { colors = themeColors(); }, 50);
    });
  }
}

/* Tilt cards & magnetic buttons moved to effects.js (shared across pages) */
