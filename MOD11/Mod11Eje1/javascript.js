// ================================
// CONFIGURACIÓN INICIAL
// ================================
console.log('🚀 Explorador de APIs HTML5 inicializando...');

// ================================
// GEOLOCATION API
// ================================
const getLocationBtn = document.getElementById('getLocation');
const locationResult = document.getElementById('locationResult');

// Función para mostrar/ocultar modales
function showPermissionModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

function hidePermissionModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Función global para manejar permisos
window.handlePermission = function(apiType, response) {
    if (apiType === 'geolocation') {
        handleGeolocationResponse(response);
    } else if (apiType === 'notification') {
        handleNotificationResponse(response);
    }
};

// Geolocation
if (getLocationBtn) {
    getLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showError(locationResult, 'Tu navegador no soporta geolocalización');
            return;
        }
        showPermissionModal('geolocation-permission-modal');
    });
}

function handleGeolocationResponse(response) {
    hidePermissionModal('geolocation-permission-modal');
    
    if (response === 'denied') {
        showError(locationResult, 'Acceso bloqueado a tu ubicación');
    } else {
        getRealLocation(response);
    }
}

function getRealLocation(permissionType) {
    showLoading(locationResult, 'Obteniendo tu ubicación...');
    
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            locationResult.innerHTML = `
                <div class="success-result">
                    <div class="result-header">
                        <span class="result-icon">📍</span>
                        <div>
                            <h3>Ubicación obtenida</h3>
                            <p>${permissionType === 'once' ? 'Permiso temporal' : 'Permiso permanente'}</p>
                        </div>
                    </div>
                    <div class="result-data">
                        <div class="data-item">
                            <label>Latitud</label>
                            <strong>${lat.toFixed(6)}°</strong>
                        </div>
                        <div class="data-item">
                            <label>Longitud</label>
                            <strong>${lon.toFixed(6)}°</strong>
                        </div>
                        <div class="data-item">
                            <label>Precisión</label>
                            <strong>${Math.round(accuracy)} metros</strong>
                        </div>
                    </div>
                    <a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank" class="map-link">
                        🗺️ Ver en Google Maps
                    </a>
                    <p class="timestamp">📍 Obtenido: ${new Date().toLocaleTimeString()}</p>
                </div>
            `;
        },
        (error) => {
            let message = 'Error al obtener ubicación';
            if (error.code === error.PERMISSION_DENIED) {
                message = 'Permiso denegado por el usuario';
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                message = 'Información de ubicación no disponible';
            } else if (error.code === error.TIMEOUT) {
                message = 'Tiempo de espera agotado';
            }
            showError(locationResult, message);
        },
        options
    );
}

// ================================
// NOTIFICATION API
// ================================
const requestBtn = document.getElementById('requestNotification');
const showBtn = document.getElementById('showNotification');
const notificationResult = document.getElementById('notificationResult');

if (requestBtn) {
    requestBtn.addEventListener('click', () => {
        showPermissionModal('notification-permission-modal');
    });
}

if (showBtn) {
    showBtn.addEventListener('click', () => {
        if (Notification.permission === 'granted') {
            showNotification();
        } else {
            showPermissionModal('notification-permission-modal');
        }
    });
}

function handleNotificationResponse(response) {
    hidePermissionModal('notification-permission-modal');
    
    if (response === 'denied') {
        showError(notificationResult, 'Notificaciones bloqueadas');
        if (showBtn) showBtn.disabled = true;
    } else if (response === 'granted') {
        if (!('Notification' in window)) {
            showError(notificationResult, 'Tu navegador no soporta notificaciones');
            return;
        }
        
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showSuccess(notificationResult, 'Permiso concedido para notificaciones');
                if (showBtn) showBtn.disabled = false;
                setTimeout(showNotification, 1000);
            } else {
                showError(notificationResult, 'Permiso denegado para notificaciones');
                if (showBtn) showBtn.disabled = true;
            }
        });
    }
}

function showNotification() {
    if (!('Notification' in window)) {
        showError(notificationResult, 'Tu navegador no soporta notificaciones');
        return;
    }
    
    const notification = new Notification('Explorador de APIs HTML5', {
        body: '🎉 ¡Hola! Esta es una notificación de demostración',
        icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968267.png'
    });
    
    showSuccess(notificationResult, 'Notificación enviada');
}

