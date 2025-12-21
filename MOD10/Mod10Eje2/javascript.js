// Elementos del DOM
const form = document.getElementById('imcForm');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const resultSection = document.getElementById('resultSection');
const imcValue = document.getElementById('imcValue');
const imcCategory = document.getElementById('imcCategory');
const imcIndicator = document.getElementById('imcIndicator');
const recommendationText = document.getElementById('recommendationText');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Elementos del Modal
const deleteModal = document.getElementById('deleteModal');
const modalContent = document.getElementById('modalContent');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Historial de cálculos
let history = JSON.parse(localStorage.getItem('imcHistory')) || [];

// FUNCIÓN PARA CALCULAR IMC
function calcularIMC(peso, alturaCm) {
    const alturaMetros = alturaCm / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return Math.round(imc * 10) / 10;
}

// Obtener categoría según IMC
function obtenerCategoria(imc) {
    if (imc < 18.5) return {nombre: 'Bajo peso', color: '#3498db'};
    if (imc < 25) return {nombre: 'Normal', color: '#2ecc71'};
    if (imc < 30) return {nombre: 'Sobrepeso', color: '#f39c12'};
    return {nombre: 'Obesidad', color: '#e74c3c'};
}

// Obtener recomendaciones
function obtenerRecomendaciones(categoria) {
    const recomendaciones = {
        'Bajo peso': 'Tu IMC está por debajo del rango saludable. Considera consultar con un nutricionista para desarrollar un plan de alimentación que te ayude a alcanzar un peso saludable de manera segura.',
        'Normal': '¡Felicidades! Tu IMC está en el rango saludable. Continúa con una dieta balanceada y ejercicio regular para mantener tu salud.',
        'Sobrepeso': 'Tu IMC indica sobrepeso. Considera adoptar hábitos más saludables como una dieta equilibrada y actividad física regular. Consulta con un profesional de la salud.',
        'Obesidad': 'Tu IMC indica obesidad. Es importante consultar con un médico o nutricionista para desarrollar un plan personalizado de salud y bienestar.'
    };
    return recomendaciones[categoria] || '';
}

// Posicionar el indicador en la barra
function posicionarIndicador(imc) {
    let posicion = 0;
    
    if (imc <= 18.5) {
        posicion = (imc / 18.5) * 25;
    } else if (imc <= 25) {
        posicion = 25 + ((imc - 18.5) / 6.5) * 25;
    } else if (imc <= 30) {
        posicion = 50 + ((imc - 25) / 5) * 25;
    } else {
        const imcLimitado = Math.min(imc, 50);
        posicion = 75 + ((imcLimitado - 30) / 20) * 25;
    }
    
    posicion = Math.max(0, Math.min(100, posicion));
    
    imcIndicator.style.left = `${posicion}%`;
    imcIndicator.style.display = 'block';
}

// Mostrar resultados
function mostrarResultado(imc) {
    const categoria = obtenerCategoria(imc);
    
    imcValue.textContent = imc.toFixed(1);
    imcCategory.textContent = categoria.nombre;
    imcCategory.style.color = categoria.color;
    
    posicionarIndicador(imc);
    
    recommendationText.textContent = obtenerRecomendaciones(categoria.nombre);
    
    resultSection.style.display = 'block';
    
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

// Guardar en historial
function guardarEnHistorial(peso, altura, imc, categoriaNombre) {
    const nuevoCalculo = {
        peso: peso,
        altura: altura,
        imc: imc.toFixed(1),
        categoria: categoriaNombre,
        fecha: new Date().toLocaleString('es-ES')
    };
    
    history.unshift(nuevoCalculo);
    
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('imcHistory', JSON.stringify(history));
    
    actualizarHistorial();
}

// Actualizar vista del historial
function actualizarHistorial() {
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No hay cálculos previos</p>';
        clearHistoryBtn.style.display = 'none';
        return;
    }
    
    clearHistoryBtn.style.display = 'block';
    
    const historialHTML = history.map(item => {
        const categoria = obtenerCategoria(parseFloat(item.imc));
        return `
            <div class="history-item">
                <div class="history-info">
                    <div>Peso: ${item.peso}kg | Altura: ${item.altura}cm</div>
                    <div class="history-date">${item.fecha}</div>
                </div>
                <div>
                    <div class="history-imc">${item.imc}</div>
                    <div style="color: ${categoria.color}">${item.categoria}</div>
                </div>
            </div>
        `;
    }).join('');
    
    historyList.innerHTML = historialHTML;
}

// Validar formulario
function validarFormulario() {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    
    let esValido = true;
    
    pesoInput.classList.remove('invalid', 'valid');
    alturaInput.classList.remove('invalid', 'valid');
    
    if (!peso || peso < 1 || peso > 300 || isNaN(peso)) {
        pesoInput.classList.add('invalid');
        esValido = false;
    } else {
        pesoInput.classList.add('valid');
    }
    
    if (!altura || altura < 50 || altura > 250 || isNaN(altura)) {
        alturaInput.classList.add('invalid');
        esValido = false;
    } else {
        alturaInput.classList.add('valid');
    }
    
    return esValido;
}

// FUNCIONES DEL MODAL CON ANIMACIONES
function mostrarModal() {
    deleteModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Resetear animación de cierre si existe
    modalContent.classList.remove('closing');
}

function ocultarModalConAnimacion() {
    modalContent.classList.add('closing');
    
    setTimeout(() => {
        deleteModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalContent.classList.remove('closing');
    }, 300); // Duración de la animación de salida
}

function eliminarHistorial() {
    history = [];
    localStorage.removeItem('imcHistory');
    actualizarHistorial();
    ocultarModalConAnimacion();
}

// EVENT LISTENERS

// Al enviar el formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        alert('Por favor, ingresa valores válidos:\n- Peso: entre 1 y 300 kg\n- Altura: entre 50 y 250 cm');
        return;
    }
    
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    
    const imc = calcularIMC(peso, altura);
    const categoria = obtenerCategoria(imc);
    
    mostrarResultado(imc);
    guardarEnHistorial(peso, altura, imc, categoria.nombre);
});

// Mostrar modal al hacer clic en "Limpiar Historial"
clearHistoryBtn.addEventListener('click', mostrarModal);

// Botón Cancelar del modal
cancelDeleteBtn.addEventListener('click', ocultarModalConAnimacion);

// Botón Eliminar del modal
confirmDeleteBtn.addEventListener('click', eliminarHistorial);

// Cerrar modal al hacer clic fuera del contenido
deleteModal.addEventListener('click', function(e) {
    if (e.target === deleteModal) {
        ocultarModalConAnimacion();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && deleteModal.style.display === 'flex') {
        ocultarModalConAnimacion();
    }
});

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    imcIndicator.style.display = 'none';
    actualizarHistorial();
    
    // Valores de ejemplo para prueba
    pesoInput.value = '70';
    alturaInput.value = '170';
});