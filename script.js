// Smooth scrolling for navigation links with debounce
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Update menu button icon if it exists
                const menuButton = document.querySelector('.mobile-menu-button');
                if (menuButton) {
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Debounced navbar background change on scroll
// This decreases the number of calculations during rapid scrolling
let isScrolling;
window.addEventListener('scroll', () => {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 34, 67, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 34, 67, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 50);
});

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial navbar color
    const navbar = document.querySelector('.navbar');
    navbar.style.backgroundColor = '#0D2243';
    navbar.style.background = 'rgba(13, 34, 67, 0.95)';
    
    // Initialize mobile menu
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }
    
    // Initialize scroll animations with IntersectionObserver
    initializeScrollAnimations();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to your server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Optimize animations with IntersectionObserver
// This is MUCH more efficient than checking all elements on every scroll
function initializeScrollAnimations() {
    // Create an observer for scroll-animated elements
    const animatedElementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: Stop observing once animation is triggered
                // animatedElementsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    
    // Observe all elements with scroll-animated class
    document.querySelectorAll('.scroll-animated').forEach(element => {
        animatedElementsObserver.observe(element);
    });
    
    // Create an observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add('active');
                
                // Handle specific section animations more efficiently with requestAnimationFrame
                if (section.id === 'problem' || section.id === 'solution') {
                    const cards = section.querySelectorAll('.feature-card');
                    if (cards.length) {
                        // Use requestAnimationFrame for smoother animations
                        requestAnimationFrame(() => {
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add('active');
                                }, index * 150);
                            });
                        });
                    }
                } else if (section.id === 'how-it-works') {
                    const steps = section.querySelectorAll('.step');
                    if (steps.length) {
                        requestAnimationFrame(() => {
                            steps.forEach((step, index) => {
                                setTimeout(() => {
                                    step.classList.add('active');
                                }, index * 200);
                            });
                        });
                    }
                }
                
                // Optional: Stop observing once animation is triggered
                // sectionObserver.unobserve(section);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all section transitions
    document.querySelectorAll('.section-transition').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Optimized mobile menu creation
function createMobileMenu() {
    // Only create if it doesn't already exist
    if (document.querySelector('.mobile-menu-button')) return;
    
    const navbar = document.querySelector('.navbar');
    const nav = document.querySelector('.nav-links');
    
    // Make sure nav has dark background on mobile
    nav.style.backgroundColor = '#0D2243';
    
    // Create menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.backgroundColor = 'transparent';
    menuButton.style.border = 'none';
    menuButton.style.color = '#3AB98B';
    menuButton.style.fontSize = '1.5rem';
    menuButton.style.cursor = 'pointer';
    
    navbar.appendChild(menuButton);
    
    // Toggle menu on button click
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Efficiently handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    // Clear the timeout on every resize event
    clearTimeout(resizeTimeout);
    
    // Set a timeout to run after resize ends
    resizeTimeout = setTimeout(() => {
        // Create mobile menu if needed
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    }, 250);
});