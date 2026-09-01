/**
 * IEEE EDS PMEC Student Branch Chapter
 * Edge AI Hackathon 2026 - Sponsorship Portal JS
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Theme Toggle
  initThemeToggle();

  // 3. Initialize Mobile Hamburger Menu
  initMobileMenu();

  // 4. Initialize Scroll Progress Indicator
  initScrollProgress();

  // 5. Initialize Back to Top Button
  initBackToTop();

  // 6. Initialize Scroll Reveal Animations
  initScrollReveal();

  // 7. Initialize Header Sticky Scroll Shadow
  initHeaderScroll();
});

// 2. Theme Toggle Logic
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const updateIcon = (isDark) => {
    themeToggleBtn.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const isDark = document.body.classList.contains("dark-mode");
  updateIcon(isDark);

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const currentlyDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", currentlyDark ? "dark" : "light");
    updateIcon(currentlyDark);
  });
}

// 3. Mobile Navigation Logic
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    const expanded = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", expanded);
  });

  const navLinks = navMenu.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// 4. Scroll Progress
function initScrollProgress() {
  const scrollProgress = document.getElementById("scroll-progress");
  if (!scrollProgress) return;

  window.addEventListener("scroll", () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });
}

// 5. Back to Top Button
function initBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 6. Scroll Reveal Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach((reveal) => observer.observe(reveal));
}

// 7. Sticky Header Shadow
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
