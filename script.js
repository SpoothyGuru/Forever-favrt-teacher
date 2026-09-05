document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar
    const progressBar = document.getElementById('progress-bar');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Navbar blur on scroll
        if (winScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const animationOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, animationOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-element, .reveal-card');
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('is-visible');
        }
        observer.observe(el);
    });

    // Parallax Effects
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxHorizontal = document.querySelectorAll('.parallax-element-horizontal');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        parallaxHorizontal.forEach(el => {
            // For the scooty
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = (window.innerHeight - rect.top) * 0.2;
                el.style.transform = `translateX(${distance}px)`;
            }
        });
    });

    // Music Toggle
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.style.opacity = '0.7';
            } else {
                // If src is empty, it will throw an error, so we catch it gracefully
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        musicToggle.style.opacity = '1';
                    }).catch(error => {
                        console.log("No audio source provided or playback prevented.");
                        alert("Please add a music file to the <audio> tag in index.html to enable music.");
                    });
                }
            }
            isPlaying = !isPlaying;
        });
    }

    // Simple Particles System without external libraries
    function createParticles() {
        const container = document.getElementById('particles-js');
        if (!container) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Randomize properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Styling
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.top = `${posY}vh`;
            particle.style.backgroundColor = 'var(--warm-gold)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Animation via CSS
            particle.animate([
                { transform: `translate(0, 0)`, opacity: particle.style.opacity },
                { transform: `translate(${Math.random()*100 - 50}px, -100vh)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                easing: 'linear'
            });
            
            container.appendChild(particle);
        }
    }
    
    // Check if prefers reduced motion is set
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        createParticles();
    }
});
