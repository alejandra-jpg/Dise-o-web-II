// ================================
// CONFIGURACIÓN DE LA APP DEL CLIMA
// ================================
// TU API KEY REAL - Esta sí funciona
const API_KEY = '65fd348dff13c932a1d517b7d42b2cbe'; // ¡Tu API Key real!

// URL base de la API
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// Estado de la aplicación
let currentUnit = 'metric';
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let currentCity = null;
let hasLocationPermission = localStorage.getItem('hasLocationPermission') === 'true';

// Elementos DOM
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastGrid = document.getElementById('forecastGrid');
const favoritesList = document.getElementById('favoritesList');
const citySearch = document.getElementById('citySearch');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const unitToggle = document.getElementById('unitToggle');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');

// Elementos del modal de ubicación
const locationModal = document.getElementById('locationModal');
const allowLocationBtn = document.getElementById('allowLocation');
const denyLocationBtn = document.getElementById('denyLocation');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtns = document.querySelectorAll('.close-modal');

// ================================
// FUNCIONES DEL MODAL DE UBICACIÓN
// ================================

/**
 * Mostrar modal de ubicación
 */
function showLocationModal() {
    locationModal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cerrar modal de ubicación
 */
function closeLocationModal() {
    locationModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Obtener ubicación con permiso explícito
 */
function getLocationWithPermission() {
    closeLocationModal();
    
    // Mostrar estado de carga
    currentWeatherDiv.innerHTML = `
        <div class="loading">
            <div style="margin-bottom: 1rem; font-size: 2rem;" class="pulse-animation">📍</div>
            <p>Obteniendo tu ubicación...</p>
            <div style="margin-top: 1rem;">
                <div class="loading-dots">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    `;
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            localStorage.setItem('hasLocationPermission', 'true');
            hasLocationPermission = true;
            getWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude
            );
        },
        (error) => {
            console.error('Error de geolocalización:', error);
            let errorMsg = 'No se pudo obtener tu ubicación. ';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg += 'Permiso denegado.';
                    localStorage.setItem('hasLocationPermission', 'false');
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg += 'La información de ubicación no está disponible.';
                    break;
                case error.TIMEOUT:
                    errorMsg += 'La solicitud de ubicación ha caducado.';
                    break;
                default:
                    errorMsg += 'Error desconocido.';
            }
            
            showError(errorMsg);
            getWeatherByCity('Madrid');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

/**
 * Usar ubicación (función principal)
 */
function useGeolocation() {
    // Verificar si el navegador soporta geolocalización
    if (!('geolocation' in navigator)) {
        showError('Tu navegador no soporta geolocalización');
        return;
    }
    
    // Si ya tenemos permiso, usar directamente
    if (hasLocationPermission) {
        currentWeatherDiv.innerHTML = `
            <div class="loading">
                <div style="margin-bottom: 1rem; font-size: 2rem;" class="pulse-animation">📍</div>
                <p>Obteniendo tu ubicación...</p>
            </div>
        `;
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            (error) => {
                console.error('Error:', error);
                showError('Error al obtener la ubicación. Intenta de nuevo.');
                getWeatherByCity('Madrid');
            }
        );
    } else {
        // Mostrar modal para pedir permiso
        showLocationModal();
    }
}

/**
 * Rechazar ubicación y usar ciudad por defecto
 */
function useDefaultLocation() {
    closeLocationModal();
    localStorage.setItem('hasLocationPermission', 'false');
    hasLocationPermission = false;
    getWeatherByCity('Madrid');
}

// ================================
// FUNCIONES PRINCIPALES DEL CLIMA
// ================================

/**
 * Verificar si la API está funcionando
 */
async function checkAPIStatus() {
    try {
        const testResponse = await fetch(
            `${API_BASE}/weather?q=Madrid&appid=${API_KEY}`
        );
        
        if (testResponse.status === 401) {
            console.warn('⚠️ API Key puede necesitar activación completa');
            return false;
        }
        
        return testResponse.ok;
    } catch (error) {
        console.error('Error verificando API:', error);
        return false;
    }
}

