// scripts.js - Funcionalidad para navegación y efectos interactivos

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Blog con diseño colorido cargado correctamente');
    console.log('🚀 Navegación funcional activada');
    
    // Obtener el enlace de inicio
    const inicioLink = document.getElementById('inicio-link');
    
    // Agregar evento de clic al enlace "Inicio"
    if (inicioLink) {
        inicioLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar clase activa al enlace de inicio
            this.classList.add('active');
            
            // Scroll suave al principio de la página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            console.log('🏠 Navegando a la página de inicio...');
        });
    }
    
    // Agregar navegación por secciones a los enlaces del menú
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.id !== 'inicio-link') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remover clase activa de todos los enlaces
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Agregar clase activa al enlace actual
                this.classList.add('active');
                
                // Obtener el ID de la sección
                const targetId = this.getAttribute('href').replace('#', '');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll suave a la sección
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Mostrar mensaje en consola
                    const linkText = this.textContent.trim();
                    console.log(`📌 Navegando a: ${linkText}`);
                }
            });
        }
    });
    
    // Agregar interactividad a los artículos relacionados
    document.querySelectorAll('.related-posts a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('h4').textContent;
            console.log(`📄 Redirigiendo al artículo: "${title}"`);
        });
    });
    
    // Agregar interactividad a las etiquetas
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent;
            console.log(`🏷️ Buscando artículos con la etiqueta: ${tagName}`);
        });
    });
    
    // Agregar efectos de hover a las tarjetas del sidebar
    document.querySelectorAll('.widget').forEach(widget => {
        widget.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        widget.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Agregar efecto de hover a la imagen destacada
    const featuredImage = document.querySelector('.featured-image');
    if (featuredImage) {
        featuredImage.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        featuredImage.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Agregar efecto de scroll para cambiar el header
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll hacia abajo
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
            } else {
                // Scroll hacia arriba
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Agregar efecto de carga a los elementos
    const article = document.querySelector('.article');
    if (article) {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Detectar scroll para cambiar enlace activo
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Obtener todas las secciones con ID
        const sections = document.querySelectorAll('[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Actualizar enlace activo en el menú
        if (currentSection) {
            document.querySelectorAll('.main-nav a').forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
    });

    
});
