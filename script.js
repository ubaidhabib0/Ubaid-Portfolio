// ============================================
// PORTFOLIO JAVASCRIPT
// Ubaid Ullah - Full Stack Developer
// ============================================

// ============================================
// 1. PRELOADER - Hide after page loads
// ============================================
window.addEventListener('load', function() {
    hidePreloader();
});

// Fallback: Hide preloader after 2 seconds
setTimeout(hidePreloader, 2000);

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }
}

// ============================================
// 2. MOBILE MENU TOGGLE
// ============================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Accessibility: Update ARIA attributes
        mobileMenu.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// 3. OPTIMIZED SCROLL HANDLER (Sticky Nav, Active Nav, Scroll Top)
// ============================================
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');
const scrollToTopButton = document.getElementById('scrollToTopBtn');
const SECTION_OFFSET = 200; // Constant for active link detection

window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;

    // Sticky Navbar logic
    if (navbar) {
        navbar.classList.toggle('sticky', scrollY > 50);
    }

    // Scroll-to-top visibility logic
    if (scrollToTopButton) {
        scrollToTopButton.classList.toggle('show', scrollY > 300);
    }
    
    // Active Navigation Highlight logic
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - SECTION_OFFSET) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').slice(1);
        if (href === current) link.classList.add('active');
    });
});

// ============================================
// 5. SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards and project cards
const animatedElements = document.querySelectorAll('.skills-card, .project-card, .section-header, .contact-container, .hero-content, .gallery-item');
animatedElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// 6. CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('gmail').value;
        const description = document.getElementById('description').value;

        // Validate form
        if (!name || !email || !description) {
            alert('Please fill in all fields!');
            return;
        }

        // Gmail validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Success message
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// 12. DARK MODE TOGGLE FUNCTIONALITY
// ============================================
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.querySelector('.mode-icon').textContent = isDark ? '☀️' : '🌙';
    });

    // Check for saved user preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.mode-icon').textContent = '☀️';
    }
}

// ============================================
// 7. TYPING EFFECT (Optional Enhancement)
// ============================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ['Software Engineer in Progress', 'Full Stack Developer', 'Open Source Learner', 'Blockchain Explorer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }

    // Start typing effect
    typeEffect();
}

// ============================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 9. SCROLL TO TOP BUTTON (Optional)
// ============================================
if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 10. PAGE PERFORMANCE & OPTIMIZATION
// ============================================
// Lazy load images (if needed)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 11. CONSOLE MESSAGE
// ============================================
console.log('%c Welcome to Ubaid Ullah\'s Portfolio! ', 'background: #00d4ff; color: #0f172a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Full Stack Developer | AUST Student | Always Learning ', 'background: #7000ff; color: #f1f5f9; font-size: 14px; padding: 8px;');
