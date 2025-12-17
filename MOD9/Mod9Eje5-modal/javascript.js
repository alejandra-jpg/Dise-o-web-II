// Elementos del DOM
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const body = document.body;

/**
 * Abrir un modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.add('active');
        body.classList.add('modal-open');
        console.log(`Modal abierto: ${modalId}`);
    }
}

/**
 * Cerrar un modal
 */
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
        console.log('Modal cerrado');
    }
}

/**
 * Cerrar todos los modales
 */
function closeAllModals() {
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    body.classList.remove('modal-open');
}

// Event listeners para abrir modales
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modal;
        openModal(modalId);
    });
});

// Event listeners para cerrar modales
modals.forEach(modal => {
    // Botón de cerrar (X)
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal(modal);
        });
    }
    
    // Botón de cancelar (si existe)
    const cancelBtn = modal.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Click en el overlay (fuera del contenido)
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Prevenir que el click en el contenido cierre el modal
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Prevenir envío del formulario en Modal 1
const modalForm = document.querySelector('#modal1 .modal-form');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Formulario enviado! (En una app real, se enviaría al servidor)');
        closeAllModals();
        modalForm.reset();
    });
}

// Confirmar acción en Modal 2
const confirmBtn = document.querySelector('#modal2 .btn-success');
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        alert('¡Acción confirmada!');
        closeAllModals();
    });
}

// Click en imágenes de la galería (Modal 4)
const galleryImages = document.querySelectorAll('#modal4 .gallery img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        // En una app real, aquí abrirías la imagen en grande
        alert(`Imagen clickeada: ${img.alt}`);
    });
});
// Funcionalidad para la galería de imágenes
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modales
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Cerrar modales
    const closeButtons = document.querySelectorAll('.modal-close, .modal-overlay');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target === button || button.classList.contains('modal-close')) {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.getElementById('imageViewerModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Galería de imágenes - vista ampliada
    const galleryImages = document.querySelectorAll('.gallery img');
    const imageViewerModal = document.getElementById('imageViewerModal');
    const imageViewerImg = imageViewerModal.querySelector('.image-viewer-img');
    const imageViewerCaption = imageViewerModal.querySelector('.image-viewer-caption');
    const imageViewerClose = imageViewerModal.querySelector('.image-viewer-close');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            imageViewerImg.src = img.src;
            imageViewerImg.alt = img.alt;
            imageViewerCaption.textContent = img.alt;
            imageViewerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    imageViewerClose.addEventListener('click', () => {
        imageViewerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    imageViewerModal.addEventListener('click', (e) => {
        if (e.target === imageViewerModal) {
            imageViewerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Manejar envío del formulario del modal
    const modalForm = document.querySelector('.modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = modalForm.querySelector('input[type="text"]').value;
            const email = modalForm.querySelector('input[type="email"]').value;
            const message = modalForm.querySelector('textarea').value;
            
            // Validación simple
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos del formulario');
                return;
            }
            
            // Mostrar mensaje de éxito
            alert(`¡Mensaje enviado con éxito!\n\nNombre: ${name}\nEmail: ${email}\n\nGracias por contactarnos. Te responderemos pronto.`);
            
            // Limpiar formulario
            modalForm.reset();
            
            // Cerrar modal
            const modal = modalForm.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            console.log('Formulario del modal enviado:', { name, email, message });
        });
    }
});