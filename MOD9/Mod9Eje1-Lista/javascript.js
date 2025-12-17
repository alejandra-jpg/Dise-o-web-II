// Elementos del DOM
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');
const itemCount = document.getElementById('itemCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Elementos del Modal
const confirmationModal = document.getElementById('confirmationModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCancelBtn = confirmationModal.querySelector('.cancel-btn');
const modalConfirmBtn = confirmationModal.querySelector('.confirm-btn');
const modalCloseBtn = confirmationModal.querySelector('.modal-close');

// Variables para almacenar la acción pendiente
let pendingAction = null;
let count = 0;

/**
 * Actualizar contador
 */
function updateCount() {
    count = itemList.children.length;
    itemCount.textContent = count;
    // Guardar en localStorage si existe
    if (typeof saveList === 'function') {
        saveList();
    }
}

/**
 * Mostrar notificación suave
 */
function showNotification(message, type = 'info') {
    // Eliminar notificaciones previas
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Crear nueva notificación (más grande)
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${type === 'error' ? '#ff8a80' : type === 'success' ? '#81c784' : '#b993d6'};
        color: white;
        padding: 18px 36px;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        font-size: 18px;
        font-weight: 500;
        max-width: 400px;
        min-width: 300px;
        line-height: 1.4;
        text-align: center;
        border: 2px solid rgba(255,255,255,0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Añadir estilos para la animación
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(-10px) scale(0.95); }
    }
`;
document.head.appendChild(style);

/**
 * Crear un nuevo item de lista
 */
function createListItem(text) {
    // Crear elemento <li>
    const li = document.createElement('li');
    li.className = 'list-item';
    
    // Crear estructura HTML del item
    li.innerHTML = `
        <span class="item-text">${text}</span>
        <input type="text" class="edit-input" value="${text}">
        <div class="item-buttons">
            <button class="btn-icon btn-edit" title="Editar">✎</button>
            <button class="btn-icon btn-save" title="Guardar">✔</button>
            <button class="btn-icon btn-delete" title="Eliminar">✕</button>
        </div>
    `;
    
    return li;
}

/**
 * Añadir nuevo item
 */
function addItem() {
    const text = itemInput.value.trim();
    
    // Validar que no esté vacío
    if (text === '') {
        showNotification('Por favor escribe algo antes de añadir', 'error');
        itemInput.focus();
        return;
    }
    
    // Crear y añadir el item
    const listItem = createListItem(text);
    itemList.appendChild(listItem);
    
    // Limpiar input y enfocar
    itemInput.value = '';
    itemInput.focus();
    
    // Actualizar contador
    updateCount();
    
    // Mostrar confirmación
    showNotification('Item añadido correctamente', 'success');
}

/**
 * Eliminar item con animación
 */
function deleteItem(listItem) {
    // Añadir animación de salida
    listItem.style.transform = 'translateX(100%)';
    listItem.style.opacity = '0';
    
    setTimeout(() => {
        listItem.remove();
        updateCount();
        showNotification('Item eliminado', 'info');
    }, 300);
}

/**
 * Activar modo edición
 */
function enableEditMode(listItem) {
    listItem.classList.add('editing');
    const editInput = listItem.querySelector('.edit-input');
    editInput.focus();
    editInput.select();
}

/**
 * Guardar edición
 */
function saveEdit(listItem) {
    const editInput = listItem.querySelector('.edit-input');
    const itemText = listItem.querySelector('.item-text');
    const newText = editInput.value.trim();
    
    if (newText === '') {
        showNotification('El texto no puede estar vacío', 'error');
        return;
    }
    
    // Actualizar texto
    itemText.textContent = newText;
    
    // Desactivar modo edición
    listItem.classList.remove('editing');
    
    // Mostrar confirmación
    showNotification('Cambios guardados', 'success');
}

/**
 * Limpiar toda la lista
 */
function clearAll() {
    if (count === 0) {
        showNotification('La lista ya está vacía', 'info');
        return;
    }
    
    // Añadir animación a todos los items
    const items = Array.from(itemList.children);
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(-100%)';
            item.style.opacity = '0';
        }, index * 50);
    });
    
    setTimeout(() => {
        itemList.innerHTML = '';
        updateCount();
        showNotification('Todos los items han sido eliminados', 'info');
    }, items.length * 50 + 300);
}

/**
 * Guardar lista en localStorage
 */
function saveList() {
    const items = Array.from(itemList.children).map(item => 
        item.querySelector('.item-text').textContent
    );
    localStorage.setItem('listaItems', JSON.stringify(items));
}

/**
 * Cargar lista desde localStorage
 */
function loadList() {
    const saved = JSON.parse(localStorage.getItem('listaItems')) || [];
    saved.forEach(text => {
        const listItem = createListItem(text);
        itemList.appendChild(listItem);
    });
    updateCount();
    
    if (saved.length > 0) {
        showNotification(`${saved.length} items cargados`, 'info');
    }
}

/**
 * Añadir items de ejemplo
 */
function addExampleItems() {
    const examples = [
        'Aprender DOM',
        'Practicar JavaScript',
        'Crear proyectos web',
        'Estudiar CSS avanzado',
        'Implementar LocalStorage'
    ];
    
    examples.forEach((text, index) => {
        setTimeout(() => {
            const listItem = createListItem(text);
            itemList.appendChild(listItem);
            
            // Animación secuencial
            listItem.style.animation = 'slideIn 0.4s ease';
        }, index * 100);
    });
    
    setTimeout(() => {
        updateCount();
        showNotification('Ejemplos añadidos', 'info');
    }, examples.length * 100);
}

/**
 * Mostrar modal de confirmación
 */
function showConfirmationModal(title, message, type = 'warning', onConfirm) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    pendingAction = onConfirm;
    
    // Cambiar el icono según el tipo
    const icon = confirmationModal.querySelector('.modal-icon');
    icon.className = 'modal-icon ' + type;
    
    // Cambiar texto del botón según el tipo
    const confirmBtn = confirmationModal.querySelector('.confirm-btn');
    if (type === 'success') {
        confirmBtn.className = 'btn btn-success confirm-btn';
        confirmBtn.textContent = 'Aceptar';
    } else if (type === 'error') {
        confirmBtn.className = 'btn btn-danger confirm-btn';
        confirmBtn.textContent = 'Eliminar';
    } else {
        confirmBtn.className = 'btn btn-danger confirm-btn';
        confirmBtn.textContent = 'Confirmar';
    }
    
    confirmationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Cerrar modal
 */
function closeModal() {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    pendingAction = null;
}

// Event Listeners para el modal
modalCancelBtn.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalConfirmBtn.addEventListener('click', () => {
    if (pendingAction) {
        pendingAction();
    }
    closeModal();
});

// Cerrar modal al hacer clic fuera del contenido
confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        closeModal();
    }
});

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmationModal.style.display === 'block') {
        closeModal();
    }
});

/**
 * Eliminar item con confirmación modal
 */
function confirmDeleteItem(listItem) {
    const itemText = listItem.querySelector('.item-text').textContent;
    showConfirmationModal(
        '¿Eliminar Item?',
        `¿Estás seguro de eliminar "${itemText}"? Esta acción no se puede deshacer.`,
        'warning',
        () => deleteItem(listItem)
    );
}

/**
 * Limpiar toda la lista con confirmación modal
 */
function confirmClearAll() {
    if (count === 0) {
        showNotification('La lista ya está vacía', 'info');
        return;
    }
    
    showConfirmationModal(
        '¿Limpiar Toda la Lista?',
        `Se eliminarán ${count} items. Esta acción no se puede deshacer.`,
        'warning',
        clearAll
    );
}

// ============================================
// EVENT LISTENERS PRINCIPALES
// ============================================

// Añadir item con botón
addBtn.addEventListener('click', addItem);

// Añadir item con Enter
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Event delegation para botones de items
itemList.addEventListener('click', (e) => {
    const listItem = e.target.closest('.list-item');
    
    if (!listItem) return;
    
    // Botón eliminar - Usar modal personalizado
    if (e.target.classList.contains('btn-delete')) {
        confirmDeleteItem(listItem);
    }
    
    // Botón editar
    if (e.target.classList.contains('btn-edit')) {
        enableEditMode(listItem);
    }
    
    // Botón guardar
    if (e.target.classList.contains('btn-save')) {
        saveEdit(listItem);
    }
});

// Guardar edición con Enter
itemList.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
        const listItem = e.target.closest('.list-item');
        saveEdit(listItem);
    }
});

// Cancelar edición con Escape
itemList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && e.target.classList.contains('edit-input')) {
        const listItem = e.target.closest('.list-item');
        listItem.classList.remove('editing');
    }
});

// Limpiar todo - Usar modal
clearAllBtn.addEventListener('click', confirmClearAll);

/**
 * Inicializar aplicación
 */
function initApp() {
    // Cargar items guardados
    loadList();
    
    // Inicializar contador
    updateCount();
    
    // Añadir items de ejemplo automáticamente si no hay items
    setTimeout(() => {
        if (count === 0) {
            addExampleItems();
        }
    }, 1000);
}

// Iniciar la aplicación
initApp();