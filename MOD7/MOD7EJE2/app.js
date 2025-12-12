// 1. Capturamos los elementos del DOM
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const themeLabel = document.getElementById('theme-label');
const currentThemeSpan = document.getElementById('current-theme');
const currentTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 2. Función para actualizar la UI con el tema
function updateUI(theme) {
    // Actualizar texto del label
    themeLabel.textContent = theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
    currentThemeSpan.textContent = theme === 'dark' ? 'oscuro' : 'claro';
    
    // Actualizar atributo aria para accesibilidad
    toggleSwitch.setAttribute('aria-checked', theme === 'dark');
    
    // Actualizar el título de la página dinámicamente
    document.title = `Theme Switcher - Tema ${theme === 'dark' ? 'Oscuro' : 'Claro'}`;
}

// 3. Función para aplicar el tema
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    toggleSwitch.checked = (theme === 'dark');
    localStorage.setItem('theme', theme);
    updateUI(theme);
}

// 4. Verificamos preferencias al cargar la página
function initializeTheme() {
    // Primero, preferencia guardada en localStorage
    if (currentTheme) {
        console.log(`Tema cargado desde localStorage: ${currentTheme}`);
        applyTheme(currentTheme);
    } 
    // Si no hay preferencia guardada, usar la del sistema
    else if (prefersDarkScheme.matches) {
        console.log(`Usando preferencia del sistema: oscuro`);
        applyTheme('dark');
    }
    // Por defecto, tema claro
    else {
        console.log(`Usando tema por defecto: claro`);
        applyTheme('light');
    }
}

// 5. Función para cambiar el tema
function switchTheme(e) {
    const isChecked = e.target.checked;
    const newTheme = isChecked ? 'dark' : 'light';
    console.log(`Cambiando a tema: ${newTheme}`);
    applyTheme(newTheme);
}

// 6. Escuchar cambios en la preferencia del sistema
prefersDarkScheme.addEventListener('change', (e) => {
    // Solo cambiar si no hay preferencia guardada
    if (!localStorage.getItem('theme')) {
        console.log(`Preferencia del sistema cambiada: ${e.matches ? 'oscuro' : 'claro'}`);
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// 7. Inicializar y añadir event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando sistema de temas...');
    initializeTheme();
    toggleSwitch.addEventListener('change', switchTheme, false);
    
    // Log para debug
    console.log('Sistema de temas inicializado correctamente');
});

// 8. Función para resetear preferencia (útil para desarrollo)
function resetThemePreference() {
    localStorage.removeItem('theme');
    console.log('Preferencia de tema reseteada');
    initializeTheme();
}

// Exportar para consola (solo desarrollo)
if (typeof window !== 'undefined') {
    window.resetThemePreference = resetThemePreference;
}