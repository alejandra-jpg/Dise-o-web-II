// Elementos del DOM
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const solicitarCotizacionBtn = document.getElementById('solicitarCotizacionBtn');
const contactForm = document.getElementById('contactForm');

/**
 * Cambiar a una pestaña específica
 */
function switchTab(targetTabId) {
    // Remover clase 'active' de todos los botones
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    // Remover clase 'active' de todos los contenidos
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar el botón clickeado
    const activeButton = document.querySelector(`[data-tab="${targetTabId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
    }
    
    // Mostrar el contenido correspondiente
    const activeContent = document.getElementById(targetTabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Guardar tab activo en localStorage
    localStorage.setItem('activeTab', targetTabId);
    
    console.log(`Tab cambiado a: ${targetTabId}`);
}

/**
 * Obtener índice del tab activo
 */
function getActiveTabIndex() {
    const activeButton = document.querySelector('.tab-btn.active');
    return Array.from(tabButtons).indexOf(activeButton);
}

/**
 * Navegar al tab anterior
 */
function previousTab() {
    const currentIndex = getActiveTabIndex();
    const previousIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    const previousTabId = tabButtons[previousIndex].dataset.tab;
    switchTab(previousTabId);
}

/**
 * Navegar al tab siguiente
 */
function nextTab() {
    const currentIndex = getActiveTabIndex();
    const nextIndex = (currentIndex + 1) % tabButtons.length;
    const nextTabId = tabButtons[nextIndex].dataset.tab;
    switchTab(nextTabId);
}

/**
 * Ir a la pestaña de contacto
 */
function goToContactTab() {
    switchTab('tab4');
    
    // Hacer scroll suave hacia el formulario
    setTimeout(() => {
        const contactFormElement = document.querySelector('#tab4 .contact-form');
        if (contactFormElement) {
            contactFormElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 300);
}

// Event listeners para los botones de tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        switchTab(targetTab);
    });
});

// Event listener para el botón "Solicitar Cotización"
if (solicitarCotizacionBtn) {
    solicitarCotizacionBtn.addEventListener('click', goToContactTab);
}

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    // Solo si estamos enfocados en un tab o en ningún input
    const isInputFocused = document.activeElement.tagName === 'INPUT' || 
                          document.activeElement.tagName === 'TEXTAREA' ||
                          document.activeElement.tagName === 'SELECT';
    
    if (isInputFocused) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            previousTab();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextTab();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
            // Atajos numéricos: presionar 1, 2, 3, 4
            const tabIndex = parseInt(e.key);
            if (tabIndex <= tabButtons.length) {
                switchTab(`tab${tabIndex}`);
            }
            break;
        case 'c':
        case 'C':
            // Atajo para ir al contacto
            e.preventDefault();
            goToContactTab();
            break;
    }
});

// Manejar envío del formulario de contacto
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validación simple
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos del formulario');
            return;
        }
        
       
        
        // Limpiar formulario
        contactForm.reset();
        
        // Mostrar confirmación en la consola
        console.log('Formulario de contacto enviado:', {
            name,
            email,
            message
        });
    });
}

// Cargar tab guardado al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTab');
    
    if (savedTab && document.getElementById(savedTab)) {
        switchTab(savedTab);
    } else {
        // Por defecto, mostrar el primer tab
        switchTab('tab1');
    }
    
    console.log('Sistema de tabs inicializado');
    console.log('Atajos de teclado disponibles:');
    console.log('- Flechas ← → : Navegar entre tabs');
    console.log('- Números 1-4 : Ir directamente a un tab');
    console.log('- Tecla C : Ir a la pestaña de Contacto');
});

// Añadir focus visible para accesibilidad
tabButtons.forEach(button => {
    button.addEventListener('focus', () => {
        button.style.outline = '2px solid #667eea';
        button.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', () => {
        button.style.outline = 'none';
    });
});

// Añadir focus para el botón de solicitar cotización
if (solicitarCotizacionBtn) {
    solicitarCotizacionBtn.addEventListener('focus', () => {
        solicitarCotizacionBtn.style.outline = '2px solid #667eea';
        solicitarCotizacionBtn.style.outlineOffset = '2px';
    });
    
    solicitarCotizacionBtn.addEventListener('blur', () => {
        solicitarCotizacionBtn.style.outline = 'none';
    });
}