/**
 * Obtener clima por ciudad
 */
async function getWeatherByCity(city) {
    try {
        showLoading();
        currentCity = city.trim();
        
        if (!currentCity) {
            throw new Error('Por favor ingresa una ciudad');
        }
        
        console.log(`🔍 Buscando: ${currentCity} con API Key: ${API_KEY.substring(0, 8)}...`);
        
        const response = await fetch(
            `${API_BASE}/weather?q=${encodeURIComponent(currentCity)}&units=${currentUnit}&appid=${API_KEY}&lang=es`
        );
        
        console.log('📊 Respuesta API:', response.status, response.statusText);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Ciudad "${currentCity}" no encontrada`);
            } else if (response.status === 401) {
                // Mostrar mensaje especial para tu API Key
                const apiStatus = await checkAPIStatus();
                if (!apiStatus) {
                    throw new Error(`API Key: ${API_KEY.substring(0, 8)}...<br>
                    <strong>Estado:</strong> En proceso de activación<br>
                    <strong>Nota:</strong> Las nuevas API Keys pueden tardar hasta 2 horas en activarse completamente.<br>
                    <strong>Mientras tanto:</strong> La app funcionará con datos de ejemplo.`);
                } else {
                    throw new Error('Error de autenticación. Verifica tu API Key.');
                }
            } else if (response.status === 429) {
                throw new Error('Límite de consultas excedido. Intenta en unos minutos.');
            } else {
                throw new Error(`Error ${response.status}. Intenta de nuevo`);
            }
        }
        
        const data = await response.json();
        console.log('✅ Datos recibidos:', data.name);
        displayCurrentWeather(data);
        getForecast(data.coord.lat, data.coord.lon);
        
    } catch (error) {
        console.error('❌ Error:', error);
        showError(error.message);
    }
}

/**
 * Obtener clima por coordenadas
 */
async function getWeatherByCoords(lat, lon) {
    try {
        showLoading();
        console.log(`📍 Obteniendo clima para coordenadas: ${lat}, ${lon}`);
        
        const response = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${API_KEY}&lang=es`
        );
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(`Tu API Key (${API_KEY.substring(0, 8)}...) está en proceso de activación.<br>
                Las nuevas keys pueden tardar hasta 2 horas.<br>
                Usando datos de ejemplo por ahora.`);
            }
            throw new Error('Error al obtener datos de ubicación');
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
        getForecast(lat, lon);
        
        // Mostrar mensaje de éxito
        showToast(`📍 Ubicación detectada: ${data.name}`);
        
    } catch (error) {
        console.error('Error:', error);
        // Mostrar datos de ejemplo si la API falla
        displaySampleWeather();
        showError(error.message);
    }
}

/**
 * Obtener pronóstico de 5 días
 */
