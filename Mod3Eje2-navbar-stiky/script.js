/* ===============================================
   NAVBAR STICKY - JAVASCRIPT COMPLETO
   ===============================================
   
   Funcionalidades:
   1. Detectar scroll para navbar sticky
   2. Mostrar/ocultar botón "Volver arriba"
   3. Menú hamburguesa responsive
   4. Highlight de sección activa
   5. Animaciones de scroll reveal
   6. Smooth scroll mejorado
   =============================================== */

// ===== ELEMENTOS DOM =====
const navbar = document.getElementById('navbar');
const btnTop = document.getElementById('btnTop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ===== VARIABLES GLOBALES =====
let lastScroll = 0;
let isScrolling = false;

// ===== NAVBAR SCROLLED =====
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Añadir clase .scrolled cuando scrolleamos hacia abajo
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Mostrar botón "Volver arriba" después de 300px
    if (currentScroll > 300) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
    
    // Control de scroll para performance
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScrollAnimation();
            highlightActiveSection();
            isScrolling = false;
        });
        isScrolling = true;
    }
    
    lastScroll = currentScroll;
});

// ===== VOLVER ARRIBA =====
btnTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== MENÚ HAMBURGUESA =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Cerrar menú al hacer click en enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== HIGHLIGHT ACTIVE SECTION =====
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const scrollElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    if (window.pageYOffset < 100) {
        element.classList.remove('visible');
    }
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// ===== SMOOTH SCROLL MEJORADO =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Solo para enlaces que empiezan con #
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== EFECTO MÁQUINA DE ESCRIBIR (opcional) =====
function initTypeWriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar después de 500ms
    setTimeout(typeWriter, 500);
}

// ===== FORMULARIO DE CONTACTO =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validación simple
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--color-primary)';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simular envío
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado correctamente!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// ===== BOTONES DE PRECIOS =====
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const plan = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`¡Has seleccionado el plan ${plan}! En una aplicación real, esto procedería al checkout.`);
    });
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animaciones
    handleScrollAnimation();
    
    // Iniciar efecto máquina de escribir
    initTypeWriterEffect();
    
    // Asegurar que el botón top esté oculto al inicio
    btnTop.classList.remove('visible');
    
    console.log('🎯 Navbar Sticky Demo Cargado');
    console.log('📍 Position: sticky con JavaScript para mejorar UX');
    console.log('⬆️ Scroll hacia abajo para ver el navbar pegarse');
    console.log('💡 Características:');
    console.log('  - Navbar con position: sticky');
    console.log('  - Clase .scrolled añadida con JS');
    console.log('  - Botón "Volver arriba" con position: fixed');
    console.log('  - Smooth scroll entre secciones');
    console.log('  - Menú hamburguesa responsive');
    console.log('  - Animaciones de scroll reveal');
    console.log('  - Formulario de contacto funcional');
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    // Cerrar menú hamburguesa en desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});