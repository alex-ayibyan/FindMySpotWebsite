document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    navbar.style.backgroundColor = '#0D2243';
    navbar.style.background = 'rgba(13, 34, 67, 0.95)';
    
    createMobileMenu();
    
    animateOnScroll();
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animated');
    
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.9) {
            element.classList.add('active');
        }
    });
    
    const sections = document.querySelectorAll('.section-transition');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.9) {
            section.classList.add('active');
            
            if (section.id === 'problem' || section.id === 'solution') {
                const cards = section.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 150);
                });
            } else if (section.id === 'how-it-works') {
                const steps = section.querySelectorAll('.step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('active');
                    }, index * 200);
                });
            }
        }
    });
};

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            animateOnScroll();
            scrollTimeout = null;
        }, 50);
    }
});

window.addEventListener('resize', animateOnScroll);

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.color = '#ffffff';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
        
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.color = '#3AB98B';
        }
    });
});

const createMobileMenu = () => {
    if (window.innerWidth > 768) return;
    
    const nav = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.backgroundColor = 'transparent';
    menuButton.style.border = 'none';
    menuButton.style.color = '#3AB98B';
    menuButton.style.fontSize = '1.5rem';
    menuButton.style.cursor = 'pointer';
    
    if (!document.querySelector('.mobile-menu-button')) {
        document.querySelector('.navbar').appendChild(menuButton);
    }
    
    nav.style.backgroundColor = '#0D2243';
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuButton.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
};

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-button')) {
        createMobileMenu();
    }
});