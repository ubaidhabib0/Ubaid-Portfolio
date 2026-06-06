/* =========================
   ENHANCED PORTFOLIO SCRIPT
========================= */

// DOM ELEMENTS
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const menuBtn = document.getElementById("menuBtn");
const navLinksContainer = document.querySelector(".nav-links");
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

/* =========================
   SMOOTH SCROLL & ACTIVE NAV
========================= */

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
        if (scrollPos > sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            // Update active nav link
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }

            // Add visible class for animations
            sec.classList.add("visible");
        }
    });

    // Add shadow to navbar on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
    }
});

/* =========================
   SMOOTH SCROLL CLICK HANDLER
========================= */

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Close mobile menu
        if (navLinksContainer.classList.contains("show")) {
            menuBtn.classList.remove("active");
            navLinksContainer.classList.remove("show");
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
   INITIAL PAGE LOAD ANIMATION
========================= */

window.addEventListener("load", () => {
    sections.forEach((sec, i) => {
        setTimeout(() => {
            sec.classList.add("visible");
        }, i * 100);
    });
});

/* =========================
   DARK MODE TOGGLE
========================= */

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
    body.classList.add("dark");
    updateThemeIcon();
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    // Save preference to localStorage
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    // Update icon
    updateThemeIcon();
    
    // Add animation
    toggleBtn.style.transform = "scale(1.2)";
    setTimeout(() => {
        toggleBtn.style.transform = "scale(1)";
    }, 300);
});

function updateThemeIcon() {
    const icon = toggleBtn.querySelector(".icon");
    if (body.classList.contains("dark")) {
        icon.textContent = "☀️";
    } else {
        icon.textContent = "🌙";
    }
}

/* =========================
   MOBILE MENU TOGGLE
========================= */

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinksContainer.classList.toggle("show");
    
    // Prevent body scroll when menu is open
    if (navLinksContainer.classList.contains("show")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
        menuBtn.classList.remove("active");
        navLinksContainer.classList.remove("show");
        body.style.overflow = "auto";
    }
});

/* =========================
   FORM SUBMISSION HANDLER
========================= */

const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification("Please fill in all fields", "error");
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showNotification("Please enter a valid email", "error");
            return;
        }
        
        // Show success message
        showNotification("Message sent successfully! I'll get back to you soon.", "success");
        
        // Reset form
        form.reset();
        
        // Optionally send email via EmailJS or other service
        // sendEmail(name, email, message);
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
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    if (type === "success") {
        notification.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        notification.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)";
    } else if (type === "error") {
        notification.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
        notification.style.boxShadow = "0 10px 30px rgba(239, 68, 68, 0.4)";
    } else {
        notification.style.background = "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)";
        notification.style.boxShadow = "0 10px 30px rgba(59, 130, 246, 0.4)";
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* =========================
   PAGE SCROLL PROGRESS BAR
========================= */

function createProgressBar() {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
        z-index: 10000;
        transition: width 0.2s ease;
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

// Initialize progress bar
createProgressBar();

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

// Observe skill cards and gallery items
document.querySelectorAll(".skill-card, .gallery-item, .about-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});

/* =========================
   ADD CSS ANIMATIONS IF NOT PRESENT
========================= */

if (!document.getElementById("animations-style")) {
    const style = document.createElement("style");
    style.id = "animations-style";
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
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
                transform: translateY(30px);
            }
        }

        .visible {
            opacity: 1;
            transform: translateY(0) !important;
        }

        /* Smooth transitions for all interactive elements */
        a, button, input, textarea {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

/* =========================
   PERFORMANCE OPTIMIZATION
========================= */

// Lazy load images
if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", (e) => {
    // Close mobile menu on Escape
    if (e.key === "Escape" && navLinksContainer.classList.contains("show")) {
        menuBtn.classList.remove("active");
        navLinksContainer.classList.remove("show");
        body.style.overflow = "auto";
    }
});

/* =========================
   ACCESSIBILITY ENHANCEMENTS
========================= */

// Add focus visible styles
document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
});

/* =========================
   CONSOLE GREETING
========================= */

console.log("%c✦ Welcome to Ubaid's Portfolio ✦", 
    "font-size: 20px; font-weight: bold; color: #10b981; text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);");
console.log("%cBuilt with ❤️ by Ubaid Ullah", 
    "font-size: 14px; color: #64748b;");
console.log("%cFull Stack Developer | MERN Stack | Blockchain Explorer", 
    "font-size: 12px; color: #94a3b8; font-style: italic;");
