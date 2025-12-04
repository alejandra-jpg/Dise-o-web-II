// Seleccionar elementos del DOM
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navbarActions = document.querySelector('.navbar-actions');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

/**
 * Toggle del menú móvil con animaciones mejoradas
 */
navbarToggle.addEventListener('click', () => {
    // Animación del botón hamburguesa
    navbarToggle.classList.toggle('active');
    
    // Animar menú y acciones
    if (navbarMenu.classList.contains('active')) {
        // Cerrar menú
        navbarMenu.style.animation = 'slideOutLeft 0.4s ease forwards';
        navbarActions.style.animation = 'slideOutLeft 0.4s ease 0.1s forwards';
        
        setTimeout(() => {
            navbarMenu.classList.remove('active');
            navbarActions.classList.remove('active');
            navbarMenu.style.animation = '';
            navbarActions.style.animation = '';
        }, 400);
        
        document.body.style.overflow = '';
    } else {
        // Abrir menú
        navbarMenu.classList.add('active');
        navbarActions.classList.add('active');
        
        navbarMenu.style.animation = 'slideInLeft 0.4s ease forwards';
        navbarActions.style.animation = 'slideInLeft 0.4s ease 0.1s forwards';
        
        document.body.style.overflow = 'hidden';
    }
});

/**
 * Cerrar el menú al hacer clic en un enlace (en móviles)
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cerrar el menú móvil con animación
        navbarToggle.classList.remove('active');
        
        navbarMenu.style.animation = 'slideOutLeft 0.3s ease forwards';
        navbarActions.style.animation = 'slideOutLeft 0.3s ease 0.1s forwards';
        
        setTimeout(() => {
            navbarMenu.classList.remove('active');
            navbarActions.classList.remove('active');
            navbarMenu.style.animation = '';
            navbarActions.style.animation = '';
        }, 300);
        
        document.body.style.overflow = '';
        
        // Quitar clase active de todos los enlaces
        navLinks.forEach(l => {
            l.classList.remove('active');
            l.querySelector('i')?.classList.remove('fa-spin');
        });
        
        // Añadir clase active al enlace clicado
        link.classList.add('active');
        
        // Animación del icono
        const icon = link.querySelector('i');
        if (icon) {
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 1000);
        }
    });
});

/**
 * Cambiar el estilo de la navbar al hacer scroll
 */
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Efecto de navbar glassmorphism al hacer scroll
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(18, 18, 32, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '2px solid rgba(108, 99, 255, 0.5)';
    } else {
        navbar.style.background = 'rgba(18, 18, 32, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        navbar.style.borderBottom = '2px solid transparent';
    }
    
    // Efecto de esconder/mostrar navbar al hacer scroll
    if (currentScroll > 100 && currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
    }
    
    lastScroll = currentScroll;
});

/**
 * Scroll spy mejorado - Resaltar el enlace de la sección actual
 */
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Efecto visual para la sección activa
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Quitar active de todos los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.style.animation = '';
            });
            
            // Añadir active al enlace correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.style.animation = 'pulse 1s ease';
                
                // Destacar icono
                const icon = activeLink.querySelector('i');
                if (icon) {
                    icon.style.color = '#6C63FF';
                    icon.style.filter = 'drop-shadow(0 0 8px rgba(108, 99, 255, 0.5))';
                }
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
sections.forEach(section => {
    section.style.opacity = '0.9';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

/**
 * Cerrar el menú al hacer clic fuera de él (en móviles)
 */
document.addEventListener('click', (e) => {
    const isClickInsideNavbar = navbar.contains(e.target);
    const isMenuOpen = navbarMenu.classList.contains('active');
    
    if (!isClickInsideNavbar && isMenuOpen) {
        navbarToggle.classList.remove('active');
        
        navbarMenu.style.animation = 'slideOutLeft 0.3s ease forwards';
        navbarActions.style.animation = 'slideOutLeft 0.3s ease 0.1s forwards';
        
        setTimeout(() => {
            navbarMenu.classList.remove('active');
            navbarActions.classList.remove('active');
            navbarMenu.style.animation = '';
            navbarActions.style.animation = '';
        }, 300);
        
        document.body.style.overflow = '';
    }
});

/**
 * Animaciones mejoradas para elementos al hacer scroll
 */
const observeElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .hero-stats, .contact-form');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.filter = 'blur(0)';
                
                // Efecto especial para cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.boxShadow = '0 20px 40px rgba(108, 99, 255, 0.3)';
                }
            }, index * 150);
            
            // Dejar de observar después de animar
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px) scale(0.95)';
    element.style.filter = 'blur(5px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease, box-shadow 0.8s ease';
    fadeInObserver.observe(element);
});

/**
 * Efecto hover mejorado para botones
 */
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

/**
 * Efecto de partículas flotantes dinámicas
 */
function createFloatingShape() {
    const shapes = document.querySelector('.floating-shapes');
    if (!shapes) return;
    
    const shape = document.createElement('div');
    const size = Math.random() * 30 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.left = `${left}%`;
    shape.style.animationDuration = `${duration}s`;
    shape.style.animationDelay = `${delay}s`;
    shape.style.background = Math.random() > 0.5 
        ? 'linear-gradient(135deg, #6C63FF, #36D1DC)' 
        : 'linear-gradient(135deg, #FF6584, #FFB347)';
    shape.style.opacity = Math.random() * 0.15 + 0.05;
    shape.style.borderRadius = '50%';
    shape.style.animation = `floatShape ${duration}s infinite linear`;
    shape.style.position = 'absolute';
    
    shapes.appendChild(shape);
    
    // Remover después de la animación
    setTimeout(() => {
        if (shape.parentNode === shapes) {
            shape.remove();
        }
    }, duration * 1000);
}

// Crear partículas periódicamente
setInterval(createFloatingShape, 1000);

// Crear algunas partículas iniciales
for (let i = 0; i < 5; i++) {
    setTimeout(() => createFloatingShape(), i * 300);
}

/**
 * Animaciones CSS adicionales - CORREGIDAS
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            left: -100%;
            opacity: 0;
        }
        to {
            left: 0;
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            left: 0;
            opacity: 1;
        }
        to {
            left: -100%;
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes floatShape {
        0% {
            transform: translateY(100vh) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(720deg);
        }
    }
`;

document.head.appendChild(style);

// Inicializar animaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que las animaciones CSS estén definidas
    const existingAnimations = document.getElementById('dynamic-animations');
    if (!existingAnimations) {
        const animStyle = document.createElement('style');
        animStyle.id = 'dynamic-animations';
        animStyle.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .fade-in {
                animation: fadeInUp 1s ease forwards;
            }
            
            .navbar-menu,
            .navbar-actions {
                transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(animStyle);
    }
});