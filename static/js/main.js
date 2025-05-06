document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Add glitch effect data attribute
    const glitchText = document.querySelector('.glitch-effect');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }
    
    // Navigation background change on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Change header background on scroll
        if (scrollPosition > 100) {
            header.style.backgroundColor = 'rgba(3, 3, 17, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 24, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        // Highlight active nav item
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GSAP animations
    
    // Hero section animations
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content h2', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.hero-content p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.4
    });
    
    gsap.from('.cta-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.6
    });
    
    gsap.from('.profile-image-placeholder', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5
    });
    
    // Scroll animations for sections
    const animateSection = (selector, stagger = 0.2) => {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: stagger,
            ease: 'power3.out'
        });
    };
    
    // Apply animations to each section
    animateSection('.about-content > *');
    animateSection('.stat', 0.15);
    animateSection('.timeline-item', 0.3);
    animateSection('.skill-category', 0.1);
    animateSection('.experience-card');
    animateSection('.project-card', 0.2);
    animateSection('.achievement-item', 0.2);
    animateSection('.contact-item', 0.1);
    animateSection('.contact-form > *', 0.1);
    
    // Form handling - prevent default submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            // Here you would typically handle form submission via AJAX
            // For now, just show an alert
            alert('Thank you for your message! This form is currently just a demo.');
        });
    }
    
    // Add typing effect to the hero heading
    function setupTypingEffect() {
        const text = "Aftab Mulla";
        const targetElement = document.querySelector('.hero-content h1 span');
        if (!targetElement) return;
        
        targetElement.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                targetElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a small delay
        setTimeout(typeWriter, 1000);
    }
    
    setupTypingEffect();
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(el => {
        observer.observe(el);
    });
});