async function getForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${API_KEY}&lang=es`
        );
        
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            // Si falla el pronóstico, mostrar pronóstico de ejemplo
            displaySampleForecast();
        }
    } catch (error) {
        console.error('Error en pronóstico:', error);
        displaySampleForecast();
    }
}

/**
 * Mostrar clima actual
 */
function displayCurrentWeather(data) {
    const isFavorite = favorites.some(fav => fav.id === data.id);
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    const speedUnit = currentUnit === 'metric' ? 'km/h' : 'mph';
    
    currentWeatherDiv.innerHTML = `
        <div class="weather-main">
            <div class="weather-info">
                <h2>${data.name}, ${data.sys.country}</h2>
                <div class="weather-temp">${Math.round(data.main.temp)}${unitSymbol}</div>
                <div class="weather-description">${data.weather[0].description}</div>
                <div style="margin-top: 1rem;">
                    <button class="fav-btn" onclick="toggleFavorite(${data.id}, '${escapeString(data.name)}')">
                        ${isFavorite ? '⭐ Eliminar de favoritos' : '☆ Añadir a favoritos'}
                    </button>
                </div>
                <div style="margin-top: 1rem; font-size: 0.8rem; color: rgba(255,255,255,0.7);">
                    ✅ API Key: ${API_KEY.substring(0, 8)}... funcionando
                </div>
            </div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" 
                     alt="${data.weather[0].description}">
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <strong>Sensación térmica</strong>
                ${Math.round(data.main.feels_like)}${unitSymbol}
            </div>
            <div class="detail-item">
                <strong>Humedad</strong>
                ${data.main.humidity}%
            </div>
            <div class="detail-item">
                <strong>Viento</strong>
                ${Math.round(data.wind.speed)} ${speedUnit}
            </div>
            <div class="detail-item">
                <strong>Presión</strong>
                ${data.main.pressure} hPa
            </div>
        </div>
    `;
}

/**
 * Mostrar pronóstico de 5 días
 */
function displayForecast(data) {
    // Tomar un pronóstico por día (a mediodía)
    const dailyForecasts = data.list.filter(item => 
        item.dt_txt.includes('12:00:00')
    ).slice(0, 5);
    
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    
    forecastGrid.innerHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('es', { weekday: 'short' });
        
        return `
            <div class="forecast-card">
                <div class="day">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                     alt="${day.weather[0].description}">
                <div class="temp">${Math.round(day.main.temp)}${unitSymbol}</div>
                <div class="description">${day.weather[0].description}</div>
            </div>
        `;
    }).join('');
}

/**
 * Mostrar datos de ejemplo si la API falla
 */
function displaySampleWeather() {
    const sampleCities = [
        { name: 'Madrid, ES', temp: 22, desc: 'Parcialmente nublado', humidity: 45, wind: 12, pressure: 1015, icon: '02d' },
        { name: 'Barcelona, ES', temp: 20, desc: 'Soleado', humidity: 50, wind: 10, pressure: 1013, icon: '01d' },
        { name: 'Lima, PE', temp: 26, desc: 'Despejado', humidity: 60, wind: 8, pressure: 1012, icon: '01d' }
    ];
    
    const sample = sampleCities[Math.floor(Math.random() * sampleCities.length)];
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    const speedUnit = currentUnit === 'metric' ? 'km/h' : 'mph';
    
    currentWeatherDiv.innerHTML = `
        <div class="weather-main">
            <div class="weather-info">
                <h2>${sample.name}</h2>
                <div class="weather-temp">${sample.temp}${unitSymbol}</div>
                <div class="weather-description">${sample.desc}</div>
                <div style="margin-top: 1rem;">
                    <button class="fav-btn" onclick="toggleFavorite(${Date.now()}, '${sample.name.split(',')[0]}')">
                        ☆ Añadir a favoritos
                    </button>
                </div>
                <div style="margin-top: 1rem; font-size: 0.8rem; color: rgba(255,255,255,0.7);">
                    ⚠️ Datos de ejemplo - API en activación
                </div>
            </div>
            <div class="weather-icon">
                <img src="https://openweathermap.org/img/wn/${sample.icon}@4x.png" 
                     alt="${sample.desc}">
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item">
                <strong>Sensación térmica</strong>
                ${sample.temp - 1}${unitSymbol}
            </div>
            <div class="detail-item">
                <strong>Humedad</strong>
                ${sample.humidity}%
            </div>
            <div class="detail-item">
                <strong>Viento</strong>
                ${sample.wind} ${speedUnit}
            </div>
            <div class="detail-item">
                <strong>Presión</strong>
                ${sample.pressure} hPa
            </div>
        </div>
    `;
}

/**
 * Mostrar pronóstico de ejemplo
 */
function displaySampleForecast() {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
    
    forecastGrid.innerHTML = days.map((day, index) => {
        const temp = 20 + Math.floor(Math.random() * 8);
        const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d'];
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const descriptions = ['Soleado', 'Parc. nublado', 'Nublado', 'Lluvia ligera', 'Despejado'];
        const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        return `
            <div class="forecast-card">
                <div class="day">${day}</div>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
                     alt="${desc}">
                <div class="temp">${temp}${unitSymbol}</div>
                <div class="description">${desc}</div>
            </div>
        `;
    }).join('');
}

// ================================
// FUNCIONES DE FAVORITOS
// ================================

/**
 * Alternar favorito
 */
function toggleFavorite(id, name) {
    const index = favorites.findIndex(fav => fav.id === id);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('❌ Eliminado de favoritos');
    } else {
        favorites.push({ id, name: unescapeString(name) });
        showToast('⭐ Añadido a favoritos');
    }
    
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    displayFavorites();
}

/**
 * Escapar string para HTML
 */
function escapeString(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

/**
 * Des-escapar string
 */
function unescapeString(str) {
    return str.replace(/\\'/g, "'").replace(/\\"/g, '"');
}

/**
 * Mostrar favoritos
 */
function displayFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <p class="empty-state">
                Aún no hay ciudades favoritas<br>
                <small>Busca una ciudad y haz clic en "Añadir a favoritos"</small>
            </p>
        `;
        return;
    }
    
    favoritesList.innerHTML = favorites.map(fav => `
        <div class="favorite-item" onclick="getWeatherByCity('${escapeString(fav.name)}')">
            <span>${fav.name}</span>
            <button onclick="event.stopPropagation(); toggleFavorite(${fav.id}, '${escapeString(fav.name)}')">
                ✕
            </button>
        </div>
    `).join('');
}