// ================================
// LOCALSTORAGE API
// ================================
const storageInput = document.getElementById('storageInput');
const saveStorageBtn = document.getElementById('saveStorage');
const loadStorageBtn = document.getElementById('loadStorage');
const clearStorageBtn = document.getElementById('clearStorage');
const storageResult = document.getElementById('storageResult');

if (saveStorageBtn) {
    saveStorageBtn.addEventListener('click', () => {
        const value = storageInput.value.trim();
        if (value) {
            localStorage.setItem('demoData', value);
            localStorage.setItem('lastSaved', new Date().toLocaleString());
            showSuccess(storageResult, `"${value}" ha sido guardado`);
        } else {
            showError(storageResult, 'Escribe algo para guardar');
        }
    });
}

if (loadStorageBtn) {
    loadStorageBtn.addEventListener('click', () => {
        const saved = localStorage.getItem('demoData');
        const timestamp = localStorage.getItem('lastSaved');
        
        if (saved) {
            storageInput.value = saved;
            storageResult.innerHTML = `
                <div class="info-result">
                    <h3>📦 Datos cargados</h3>
                    <p class="data-content">"${saved}"</p>
                    <p class="timestamp">Guardado el: ${timestamp || 'No disponible'}</p>
                </div>
            `;
        } else {
            showInfo(storageResult, 'No hay datos guardados');
        }
    });
}

if (clearStorageBtn) {
    clearStorageBtn.addEventListener('click', () => {
        localStorage.removeItem('demoData');
        localStorage.removeItem('lastSaved');
        storageInput.value = '';
        showInfo(storageResult, 'Todos los datos han sido eliminados');
    });
}

// ================================
// DRAG & DROP API
// ================================
const draggables = document.querySelectorAll('.draggable');
const zones = document.querySelectorAll('.zone');

let dropCount = 0;
let dropMessageTimeout = null;

// Actualizar mensaje de zona vacía
function updateEmptyMessage(zone) {
    const emptyMessage = zone.querySelector('.empty-message');
    if (emptyMessage) {
        emptyMessage.style.display = zone.children.length <= 1 ? 'block' : 'none';
    }
}

// Inicializar mensajes de zonas vacías
zones.forEach(zone => {
    updateEmptyMessage(zone);
});

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging');
        e.dataTransfer.setData('text/plain', draggable.textContent);
        e.dataTransfer.effectAllowed = 'move';
    });
    
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        zones.forEach(zone => zone.classList.remove('dragover'));
    });
});

zones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
        e.dataTransfer.dropEffect = 'move';
    });
    
    zone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
    });
    
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });
    
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        
        const dragging = document.querySelector('.dragging');
        if (dragging && zone !== dragging.parentElement) {
            // Animar el movimiento
            dragging.style.transform = 'scale(0.95)';
            dragging.style.opacity = '0.5';
            
            setTimeout(() => {
                // Cambiar color al mover a zona 2
                if (zone.id === 'zone2') {
                    dragging.style.background = 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)';
                } else if (zone.id === 'zone1') {
                    dragging.style.background = 'linear-gradient(135deg, #4ECDC4 0%, #6BC5BA 100%)';
                }
                
                zone.appendChild(dragging);
                dragging.style.transform = 'scale(1)';
                dragging.style.opacity = '1';
                
                dropCount++;
                
                // Mostrar mensaje temporal
                if (dropMessageTimeout) {
                    clearTimeout(dropMessageTimeout);
                }
                
                const message = document.createElement('div');
                message.className = 'drop-success-message';
                message.innerHTML = `
                    <span>✅</span>
                    <p>${dragging.textContent} movido a ${zone.id === 'zone1' ? 'Zona 1' : 'Zona 2'}</p>
                `;
                
                const dropInfo = document.querySelector('.drop-info');
                if (dropInfo) {
                    const oldMessage = dropInfo.querySelector('.drop-success-message');
                    if (oldMessage) oldMessage.remove();
                    
                    dropInfo.appendChild(message);
                    
                    dropMessageTimeout = setTimeout(() => {
                        message.style.opacity = '0';
                        message.style.transform = 'translateY(-10px)';
                        setTimeout(() => message.remove(), 300);
                    }, 3000);
                }
                
                // Actualizar contador
                updateDropCounter();
                
                // Actualizar mensajes de zonas vacías
                zones.forEach(z => updateEmptyMessage(z));
                
            }, 200);
        }
    });
});

