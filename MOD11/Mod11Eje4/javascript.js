// Elementos DOM
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadArea = document.getElementById('uploadArea');
const gallery = document.getElementById('gallery');
const stats = document.getElementById('stats');
const totalImages = document.getElementById('totalImages');
const totalSize = document.getElementById('totalSize');
const clearAllBtn = document.getElementById('clearAllBtn');

// Modales
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalInfo = document.getElementById('modalInfo');
const modalClose = document.getElementById('modalClose');
const downloadBtn = document.getElementById('downloadBtn');
const deleteSingleBtn = document.getElementById('deleteSingleBtn');

// Modales de confirmación
const deleteSingleModal = document.getElementById('deleteSingleModal');
const deleteSingleAccept = document.getElementById('deleteSingleAccept');
const deleteSingleCancel = document.getElementById('deleteSingleCancel');
const deletePreviewImage = document.getElementById('deletePreviewImage');
const deleteImageName = document.getElementById('deleteImageName');
const confirmModal = document.getElementById('confirmModal');
const confirmAccept = document.getElementById('confirmAccept');
const confirmCancel = document.getElementById('confirmCancel');

// Variables globales
let images = [];
let currentModalImageId = null;
let imageToDelete = null;

/**
 * Formatear tamaño de archivo
 */
function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Procesar archivos - VERSIÓN CORREGIDA
 */
function handleFiles(files) {
    if (!files || files.length === 0) {
        console.warn('No se recibieron archivos');
        return;
    }
    
    console.log(`Procesando ${files.length} archivo(s)`);
    
    const validFiles = Array.from(files).filter(file => {
        // Verificar si es una imagen
        if (!file.type.startsWith('image/')) {
            showToast(`"${file.name}" no es una imagen válida`, 'error');
            return false;
        }
        
        // Verificar tamaño máximo (10MB)
        if (file.size > 10 * 1024 * 1024) {
            showToast(`"${file.name}" es demasiado grande (máx. 10MB)`, 'error');
            return false;
        }
        
        return true;
    });
    
    if (validFiles.length === 0) {
        showToast('No hay imágenes válidas para procesar', 'warning');
        return;
    }
    
    // Mostrar indicador de procesamiento
    showProcessingIndicator(validFiles.length);
    
    let processedCount = 0;
    
    validFiles.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            console.log(`Imagen ${index + 1} cargada: ${file.name}`);
            
            const imageData = {
                id: Date.now() + Math.random(),
                src: e.target.result,
                name: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString()
            };
            
            images.unshift(imageData);
            processedCount++;
            
            // Actualizar contador de procesamiento
            updateProcessingIndicator(processedCount, validFiles.length);
            
            // Cuando todas las imágenes estén procesadas
            if (processedCount === validFiles.length) {
                // Renderizar galería
                renderGallery();
                updateStats();
                
                // Ocultar indicador
                hideProcessingIndicator();
                
                // Mostrar mensaje de éxito
                showToast(`${validFiles.length} imagen(es) cargada(s) exitosamente`, 'success');
                
                // Efecto de celebración si son muchas imágenes
                if (validFiles.length > 3) {
                    celebrateUpload();
                }
            }
        };
        
        reader.onerror = function() {
            console.error(`Error al leer ${file.name}`);
            showToast(`Error al cargar "${file.name}"`, 'error');
            processedCount++;
            
            if (processedCount === validFiles.length) {
                hideProcessingIndicator();
                renderGallery();
                updateStats();
            }
        };
        
        // Leer el archivo como Data URL
        reader.readAsDataURL(file);
    });
}

/**
 * Mostrar indicador de procesamiento
 */
function showProcessingIndicator(total) {
    let indicator = document.querySelector('.processing-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'processing-indicator';
        indicator.innerHTML = `
            <div class="processing-spinner"></div>
            <div class="processing-text">Procesando imágenes: <span class="processing-count">0/${total}</span></div>
        `;
        document.body.appendChild(indicator);
        
        // Activar con retraso para la animación
        setTimeout(() => indicator.classList.add('active'), 10);
    }
}

/**
 * Actualizar indicador de procesamiento
 */
function updateProcessingIndicator(current, total) {
    const indicator = document.querySelector('.processing-indicator');
    if (indicator) {
        const countElement = indicator.querySelector('.processing-count');
        if (countElement) {
            countElement.textContent = `${current}/${total}`;
        }
    }
}

/**
 * Ocultar indicador de procesamiento
 */
function hideProcessingIndicator() {
    const indicator = document.querySelector('.processing-indicator');
    if (indicator) {
        indicator.classList.remove('active');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 500);
    }
}

/**
 * Renderizar galería - VERSIÓN SIMPLIFICADA Y FUNCIONAL
 */