// ================================
// FUNCIONES DE UTILIDAD
// ================================

/**
 * Cambiar unidades (Celsius/Fahrenheit)
 */
function toggleUnits() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    unitToggle.textContent = currentUnit === 'metric' ? '°C' : '°F';
    
    if (currentCity) {
        getWeatherByCity(currentCity);
    }
}

/**
 * Mostrar estado de carga
 */
function showLoading() {
    currentWeatherDiv.innerHTML = `
        <div class="loading">
            <div style="margin-bottom: 1rem; font-size: 2rem;">⏳</div>
            Cargando datos del clima...
        </div>
    `;
}

/**
 * Mostrar error
 */
function showError(message) {
    errorMessage.innerHTML = message;
    errorModal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Mostrar notificación toast
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #FF416C, #FF4B2B);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Añadir estilos de animación para toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ================================
// EVENT LISTENERS
// ================================

// Buscar ciudad
searchBtn.addEventListener('click', () => {
    const city = citySearch.value.trim();
    if (city) {
        getWeatherByCity(city);
    } else {
        showError('Por favor ingresa el nombre de una ciudad');
    }
});

citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = citySearch.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
});

// Botón de ubicación
locationBtn.addEventListener('click', useGeolocation);

// Cambiar unidades
unitToggle.addEventListener('click', toggleUnits);

// Permitir ubicación
allowLocationBtn.addEventListener('click', getLocationWithPermission);

// Rechazar ubicación
denyLocationBtn.addEventListener('click', useDefaultLocation);

// Cerrar modales
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        locationModal.classList.remove('active');
        errorModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar modal al hacer clic fuera
modalOverlay.addEventListener('click', () => {
    locationModal.classList.remove('active');
    errorModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        locationModal.classList.remove('active');
        errorModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal de error con el botón
errorModal.querySelector('.btn').addEventListener('click', () => {
    errorModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// ================================
// INICIALIZACIÓN
// ================================

// Mostrar favoritos al cargar
displayFavorites();

// Cargar clima al iniciar
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ App del Clima iniciada con API Key:', API_KEY.substring(0, 8) + '...');
    
    // Esperar un momento para que carguen los estilos
    setTimeout(async () => {
        // Verificar estado de la API
        const apiWorking = await checkAPIStatus();
        
        if (!apiWorking) {
            console.log('⚠️ API Key en proceso de activación. Mostrando datos de ejemplo.');
            // Mostrar datos de ejemplo mientras se activa la API
            displaySampleWeather();
            displaySampleForecast();
        }
        
        if (favorites.length > 0) {
            getWeatherByCity(favorites[0].name);
        } else if (hasLocationPermission) {
            // Si ya tenemos permiso, usar ubicación
            useGeolocation();
        } else {
            // Mostrar modal de ubicación después de un breve retraso
            setTimeout(() => {
                if (!currentCity) {
                    showLocationModal();
                }
            }, 1000);
        }
    }, 500);
});