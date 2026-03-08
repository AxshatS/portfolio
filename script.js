// Initialize Lucide Icons
lucide.createIcons();

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Keep false to allow native iOS/Android momentum scrolling
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate dot instantly
        gsap.to(cursorDot, {
            x: posX,
            y: posY,
            duration: 0.1,
            ease: "power2.out"
        });

        // Animate outline with slight delay for trailing effect
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll('a, button, .hover-reveal, .skill-card, .timeline-item');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.backgroundColor = "transparent";
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.backgroundColor = "var(--accent)";
        });
    });
}

// GSAP Animations Setup

// 1. Initial Load Animations
const tlLoad = gsap.timeline();

tlLoad.to('.hero-intro', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    delay: 0.2
})
.to('.hero-title-line', {
    y: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out"
}, "-=0.8")
.to('.hero-subtitle', {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
}, "-=0.8")
.to('.scroll-indicator', {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
}, "-=0.2");


// 2. Scroll Animations Setup

// About Text Reveal
gsap.to('.reveal-text', {
    backgroundPositionX: '0%',
    stagger: 1,
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
        // Using a background clip text trick or standard opacity stagger
        // Here we'll do a simple opacity reveal for words or just fade in
    }
});

// Since the background-clip trick requires complex DOM manipulation (splitting text into spans),
// Let's use a simpler but elegant GSAP fade-in from bottom approach for the About section block:
gsap.fromTo('.reveal-text', 
    { y: 50, opacity: 0 },
    { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
        }
    }
);

// Skills Cards Stagger
gsap.to('.skill-card', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.skills',
        start: 'top 75%',
    }
});

// Language Tags Stagger
gsap.to('.lang-tag', {
    scale: 1,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: '.languages-wrapper',
        start: 'top 85%',
    }
});


// Experience Timeline
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.to(item, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
        }
    });
});

// Education Cards
gsap.to('.edu-card', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.edu-grid',
        start: 'top 80%',
    }
});

// Certifications List
gsap.to('.cert-list li', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.cert-list',
        start: 'top 85%',
    }
});

// Mobile menu toggle (cleaner version using CSS classes)
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