function renderGallery() {
    console.log(`Renderizando galería con ${images.length} imágenes`);
    
    const emptyState = document.getElementById('emptyState');
    
    if (images.length === 0) {
        gallery.innerHTML = '';
        if (emptyState) {
            gallery.appendChild(emptyState);
            emptyState.style.display = 'block';
        }
        stats.style.display = 'none';
        return;
    }
    
    // Ocultar estado vacío
    if (emptyState) emptyState.style.display = 'none';
    
    // Mostrar estadísticas
    stats.style.display = 'flex';
    
    // Crear HTML de la galería
    let galleryHTML = '';
    
    images.forEach((img, index) => {
        galleryHTML += `
            <div class="gallery-item" data-id="${img.id}">
                <img src="${img.src}" alt="${img.name}" class="gallery-image">
                <button class="btn-remove" onclick="openDeleteSingleModal(${img.id})">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="image-index">${index + 1}</div>
                <div class="gallery-info">
                    <div class="image-name" title="${img.name}">${img.name}</div>
                    <div class="image-size">${formatSize(img.size)}</div>
                </div>
            </div>
        `;
    });
    
    gallery.innerHTML = galleryHTML;
    
    // Agregar event listeners a las imágenes
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const id = parseFloat(galleryItem.dataset.id);
            openModal(id);
        });
    });
}

/**
 * Actualizar estadísticas
 */
function updateStats() {
    totalImages.textContent = images.length;
    const total = images.reduce((sum, img) => sum + img.size, 0);
    totalSize.textContent = formatSize(total);
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = 'info') {
    // Remover toast existente
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 type === 'warning' ? 'exclamation-triangle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

/**
 * Abrir modal de vista
 */
function openModal(id) {
    const img = images.find(i => i.id === id);
    if (img) {
        currentModalImageId = id;
        modalImage.src = img.src;
        modalImage.alt = img.name;
        
        const uploadDate = new Date(img.uploadedAt);
        modalInfo.innerHTML = `
            <h3><i class="fas fa-file-image"></i> ${img.name}</h3>
            <div class="modal-details">
                <div class="detail-item">
                    <i class="fas fa-weight-hanging"></i>
                    <span>Tamaño: <strong>${formatSize(img.size)}</strong></span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-file-alt"></i>
                    <span>Tipo: <strong>${img.type}</strong></span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Subido: <strong>${uploadDate.toLocaleDateString()}</strong></span>
                </div>
            </div>
        `;
        
        // Configurar botones
        downloadBtn.onclick = () => downloadImage(img);
        deleteSingleBtn.onclick = () => {
            closeModal();
            setTimeout(() => openDeleteSingleModal(id), 300);
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cerrar modal de vista
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Descargar imagen
 */
function downloadImage(img) {
    const link = document.createElement('a');
    link.href = img.src;
    link.download = img.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`"${img.name}" descargado`, 'success');
}

/**
 * Abrir modal para eliminar imagen individual
 */
function openDeleteSingleModal(id) {
    const img = images.find(i => i.id === id);
    if (!img) return;
    
    imageToDelete = id;
    
    // Configurar vista previa
    deletePreviewImage.src = img.src;
    deleteImageName.textContent = img.name;
    document.getElementById('deleteImageSize').textContent = formatSize(img.size);
    
    // Configurar fecha
    const uploadDate = new Date(img.uploadedAt);
    document.getElementById('deleteImageDate').textContent = uploadDate.toLocaleDateString();
    
    deleteSingleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cerrar modal de eliminación individual
 */
function closeDeleteSingleModal() {
    deleteSingleModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    imageToDelete = null;
}

/**
 * Eliminar imagen individual
 */
function deleteSingleImage() {
    if (!imageToDelete) return;
    
    const img = images.find(i => i.id === imageToDelete);
    if (!img) return;
    
    // Eliminar imagen
    images = images.filter(i => i.id !== imageToDelete);
    
    // Cerrar modal y actualizar
    closeDeleteSingleModal();
    renderGallery();
    updateStats();
    
    // Mostrar notificación
    showToast(`"${img.name}" eliminada`, 'success');
    
    // Efecto de confeti para confirmación
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background: #FF6584;
                border-radius: 50%;
                z-index: 9999;
                animation: deleteConfetti 1s ease-out forwards;
            `;
            
            // Crear estilo para la animación
            if (!document.getElementById('deleteConfettiStyle')) {
                const style = document.createElement('style');
                style.id = 'deleteConfettiStyle';
                style.textContent = `
                    @keyframes deleteConfetti {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1000);
        }, i * 100);
    }
}

/**
 * Abrir modal para eliminar todo
 */
function openConfirmModal() {
    if (images.length === 0) {
        showToast('No hay imágenes para eliminar', 'info');
        return;
    }
    
    confirmModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cerrar modal de confirmación
 */
function closeConfirmModal() {
    confirmModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Eliminar todas las imágenes
 */
function deleteAllImages() {
    const count = images.length;
    
    // Efecto visual de eliminación
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('deleting');
        }, index * 50);
    });
    
    setTimeout(() => {
        images = [];
        closeConfirmModal();
        renderGallery();
        updateStats();
        
        // Mostrar confeti de eliminación masiva
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 10px;
                    height: 10px;
                    background: ${['#FF6584', '#FF5252', '#FF3838'][Math.floor(Math.random() * 3)]};
                    border-radius: 50%;
                    z-index: 9999;
                    animation: massDeleteConfetti 1.5s ease-out forwards;
                `;
                
                // Estilo para animación
                if (!document.getElementById('massDeleteConfettiStyle')) {
                    const style = document.createElement('style');
                    style.id = 'massDeleteConfettiStyle';
                    style.textContent = `
                        @keyframes massDeleteConfetti {
                            0% {
                                transform: translate(0, 0) rotate(0deg) scale(1);
                                opacity: 1;
                            }
                            100% {
                                transform: translate(
                                    ${Math.random() * 400 - 200}px, 
                                    ${Math.random() * 400 - 200}px
                                ) rotate(${Math.random() * 720}deg) scale(0);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 1500);
            }, i * 30);
        }
        
        showToast(`${count} imágenes eliminadas`, 'success');
    }, 300);
}

