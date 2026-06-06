/* =========================
   PREMIUM PORTFOLIO SCRIPT
========================= */

// DOM ELEMENTS
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const menuBtn = document.getElementById("menuBtn");
const navLinksContainer = document.querySelector(".nav-links");
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

/* =========================
   DARK MODE WITH PERSISTENCE
========================= */

const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon();
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    updateThemeIcon();
    
    // Premium animation effect
    toggleBtn.style.animation = "none";
    setTimeout(() => {
        toggleBtn.style.animation = "rotate 0.6s ease-out";
    }, 10);
});

function updateThemeIcon() {
    const icon = toggleBtn.querySelector("i");
    if (body.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

/* =========================
   MOBILE MENU FUNCTIONALITY
========================= */

menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle("active");
    navLinksContainer.classList.toggle("show");
    body.style.overflow = navLinksContainer.classList.contains("show") ? "hidden" : "auto";
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar") && navLinksContainer.classList.contains("show")) {
        menuBtn.classList.remove("active");
        navLinksContainer.classList.remove("show");
        body.style.overflow = "auto";
    }
});

// Close menu on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinksContainer.classList.contains("show")) {
        menuBtn.classList.remove("active");
        navLinksContainer.classList.remove("show");
        body.style.overflow = "auto";
    }
});

/* =========================
   SMOOTH SCROLL & ACTIVE NAV
========================= */

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
        if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
            sec.classList.add("visible");
        }
    });

    // Dynamic navbar shadow
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.2)";
    } else {
        navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
    }
});

/* =========================
   SMOOTH SCROLL NAVIGATION
========================= */

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Close mobile menu
        if (navLinksContainer.classList.contains("show")) {
            menuBtn.classList.remove("active");
            navLinksContainer.classList.remove("show");
            body.style.overflow = "auto";
        }

        // Smooth scroll to section
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* =========================
   PAGE LOAD ANIMATIONS
========================= */

window.addEventListener("load", () => {
    sections.forEach((sec, i) => {
        setTimeout(() => {
            sec.classList.add("visible");
        }, i * 100);
    });
});

/* =========================
   FORM SUBMISSION & VALIDATION
========================= */

const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const messageInput = form.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showNotification("Please fill in all fields", "error");
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification("Please enter a valid email address", "error");
            return;
        }
        
        // Success notification
        showNotification("✨ Message sent successfully! I'll get back to you soon.", "success");
        
        // Reset form
        form.reset();
        nameInput.focus();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 28px;
        border-radius: 12px;
        color: white;
        font-weight: 700;
        z-index: 10001;
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(20px);
        max-width: 400px;
        font-size: 0.95rem;
        line-height: 1.5;
    `;
    
    if (type === "success") {
        notification.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        notification.style.boxShadow = "0 15px 40px rgba(16, 185, 129, 0.4)";
    } else if (type === "error") {
        notification.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
        notification.style.boxShadow = "0 15px 40px rgba(239, 68, 68, 0.4)";
    } else {
        notification.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
        notification.style.boxShadow = "0 15px 40px rgba(59, 130, 246, 0.4)";
    }
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = "slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => notification.remove(), 400);
    }, 4500);
}

/* =========================
   INTERSECTION OBSERVER FOR ANIMATIONS
========================= */

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe elements for staggered animations
document.querySelectorAll(".skill-card, .gallery-item, .about-card, .contact-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
});

/* =========================
   SCROLL PROGRESS BAR
========================= */

function initProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
        z-index: 10000;
        transition: width 0.2s ease;
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
    `;
    progressBar.id = "progress-bar";
    document.body.appendChild(progressBar);
}

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = scrollPercent + "%";
    }
});

initProgressBar();

/* =========================
   ADD GLOBAL ANIMATIONS
========================= */

if (!document.getElementById("premium-animations")) {
    const style = document.createElement("style");
    style.id = "premium-animations";
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }

        @keyframes rotate {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }

        .visible {
            opacity: 1;
            transform: translateY(0) !important;
        }

        /* Premium transitions */
        a, button, input, textarea {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #10b981 0%, #3b82f6 100%);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #059669 0%, #2563eb 100%);
        }
    `;
    document.head.appendChild(style);
}

/* =========================
   PREFERS REDUCED MOTION
========================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = "auto";
}

/* =========================
   PERFORMANCE OPTIMIZATION
========================= */

// Lazy load images
if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add("loaded");
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* =========================
   CONSOLE WELCOME MESSAGE
========================= */

console.log(
    "%c ✦ Welcome to Ubaid's Premium Portfolio ✦ ",
    "font-size: 18px; font-weight: bold; color: #10b981; text-shadow: 0 0 10px rgba(16, 185, 129, 0.6); background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 8px;"
);
console.log(
    "%cCrafted with ❤️ using Premium Glassmorphism Design",
    "font-size: 13px; color: #3b82f6; font-weight: 600;"
);
console.log(
    "%cFull Stack Developer | MERN Stack | Blockchain Explorer | UI Architect",
    "font-size: 11px; color: #a0aec0; font-style: italic; margin-top: 8px;"
);
