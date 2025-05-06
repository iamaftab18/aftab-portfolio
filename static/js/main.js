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
    
    // GSAP animations - MODIFIED to be less aggressive and not hide content
    
    // Hero section animations
    gsap.from('.hero-content h1', {
        duration: 0.8,
        y: 20,
        opacity: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-content h2', {
        duration: 0.8,
        y: 20,
        opacity: 0.5,
        ease: 'power3.out',
        delay: 0.1
    });
    
    gsap.from('.hero-content p', {
        duration: 0.8,
        y: 20,
        opacity: 0.5,
        ease: 'power3.out',
        delay: 0.2
    });
    
    gsap.from('.cta-buttons', {
        duration: 0.8,
        y: 20,
        opacity: 0.5,
        ease: 'power3.out',
        delay: 0.3
    });
    
    gsap.from('.profile-image-container', {
        duration: 1,
        scale: 0.9,
        opacity: 0.5,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.2
    });
    
    // Modified animation function to ensure visibility
    const animateSection = (selector, stagger = 0.1) => {
        // First ensure all elements are visible
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = "1";
            el.style.visibility = "visible";
        });
        
        // Then apply a subtle animation
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0.7,
            duration: 0.6,
            stagger: stagger,
            ease: 'power2.out',
            onComplete: function() {
                // Ensure elements are fully visible after animation
                elements.forEach(el => {
                    el.style.opacity = "1";
                    el.style.transform = "none";
                });
            }
        });
    };
    
    // Apply animations to each section with minimal delay
    animateSection('.about-content > *', 0.1);
    animateSection('.stat', 0.08);
    animateSection('.timeline-item', 0.1);
    animateSection('.skill-category', 0.05);
    animateSection('.experience-card');
    animateSection('.project-card', 0.08);
    animateSection('.achievement-item', 0.08);
    animateSection('.contact-item', 0.05);
    animateSection('.contact-form > *', 0.05);
    
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
    
    // Image upload handler for profile image
    const imageUpload = document.getElementById('image-upload');
    const profileImage = document.getElementById('profile-image');
    
    if (imageUpload && profileImage) {
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileImage.src = event.target.result;
                    localStorage.setItem('profileImage', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Check if an image was previously uploaded
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            profileImage.src = savedImage;
        }
    }
});

// Fix for Intersection Observer - make it less aggressive
// and ensure elements are always visible
document.addEventListener('DOMContentLoaded', () => {
    // First make sure all elements are visible by default
    const allElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    allElements.forEach(el => {
        el.classList.add('active');
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.visibility = "visible";
    });
});