/**
 * Efecto de celebración
 */
function celebrateUpload() {
    // Efecto simple de confeti
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${['#6C63FF', '#FF6584', '#36D1DC', '#FFD166'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                z-index: 9999;
                animation: confettiFall 1s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 1000);
        }, i * 100);
    }
}

// ========== EVENT LISTENERS ==========

// Botón de selección de archivos
browseBtn.addEventListener('click', () => {
    fileInput.click();
});

// Input file change
fileInput.addEventListener('change', (e) => {
    console.log('Archivos seleccionados:', e.target.files);
    if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
        e.target.value = ''; // Reset
    }
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    console.log('Archivos arrastrados:', e.dataTransfer.files);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
    }
});

// Hacer clic en el área de upload
uploadArea.addEventListener('click', (e) => {
    // Solo si se hace clic en el área misma, no en los botones
    if (e.target === uploadArea || 
        e.target.classList.contains('upload-icon') ||
        e.target.classList.contains('upload-content') ||
        e.target.classList.contains('upload-hint')) {
        fileInput.click();
    }
});

// Botón limpiar todo
clearAllBtn.addEventListener('click', openConfirmModal);

// Modales
modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

deleteSingleAccept.addEventListener('click', deleteSingleImage);
deleteSingleCancel.addEventListener('click', closeDeleteSingleModal);
deleteSingleModal.querySelector('.modal-overlay').addEventListener('click', closeDeleteSingleModal);

confirmAccept.addEventListener('click', deleteAllImages);
confirmCancel.addEventListener('click', closeConfirmModal);
confirmModal.querySelector('.modal-overlay').addEventListener('click', closeConfirmModal);

// Tecla ESC para cerrar modales
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeModal();
        if (deleteSingleModal.classList.contains('active')) closeDeleteSingleModal();
        if (confirmModal.classList.contains('active')) closeConfirmModal();
    }
});

// ========== INICIALIZACIÓN ==========

// Agregar estilos dinámicos
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* Toast */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a1a2e;
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid #6C63FF;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast-success { border-left-color: #10b981; }
        .toast-error { border-left-color: #ef4444; }
        .toast-warning { border-left-color: #f59e0b; }
        .toast-info { border-left-color: #3b82f6; }
        
        /* Confeti */
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Índice de imagen */
        .image-index {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            z-index: 2;
        }
        
        /* Efecto de eliminación para galería */
        .gallery-item.deleting {
            animation: itemDelete 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes itemDelete {
            0% {
                transform: translateX(0) scale(1);
                opacity: 1;
            }
            50% {
                transform: translateX(20px) scale(0.8);
                opacity: 0.5;
            }
            100% {
                transform: translateX(-100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Galería inicializada');
    
    // Asegurar que los modales estén ocultos al inicio
    [modal, deleteSingleModal, confirmModal].forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Mostrar mensaje de bienvenida después de un segundo
    setTimeout(() => {
        if (images.length === 0) {
            showToast('¡Arrastra imágenes o haz clic para comenzar!', 'info');
        }
    }, 1000);
    
    // Agregar clase para indicar que la galería está lista
    setTimeout(() => {
        document.body.classList.add('gallery-ready');
    }, 500);
});