function updateDropCounter() {
    const dropInfo = document.querySelector('.drop-info');
    if (dropInfo) {
        const counter = dropInfo.querySelector('.drop-counter');
        if (!counter) {
            const counterEl = document.createElement('p');
            counterEl.className = 'drop-counter';
            counterEl.style.cssText = 'margin-top: 5px; color: #FF6B6B; font-weight: bold;';
            counterEl.textContent = `Elementos movidos: ${dropCount}`;
            dropInfo.appendChild(counterEl);
        } else {
            counter.textContent = `Elementos movidos: ${dropCount}`;
        }
    }
}

// ================================
// FETCH API
// ================================
const apiSelector = document.getElementById('apiSelector');
const fetchDataBtn = document.getElementById('fetchData');
const fetchResult = document.getElementById('fetchResult');

const apiEndpoints = {
    users: 'https://jsonplaceholder.typicode.com/users/1',
    posts: 'https://jsonplaceholder.typicode.com/posts/1',
    comments: 'https://jsonplaceholder.typicode.com/comments/1'
};

if (fetchDataBtn) {
    fetchDataBtn.addEventListener('click', async () => {
        const selectedApi = apiSelector.value;
        showLoading(fetchResult, 'Cargando datos...');
        
        try {
            const response = await fetch(apiEndpoints[selectedApi]);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
            const data = await response.json();
            displayFetchResult(selectedApi, data);
            
        } catch (error) {
            showError(fetchResult, error.message);
        }
    });
}

