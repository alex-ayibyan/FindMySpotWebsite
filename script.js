// Smooth scrolling for navigation links
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
            }
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 34, 67, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(13, 34, 67, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Force the navbar color on page load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    navbar.style.backgroundColor = '#0D2243';
    navbar.style.background = 'rgba(13, 34, 67, 0.95)';
    
    // Initialize mobile menu
    createMobileMenu();
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

// Animate elements on scroll with enhanced effects
const animateOnScroll = () => {
    // Get all elements with scroll-animated class
    const elements = document.querySelectorAll('.scroll-animated');
    
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // If element is in viewport
        if (elementTop < window.innerHeight * 0.85 && elementBottom > 0) {
            element.classList.add('active');
        }
    });
    
    // Section transitions with specific animations
    const sections = document.querySelectorAll('.section-transition');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        if (sectionTop < window.innerHeight * 0.8 && sectionBottom > 0) {
            section.classList.add('active');
            
            // Add specific animations based on section
            if (section.id === 'problem' || section.id === 'solution') {
                const cards = section.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 200); // Stagger the animations
                });
            } else if (section.id === 'how-it-works') {
                const steps = section.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                    }, index * 300); // Stagger the animations
                });
            }
        }
    });
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for scroll-animated elements
    document.querySelectorAll('.scroll-animated').forEach(element => {
        element.style.opacity = '1'; // Start visible
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial styles for section transitions
    document.querySelectorAll('.section-transition').forEach(section => {
        section.style.opacity = '1'; // Start visible
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Set initial styles for feature cards and steps
    document.querySelectorAll('.feature-card, .step').forEach(element => {
        element.style.opacity = '1'; // Start visible
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Add event listener for scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger initial check
    animateOnScroll();
});

// Add scroll event listener for animations with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            animateOnScroll();
            scrollTimeout = null;
        }, 50);
    }
});

// Update animations on window resize
window.addEventListener('resize', animateOnScroll);

// Add more dynamic behaviors to hover states
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        
        // Highlight icon on hover
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.color = '#ffffff';
            icon.style.textShadow = '0 0 20px rgba(58, 185, 139, 0.8)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
        
        // Restore icon
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.color = '#3AB98B';
            icon.style.textShadow = '0 0 15px rgba(58, 185, 139, 0.5)';
        }
    });
});

// Add mobile menu toggle
const createMobileMenu = () => {
    if (window.innerWidth > 768) return; // Only create for mobile
    
    const nav = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.backgroundColor = 'transparent';
    menuButton.style.border = 'none';
    menuButton.style.color = '#3AB98B';
    menuButton.style.fontSize = '1.5rem';
    menuButton.style.cursor = 'pointer';
    
    // Add only if it doesn't already exist
    if (!document.querySelector('.mobile-menu-button')) {
        document.querySelector('.navbar').appendChild(menuButton);
    }
    
    // Make sure nav has dark background on mobile
    nav.style.backgroundColor = '#0D2243';
    
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
};

// Monitor window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-button')) {
        createMobileMenu();
    }
}); 