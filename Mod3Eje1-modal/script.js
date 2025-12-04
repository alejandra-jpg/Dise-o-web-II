// Seleccionar elementos del DOM
const btnOpen = document.querySelector('.btn-open');
const btnClose = document.querySelector('.btn-close');
const modalOverlay = document.querySelector('#modalOverlay');
const btnModalAction = document.querySelector('.btn-modal-action');

/**
 * Función para abrir el modal
 */
function openModal() {
    modalOverlay.classList.add('active');
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

/**
 * Función para cerrar el modal
 */
function closeModal() {
    modalOverlay.classList.remove('active');
    // Restaurar scroll del body
    document.body.style.overflow = '';
}

// Event listener para abrir el modal
btnOpen.addEventListener('click', openModal);

// Event listener para cerrar el modal con el botón X
btnClose.addEventListener('click', closeModal);

// Event listener para cerrar el modal con el botón de acción
btnModalAction.addEventListener('click', closeModal);

// Event listener para cerrar el modal al hacer clic en el overlay (fuera del modal)
modalOverlay.addEventListener('click', (e) => {
    // Verificar que el clic fue en el overlay y no en el modal
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Event listener para cerrar el modal con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Prevenir que los clics dentro del modal cierren el modal
document.querySelector('.modal').addEventListener('click', (e) => {
    e.stopPropagation();
});


/**
 * Función para copiar código al portapapeles
 */
function copyCode() {
    const codeElement = document.querySelector('.code-example code');
    const codeText = codeElement.innerText;
    
    // Crear un área de texto temporal
    const textArea = document.createElement('textarea');
    textArea.value = codeText;
    document.body.appendChild(textArea);
    
    // Seleccionar y copiar
    textArea.select();
    document.execCommand('copy');
    
    // Remover el área de texto temporal
    document.body.removeChild(textArea);
    
    // Cambiar temporalmente el texto del botón
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '✓ ¡Copiado!';
    copyBtn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = 'linear-gradient(135deg, #FF6B6B, #4ECDC4)';
    }, 2000);
}

/**
 * Efecto de aparición para las tarjetas
 */
function animateCards() {
    const cards = document.querySelectorAll('.concept-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Efecto de hover mejorado para las tarjetas de recursos
 */
function initResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.resource-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.resource-icon');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
            }
        });
    });
}

// Inicializar animaciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    animateCards();
    initResourceCards();
    
    // Añadir efecto de typing al subtítulo
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Añadir sonido de clic al botón de copiar
function playCopySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Actualizar función copyCode para incluir sonido
const originalCopyCode = copyCode;
copyCode = function() {
    originalCopyCode();
    playCopySound();
};