function displayFetchResult(type, data) {
    let content = '';
    
    if (type === 'users') {
        content = `
            <div class="user-result">
                <div class="result-header">
                    <span class="result-icon">👤</span>
                    <div>
                        <h3>Información del Usuario</h3>
                        <p>ID: ${data.id}</p>
                    </div>
                </div>
                <div class="result-data">
                    <div class="data-item">
                        <label>Nombre</label>
                        <strong>${data.name}</strong>
                    </div>
                    <div class="data-item">
                        <label>Email</label>
                        <strong>${data.email}</strong>
                    </div>
                    <div class="data-item">
                        <label>Ciudad</label>
                        <strong>${data.address.city}</strong>
                    </div>
                    <div class="data-item">
                        <label>Empresa</label>
                        <strong>${data.company.name}</strong>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'posts') {
        content = `
            <div class="post-result">
                <div class="result-header">
                    <span class="result-icon">📝</span>
                    <div>
                        <h3>Post del Blog</h3>
                        <p>ID: ${data.id}</p>
                    </div>
                </div>
                <div class="result-content">
                    <h4>${data.title}</h4>
                    <p>${data.body}</p>
                </div>
                <div class="result-meta">
                    <span class="meta-tag">User ID: ${data.userId}</span>
                </div>
            </div>
        `;
    } else if (type === 'comments') {
        content = `
            <div class="comment-result">
                <div class="result-header">
                    <span class="result-icon">💬</span>
                    <div>
                        <h3>Comentario</h3>
                        <p>ID: ${data.id}</p>
                    </div>
                </div>
                <div class="result-content">
                    <div class="data-item">
                        <label>Email</label>
                        <strong>${data.email}</strong>
                    </div>
                    <p>${data.body}</p>
                </div>
                <div class="result-meta">
                    <span class="meta-tag">Post ID: ${data.postId}</span>
                </div>
            </div>
        `;
    }
    
    fetchResult.innerHTML = content;
}

// ================================
// CANVAS API
// ================================
const canvas = document.getElementById('myCanvas');
let ctx = null;
if (canvas) {
    ctx = canvas.getContext('2d');
    initCanvas();
}

const drawRectBtn = document.getElementById('drawRect');
const drawCircleBtn = document.getElementById('drawCircle');
const clearCanvasBtn = document.getElementById('clearCanvas');
const colorPicker = document.getElementById('colorPicker');

function initCanvas() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#4ECDC4';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FF6B6B';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
}

if (drawRectBtn) {
    drawRectBtn.addEventListener('click', () => {
        if (!ctx) return;
        
        const x = Math.random() * (canvas.width - 100);
        const y = Math.random() * (canvas.height - 100);
        const width = 50 + Math.random() * 50;
        const height = 50 + Math.random() * 50;
        
        ctx.fillStyle = colorPicker.value;
        ctx.fillRect(x, y, width, height);
        
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.fillText(`Rect (${Math.round(x)}, ${Math.round(y)})`, x + width/2, y - 5);
    });
}

if (drawCircleBtn) {
    drawCircleBtn.addEventListener('click', () => {
        if (!ctx) return;
        
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 20 + Math.random() * 30;
        
        ctx.fillStyle = colorPicker.value;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.fillText(`Circle r=${Math.round(radius)}`, x, y - radius - 5);
    });
}

if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener('click', () => {
        if (!ctx) return;
        
        initCanvas();
        ctx.fillStyle = '#FFD93D';
        ctx.font = '16px Arial';
        ctx.fillText('✅ Canvas limpiado', canvas.width/2, canvas.height/2);
        
        setTimeout(() => {
            initCanvas();
        }, 1500);
    });
}

// ================================
// FUNCIONES DE AYUDA
// ================================
function showLoading(element, message) {
    if (!element) return;
    element.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

function showSuccess(element, message) {
    if (!element) return;
    element.innerHTML = `
        <div class="success-message">
            <span>✅</span>
            <p>${message}</p>
        </div>
    `;
}

function showError(element, message) {
    if (!element) return;
    element.innerHTML = `
        <div class="error-message">
            <span>❌</span>
            <p>${message}</p>
        </div>
    `;
}

function showInfo(element, message) {
    if (!element) return;
    element.innerHTML = `
        <div class="info-message">
            <span>📭</span>
            <p>${message}</p>
        </div>
    `;
}

// ================================
// INICIALIZACIÓN
// ================================
window.addEventListener('DOMContentLoaded', () => {
    // Cargar datos guardados
    const saved = localStorage.getItem('demoData');
    if (saved && storageInput) {
        storageInput.value = saved;
    }
    
    // Configurar cierre de modales
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            overlay.classList.remove('active');
        });
    }
    
    // Agregar estilos para resultados
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            text-align: center;
            padding: 1.5rem;
        }
        
        .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4ECDC4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .success-message, .error-message, .info-message {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 1rem;
            border-radius: 8px;
        }
        
        .success-message {
            background: #E8F5E9;
            color: #2E7D32;
            border-left: 4px solid #4CAF50;
        }
        
        .error-message {
            background: #FFEBEE;
            color: #C62828;
            border-left: 4px solid #F44336;
        }
        
        .info-message {
            background: #FFF3E0;
            color: #EF6C00;
            border-left: 4px solid #FF9800;
        }
        
        .success-result, .user-result, .post-result, .comment-result, .info-result {
            padding: 1rem;
        }
        
        .result-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 1rem;
        }
        
        .result-icon {
            font-size: 2rem;
        }
        
        .result-header h3 {
            margin: 0;
            color: #333;
        }
        
        .result-header p {
            margin: 5px 0 0 0;
            color: #666;
            font-size: 0.9rem;
        }
        
        .result-data {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .data-item {
            margin-bottom: 0.8rem;
        }
        
        .data-item:last-child {
            margin-bottom: 0;
        }
        
        .data-item label {
            display: block;
            color: #666;
            font-size: 0.85rem;
            margin-bottom: 3px;
        }
        
        .data-item strong {
            color: #333;
            font-size: 1.1rem;
        }
        
        .result-content {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .result-content h4 {
            margin: 0 0 0.5rem 0;
            color: #333;
        }
        
        .result-content p {
            margin: 0;
            line-height: 1.5;
        }
        
        .result-meta {
            display: flex;
            gap: 10px;
        }
        
        .meta-tag {
            background: #FF6B6B;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        .map-link {
            display: block;
            text-align: center;
            padding: 10px;
            background: #FF6B6B;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 1rem;
            transition: background 0.3s;
        }
        
        .map-link:hover {
            background: #FF5252;
        }
        
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 0.85rem;
            margin: 0;
        }
        
        .drop-success-message {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #E8F5E9;
            color: #2E7D32;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
            animation: slideIn 0.3s ease;
        }
        
        .drop-success-message span {
            font-size: 1.2rem;
        }
        
        .drop-success-message p {
            margin: 0;
            font-size: 0.9rem;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .data-content {
            font-size: 1.1rem;
            margin: 0.5rem 0;
            color: #333;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Explorador de APIs HTML5 cargado correctamente');
});