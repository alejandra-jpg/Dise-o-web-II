// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con animación de scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Ripple effect para botones
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        `;
        
        this.appendChild(ripple);
        
        // Crear estilo para la animación ripple
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remover el ripple después de la animación
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Funcionalidad para la Galería Interactiva

// 1. Filtrado de categorías
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Agregar clase active al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Animación de salida
        galleryItems.forEach(item => {
            item.style.animation = 'none';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // Mostrar u ocultar según el filtro
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Trigger reflow para reiniciar animación
                    void item.offsetWidth;
                    item.style.animation = 'fadeInSlideUp 0.5s ease-out forwards';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.display = 'none';
                }
            }, 300);
        });
    });
});

// 2. Vista modal ampliada
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.modal-content');
const closeModal = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        
        // Efecto de entrada para el modal
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Deshabilitar scroll del body
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('active');
        // Habilitar scroll del body
        document.body.style.overflow = 'auto';
    }, 300);
});

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            // Habilitar scroll del body
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('active');
            // Habilitar scroll del body
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// 3. Efecto de selección activa
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.classList.add('active');
    });
    
    item.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });
    
    // Click para ver detalles
    item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('gallery-item')) return;
        
        // Agregar efecto de click
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// 4. Observer para animaciones de entrada en galería
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Aplicar animación si no se ha aplicado ya
            if (!entry.target.style.opacity || entry.target.style.opacity === '0') {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInSlideUp 0.5s ease-out forwards';
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observar items de galería
document.querySelectorAll('.gallery-item').forEach(item => {
    galleryObserver.observe(item);
});

// 5. Efecto de carga inicial para la galería
window.addEventListener('load', () => {
    // Pequeño delay para que se vea la animación de carga
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '1';
        });
    }, 500);
});

// 6. Efectos adicionales para botones normales
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});