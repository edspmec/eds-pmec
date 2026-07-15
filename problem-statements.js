/**
 * IEEE EDS PMEC Student Branch Chapter
 * Edge AI Hackathon 2026 - Problem Statements Portal JS
 */

// 1. Problem Statements Dataset (36 Statements across 6 Domains)
const problemStatements = [
  // Indian Knowledge System (IKS)
  {
    slNo: 1,
    domain: "Indian Knowledge System",
    psNo: "IKS-01",
    title: "Eclipse Prediction using Astronomical Calculations",
    description: "Develop a system that predicts future solar and lunar eclipses using astronomical calculations. The solution should determine the eclipse type, approximate date, time, and duration, and validate the results using standard astronomical references.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-01.pdf"
  },
  {
    slNo: 2,
    domain: "Indian Knowledge System",
    psNo: "IKS-02",
    title: "Classification of Traditional Indian Design Arts",
    description: "Develop a system that identifies and classifies traditional Indian art forms from images. The solution should recognize the artwork category and display the predicted class with high accuracy.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-02.pdf"
  },
  {
    slNo: 3,
    domain: "Indian Knowledge System",
    psNo: "IKS-03",
    title: "Sanskrit to Hindi Translation",
    description: "Develop a system that translates Sanskrit sentences into meaningful Hindi text while preserving grammatical correctness and contextual meaning.",
    tracks: ["Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-03.pdf"
  },
  {
    slNo: 4,
    domain: "Indian Knowledge System",
    psNo: "IKS-04",
    title: "Vedic Multiplier-Based 8x8 Convolution Block Design",
    description: "Develop an efficient 8x8 convolution block using Vedic multiplication principles. The solution should achieve faster computation with optimized resource utilization while maintaining correct outputs.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-04.pdf"
  },
  {
    slNo: 5,
    domain: "Indian Knowledge System",
    psNo: "IKS-05",
    title: "Palm-Leaf Preservation Sensor Unit",
    description: "Develop a monitoring system that measures environmental conditions affecting palm-leaf manuscripts and generates alerts whenever preservation conditions exceed safe limits.",
    tracks: ["ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-05.pdf"
  },
  {
    slNo: 6,
    domain: "Indian Knowledge System",
    psNo: "IKS-06",
    title: "Detection of Medicinal Plants and Their Characteristics",
    description: "Develop a system that identifies 15 medicinal plants from images and displays their name along with their medicinal properties with reliable classification accuracy.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/IKS-06.pdf"
  },

  // Defence & Security (DEF)
  {
    slNo: 7,
    domain: "Defence & Security",
    psNo: "DEF-01",
    title: "Real-Time Drone Tracking",
    description: "Develop a system that detects and tracks drones in real time while continuously displaying their position and movement.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-01.pdf"
  },
  {
    slNo: 8,
    domain: "Defence & Security",
    psNo: "DEF-02",
    title: "Underground Metal Detection",
    description: "Develop a system capable of detecting buried metallic objects with minimum false detections and real-time indication.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-02.pdf"
  },
  {
    slNo: 9,
    domain: "Defence & Security",
    psNo: "DEF-03",
    title: "Hardware Trojan Scanner",
    description: "Develop a system that detects abnormal hardware behaviour or malicious modifications and reports suspicious activities.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-03.pdf"
  },
  {
    slNo: 10,
    domain: "Defence & Security",
    psNo: "DEF-04",
    title: "Detection of Gunshots",
    description: "Develop a system that identifies gunshot sounds from audio inputs and generates immediate alerts while distinguishing them from environmental sounds.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-04.pdf"
  },
  {
    slNo: 11,
    domain: "Defence & Security",
    psNo: "DEF-05",
    title: "Secure Smart Storage Controller",
    description: "Develop a secure storage system that protects sensitive information through authentication, secure storage, and automatic data protection during security threats.",
    tracks: ["FPGA", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-05.pdf"
  },
  {
    slNo: 12,
    domain: "Defence & Security",
    psNo: "DEF-06",
    title: "Human or Vehicle Detection in High-Density Fog or Dust",
    description: "Develop a system that detects humans or vehicles under foggy or dusty conditions while maintaining reliable detection performance.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/DEF-06.pdf"
  },

  // Processors (PROC)
  {
    slNo: 13,
    domain: "Processors",
    psNo: "PROC-01",
    title: "Fault-Tolerant Processor for Harsh Environments",
    description: "Design a processor capable of reliable operation in harsh environments such as space, military, industrial automation, and nuclear plants where radiation, voltage fluctuations, and temperature variations can introduce hardware faults. The processor should detect and recover from transient and permanent faults while maintaining correct execution.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-01.pdf"
  },
  {
    slNo: 14,
    domain: "Processors",
    psNo: "PROC-02",
    title: "Single-Cycle RISC-V Processor Design",
    description: "Implement a complete single-cycle RISC-V processor supporting the RV32I instruction set. Every instruction should execute in exactly one clock cycle. (Supported Instructions: Arithmetic, Logic, Load, Store, Branch, Jump)",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-02.pdf"
  },
  {
    slNo: 15,
    domain: "Processors",
    psNo: "PROC-03",
    title: "Vector Processor Design for Machine Learning Inference",
    description: "Design a vector processor capable of performing SIMD operations on multiple data elements simultaneously to accelerate machine learning inference workloads. (Supported Instructions: Vector Addition, Vector Multiplication, MAC, ReLU, Dot Product)",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-03.pdf"
  },
  {
    slNo: 16,
    domain: "Processors",
    psNo: "PROC-04",
    title: "32-bit Floating-Point ALU Design",
    description: "Develop an IEEE-754 compliant 32-bit floating-point ALU capable of supporting arithmetic operations used in AI, DSP, and scientific computing.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-04.pdf"
  },
  {
    slNo: 17,
    domain: "Processors",
    psNo: "PROC-05",
    title: "2D Systolic Array-Based Processing Element",
    description: "Design a scalable 2D systolic array architecture to accelerate matrix-vector multiplication, which is the fundamental computation in deep learning, signal processing, and scientific computing. Each Processing Element (PE) performs multiply-accumulate (MAC) operations while passing data to neighbouring PEs in a pipelined manner.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-05.pdf"
  },
  {
    slNo: 18,
    domain: "Processors",
    psNo: "PROC-06",
    title: "Energy-Aware Multi-Core Scheduler",
    description: "Develop a scheduler that dynamically distributes tasks across multiple processor cores to minimize energy consumption while maintaining performance. The scheduler should consider task priority, processor utilization, deadlines, and power states. (Scheduling Policies: Earliest Deadline First, Dynamic Voltage and Frequency Scaling (DVFS), Load Balancing).",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/PROC-06.pdf"
  },

  // Communication Systems (COM)
  {
    slNo: 19,
    domain: "Communication Systems",
    psNo: "COM-01",
    title: "Wireless Interference and Jamming Detection System",
    description: "Develop a system that detects wireless interference, intentional jamming, and abnormal spectrum activity across communication channels while generating real-time alerts.",
    tracks: ["FPGA", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-01.pdf"
  },
  {
    slNo: 20,
    domain: "Communication Systems",
    psNo: "COM-02",
    title: "Multi-Standard Software Defined Radio (SDR) System",
    description: "Develop a Software Defined Radio (SDR) system that supports multiple wireless communication standards using programmable hardware. The solution should demonstrate flexible modulation, demodulation, protocol switching, and reliable communication.",
    tracks: ["FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-02.pdf"
  },
  {
    slNo: 21,
    domain: "Communication Systems",
    psNo: "COM-03",
    title: "Smart Traffic Signal Communication System",
    description: "Develop a communication system that enables traffic signals and nearby vehicles to exchange information for intelligent traffic management, including emergency vehicle prioritization.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-03.pdf"
  },
  {
    slNo: 22,
    domain: "Communication Systems",
    psNo: "COM-04",
    title: "Secure Wireless Access Control and Intrusion Detection System",
    description: "Develop a secure communication system that authenticates authorized users before granting access to a protected area. The solution should support encrypted wireless communication, detect unauthorized access attempts, generate real-time alerts, and maintain an event log for security monitoring.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-04.pdf"
  },
  {
    slNo: 23,
    domain: "Communication Systems",
    psNo: "COM-05",
    title: "Real-Time Communication System for Train-to-Train Collision Avoidance",
    description: "Develop a communication system that enables trains to exchange speed, location, and braking information to generate timely collision warnings.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-05.pdf"
  },
  {
    slNo: 24,
    domain: "Communication Systems",
    psNo: "COM-06",
    title: "Self-Healing Mesh Communication Network for Emergency Response",
    description: "Design a mesh communication network that automatically restores communication by establishing alternative paths whenever nodes or links fail.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/COM-06.pdf"
  },

  // Image & Signal Processing (ISP)
  {
    slNo: 25,
    domain: "Image & Signal Processing",
    psNo: "ISP-01",
    title: "Real-Time Sign Language to Text Conversion",
    description: "Develop a system that recognizes sign language gestures and converts them into readable text in real time.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-01.pdf"
  },
  {
    slNo: 26,
    domain: "Image & Signal Processing",
    psNo: "ISP-02",
    title: "Real-Time Vision Dehazing",
    description: "Develop a system that enhances images captured under foggy or hazy conditions while preserving important visual details.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-02.pdf"
  },
  {
    slNo: 27,
    domain: "Image & Signal Processing",
    psNo: "ISP-03",
    title: "Smart Hearing Aid: Directional Blind Source Separation",
    description: "Develop a hearing assistance system that isolates the desired speaker while reducing background noise.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-03.pdf"
  },
  {
    slNo: 28,
    domain: "Image & Signal Processing",
    psNo: "ISP-04",
    title: "Radar-Based Hand Gesture Recognition Interface",
    description: "Develop a contactless hand gesture recognition system using radar signals for human-computer interaction.",
    tracks: ["FPGA", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-04.pdf"
  },
  {
    slNo: 29,
    domain: "Image & Signal Processing",
    psNo: "ISP-05",
    title: "Classification of Indian Ragas Based on Frequency",
    description: "Develop a system that identifies Indian classical ragas from audio signals using frequency-based analysis.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-05.pdf"
  },
  {
    slNo: 30,
    domain: "Image & Signal Processing",
    psNo: "ISP-06",
    title: "Acoustic Sub-Vocal Silent Speech Recognition",
    description: "Develop a system that converts silent or whispered speech into readable text using suitable sensing techniques.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/ISP-06.pdf"
  },

  // Biomedical Engineering (BIO)
  {
    slNo: 31,
    domain: "Biomedical Engineering",
    psNo: "BIO-01",
    title: "Tumour Detection and Segmentation",
    description: "Develop a system that accurately detects and segments tumors in medical images for clinical analysis.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-01.pdf"
  },
  {
    slNo: 32,
    domain: "Biomedical Engineering",
    psNo: "BIO-02",
    title: "Real-Time Health Monitoring and Alerting System",
    description: "Develop a health monitoring system that continuously measures vital parameters and generates alerts during abnormal conditions.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-02.pdf"
  },
  {
    slNo: 33,
    domain: "Biomedical Engineering",
    psNo: "BIO-03",
    title: "Epilepsy Detection and Alerting",
    description: "Develop a system that detects epileptic seizures using physiological signals and immediately notifies caregivers.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-03.pdf"
  },
  {
    slNo: 34,
    domain: "Biomedical Engineering",
    psNo: "BIO-04",
    title: "Crop Disease Detection",
    description: "Develop a system that identifies crop diseases from plant images and reports the disease type with high accuracy.",
    tracks: ["Raspberry Pi / Renesas", "ESP32 / Arduino"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-04.pdf"
  },
  {
    slNo: 35,
    domain: "Biomedical Engineering",
    psNo: "BIO-05",
    title: "Medical Image Enhancement",
    description: "Develop a system that improves the quality of medical images by reducing noise and enhancing clinically important features.",
    tracks: ["Raspberry Pi / Renesas", "FPGA"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-05.pdf"
  },
  {
    slNo: 36,
    domain: "Biomedical Engineering",
    psNo: "BIO-06",
    title: "Fall Detection and Emergency Alert System",
    description: "Develop a system that automatically detects human falls and generates emergency alerts with minimum false alarms.",
    tracks: ["ESP32 / Arduino", "Raspberry Pi / Renesas"],
    downloadUrl: "assets/edge_ai_hackathon/problems/BIO-06.pdf"
  }
];

// 2. DOM Elements and Event Initialization
document.addEventListener("DOMContentLoaded", () => {
  initThemeSync();
  initMobileNav();
  initHeaderScroll();
  renderProblemStatements();
  initSearchAndFilters();
  initCriteriaAccordions();
  initScrollAnimations();
  initTabSwitcher();
});

// 3. Theme Synchronization (Light/Dark Mode)
function initThemeSync() {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  
  // Set initial state from localStorage
  const savedTheme = localStorage.getItem("theme") || "light-mode";
  if (savedTheme === "dark-mode") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
      } else {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
      }
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDarkMode 
    ? `<i data-lucide="sun" style="width: 20px; height: 20px;"></i>` 
    : `<i data-lucide="moon" style="width: 20px; height: 20px;"></i>`;
  
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// 4. Header & Navigation Actions
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile nav when link is clicked
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

function initHeaderScroll() {
  const header = document.getElementById("header");
  const scrollProgress = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    // Header shadow and style switch on scroll
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll progress indicator
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + "%";
    }
  });
}

// 5. Render Problem Statements Table & Mobile Cards
function renderProblemStatements(filteredData = problemStatements) {
  const tableBody = document.getElementById("ps-table-body");
  const mobileCardsContainer = document.getElementById("ps-mobile-cards");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  if (mobileCardsContainer) {
    mobileCardsContainer.innerHTML = "";
  }

  if (filteredData.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted); font-style: italic;">
        No problem statements found matching your filter criteria.
      </td>
    `;
    tableBody.appendChild(emptyRow);

    if (mobileCardsContainer) {
      mobileCardsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); font-style: italic; background-color: var(--card-bg); border: 1px dashed var(--card-border); border-radius: var(--border-radius-md);">
          No problem statements found matching your filter criteria.
        </div>
      `;
    }
    return;
  }

  filteredData.forEach(ps => {
    // Map tracks into HTML tag pills
    const trackBadges = ps.tracks.map(track => {
      let badgeClass = "badge-esp";
      if (track.includes("FPGA")) badgeClass = "badge-fpga";
      else if (track.includes("Raspberry") || track.includes("Renesas")) badgeClass = "badge-rpi";
      
      return `<span class="track-tag-badge ${badgeClass}">${track}</span>`;
    }).join(" ");

    // 1. Render Desktop Table Row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ps.slNo}</td>
      <td class="domain-col">
        <strong>${ps.domain}</strong>
        <div class="row-tracks">${trackBadges}</div>
      </td>
      <td><span class="ps-number-tag">${ps.psNo}</span></td>
      <td class="title-col">${ps.title}</td>
      <td class="desc-col">${ps.description}</td>
    `;
    tableBody.appendChild(row);

    // 2. Render Mobile Card
    if (mobileCardsContainer) {
      const card = document.createElement("div");
      card.className = "ps-mobile-card";
      card.innerHTML = `
        <div class="ps-mobile-card-header">
          <span class="ps-mobile-card-domain">${ps.domain}</span>
          <span class="ps-mobile-card-psno">${ps.psNo}</span>
        </div>
        <h4 class="ps-mobile-card-title">${ps.slNo}. ${ps.title}</h4>
        <p class="ps-mobile-card-desc">${ps.description}</p>
        <div class="ps-mobile-card-footer">
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-right:4px;">Tracks:</span>
          ${trackBadges}
        </div>
      `;
      mobileCardsContainer.appendChild(card);
    }
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// 6. Search and Dropdown Logic
function initSearchAndFilters() {
  const searchInput = document.getElementById("search-input");
  const domainSelect = document.getElementById("domain-select");
  const trackSelect = document.getElementById("track-select");

  if (!searchInput || !domainSelect || !trackSelect) return;

  function filterData() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainSelect.value;
    const selectedTrack = trackSelect.value;

    const filtered = problemStatements.filter(ps => {
      // 1. Text Search match
      const textMatch = 
        ps.title.toLowerCase().includes(query) || 
        ps.description.toLowerCase().includes(query) || 
        ps.psNo.toLowerCase().includes(query) ||
        ps.domain.toLowerCase().includes(query);

      // 2. Domain Match
      const domainMatch = selectedDomain === "all" || ps.domain === selectedDomain;

      // 3. Track Match
      const trackMatch = selectedTrack === "all" || ps.tracks.some(t => t.toLowerCase().includes(selectedTrack.toLowerCase()));

      return textMatch && domainMatch && trackMatch;
    });

    renderProblemStatements(filtered);
  }

  // Bind Listeners
  searchInput.addEventListener("input", filterData);
  domainSelect.addEventListener("change", filterData);
  trackSelect.addEventListener("change", filterData);
}

// 7. Accoridion Judging Criteria Controls
function initCriteriaAccordions() {
  const accordionHeaders = document.querySelectorAll(".criteria-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const content = header.nextElementSibling;
      const arrow = header.querySelector(".criteria-arrow");

      // Check if it's already active
      const isActive = accordionItem.classList.contains("active");

      // Close all accordions first
      document.querySelectorAll(".criteria-item").forEach(item => {
        item.classList.remove("active");
        item.querySelector(".criteria-content").style.maxHeight = null;
        item.querySelector(".criteria-arrow").style.transform = "rotate(0deg)";
      });

      // Toggle clicked accordion
      if (!isActive) {
        accordionItem.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
      }
    });
  });
}

// 8. Intersection Observer (Scroll Reveal Animations)
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => observer.observe(reveal));
}

// 9. Tab Switcher Logic
function initTabSwitcher() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      // Set active button
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Show target panel
      tabPanels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
      
      // Auto-trigger reflow of animations/intersection elements
      const activeReveals = document.querySelectorAll(`#${targetTab} .reveal`);
      activeReveals.forEach(el => {
        el.classList.add("active"); // Force reveal on switch to make it responsive
      });
    });
  });

  // Handle Track card click to switch to Criteria tab automatically
  const trackCardLinks = document.querySelectorAll(".track-card-link");
  trackCardLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Find the Criteria tab button and click it
      const criteriaTabBtn = document.querySelector('.tab-btn[data-tab="tab-criteria"]');
      if (criteriaTabBtn) {
        criteriaTabBtn.click();
      }
      
      // Smooth scroll to the judging section
      const target = document.getElementById("judging-criteria");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      
      // Open the corresponding accordion block based on link clicked
      let criteriaHeaderIndex = 0; // Default to FPGA
      if (link.innerHTML.includes("Raspberry") || link.innerHTML.includes("Renesas")) {
        criteriaHeaderIndex = 1;
      } else if (link.innerHTML.includes("ESP32") || link.innerHTML.includes("Arduino")) {
        criteriaHeaderIndex = 2;
      }
      
      const accordionHeaders = document.querySelectorAll(".criteria-header");
      if (accordionHeaders[criteriaHeaderIndex]) {
        // Trigger click if not already active
        const item = accordionHeaders[criteriaHeaderIndex].parentElement;
        if (!item.classList.contains("active")) {
          accordionHeaders[criteriaHeaderIndex].click();
        }
      }
    });
  });
}

