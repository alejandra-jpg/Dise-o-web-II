// Estado del formulario
let currentStep = 1;
const totalSteps = 4;
const formData = {};

// Elementos del DOM
const form = document.getElementById('wizardForm');
const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

/**
 * Mostrar paso específico
 */
function showStep(step) {
    steps.forEach((s, index) => {
        s.classList.remove('active');
        if (index + 1 === step) {
            s.classList.add('active');
        }
    });
    
    // Actualizar barra de progreso
    progressSteps.forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 === step) {
            s.classList.add('active');
        }
        if (index + 1 < step) {
            s.classList.add('completed');
        }
    });
    
    // Actualizar botones de navegación
    updateNavigationButtons(step);
    
    // Si estamos en el último paso, mostrar resumen
    if (step === totalSteps) {
        showSummary();
    }
    
    // Hacer scroll al inicio del formulario
    document.querySelector('.wizard-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

/**
 * Actualizar botones de navegación
 */
function updateNavigationButtons(step) {
    prevBtn.style.display = step === 1 ? 'none' : 'flex';
    nextBtn.style.display = step === totalSteps ? 'none' : 'flex';
    submitBtn.style.display = step === totalSteps ? 'flex' : 'none';
    
    // Actualizar texto del botón siguiente
    if (step < totalSteps) {
        nextBtn.innerHTML = `<span>Siguiente</span> <span>→</span>`;
    }
    
    // Actualizar texto del botón anterior
    if (step > 1) {
        prevBtn.innerHTML = `<span>←</span> <span>Anterior</span>`;
    }
}

/**
 * Validar paso actual
 */
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step.active`);
    const inputs = currentStepElement.querySelectorAll('input:not([type="checkbox"]), select, textarea');
    let isValid = true;
    
    // Limpiar errores previos
    currentStepElement.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = '';
        }
    });
    
    currentStepElement.querySelectorAll('input, select, textarea').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Validar campos requeridos
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup?.querySelector('.error-message');
        
        if (input.hasAttribute('required') && !input.value.trim()) {
            if (errorMessage) {
                errorMessage.textContent = 'Este campo es obligatorio';
                formGroup.classList.add('error');
            }
            input.classList.add('invalid');
            isValid = false;
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            if (errorMessage) {
                errorMessage.textContent = 'Por favor, ingresa un email válido';
                formGroup.classList.add('error');
            }
            input.classList.add('invalid');
            isValid = false;
        } else if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
            if (errorMessage) {
                const label = formGroup?.querySelector('label')?.textContent || 'Campo';
                errorMessage.textContent = `Formato de ${label.toLowerCase()} inválido`;
                formGroup.classList.add('error');
            }
            input.classList.add('invalid');
            isValid = false;
        } else if (input.value.trim()) {
            input.classList.add('valid');
        }
    });
    
    // Validar checkboxes de intereses en paso 3
    if (currentStep === 3) {
        const interests = currentStepElement.querySelectorAll('input[name="interests"]:checked');
        const interestsGroup = currentStepElement.querySelector('.checkbox-group')?.closest('.form-group');
        
        if (interestsGroup) {
            const errorMessage = interestsGroup.querySelector('.error-message');
            
            if (interests.length === 0) {
                errorMessage.textContent = 'Selecciona al menos un interés';
                interestsGroup.classList.add('error');
                isValid = false;
            } else {
                errorMessage.textContent = '';
                interestsGroup.classList.remove('error');
            }
        }
    }
    
    // Validar términos en paso 4  
    if (currentStep === 4) {
        const terms = document.getElementById('terms');
        const formGroup = terms?.closest('.form-group');
        
        if (formGroup) {
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (!terms.checked) {
                errorMessage.textContent = 'Debes aceptar los términos y condiciones para continuar';
                formGroup.classList.add('error');
                isValid = false;
            } else {
                errorMessage.textContent = '';
                formGroup.classList.remove('error');
            }
        }
    }
    
    return isValid;
}

/**
 * Guardar datos del paso actual
 */
function saveStepData() {
    const currentStepElement = document.querySelector(`.form-step.active`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox' && input.name === 'interests') {
            if (!formData.interests) formData.interests = [];
            if (input.checked && !formData.interests.includes(input.value)) {
                formData.interests.push(input.value);
            } else if (!input.checked && formData.interests?.includes(input.value)) {
                formData.interests = formData.interests.filter(item => item !== input.value);
            }
        } else if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else if (input.name && input.value) {
            formData[input.name] = input.value.trim();
        }
    });
    
    // Guardar en localStorage
    localStorage.setItem('wizardFormData', JSON.stringify(formData));
}

/**
 * Mostrar resumen
 */
function showSummary() {
    const personalHTML = `
        <p><strong>Nombre:</strong> ${formData.firstName || ''} ${formData.lastName || ''}</p>
        <p><strong>Email:</strong> ${formData.email || ''}</p>
        <p><strong>Teléfono:</strong> ${formData.phone || ''}</p>
    `;
    
    const addressHTML = `
        <p><strong>Dirección:</strong> ${formData.street || ''}</p>
        <p><strong>Ciudad:</strong> ${formData.city || ''}</p>
        <p><strong>Código Postal:</strong> ${formData.zipCode || ''}</p>
        <p><strong>País:</strong> ${formData.country || ''}</p>
    `;
    
    const interestsList = formData.interests?.length 
        ? formData.interests.map(interest => 
            `<span style="background: #e3f2fd; padding: 2px 8px; border-radius: 12px; margin-right: 5px;">${interest}</span>`
          ).join('')
        : 'Ninguno';
    
    const preferencesHTML = `
        <p><strong>Intereses:</strong> ${interestsList}</p>
        <p><strong>Newsletter:</strong> ${formData.newsletter ? 'Sí, deseo recibir noticias' : 'No, gracias'}</p>
        ${formData.comments ? `<p><strong>Comentarios:</strong> <em>"${formData.comments}"</em></p>` : ''}
    `;
    
    document.getElementById('summaryPersonal').innerHTML = personalHTML;
    document.getElementById('summaryAddress').innerHTML = addressHTML;
    document.getElementById('summaryPreferences').innerHTML = preferencesHTML;
}

/**
 * Validar email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Cargar datos guardados
 */
function loadSavedData() {
    try {
        const saved = localStorage.getItem('wizardFormData');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(formData, data);
            
            // Rellenar campos con datos guardados
            Object.keys(data).forEach(key => {
                if (key === 'interests' && Array.isArray(data[key])) {
                    // Manejar checkboxes de intereses
                    data[key].forEach(value => {
                        const checkbox = document.querySelector(`input[name="interests"][value="${value}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                } else {
                    const input = document.querySelector(`[name="${key}"]`);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = Boolean(data[key]);
                        } else {
                            input.value = data[key] || '';
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar datos guardados:', error);
        localStorage.removeItem('wizardFormData');
    }
}

/**
 * Reiniciar formulario
 */
function resetForm() {
    form.reset();
    formData = {};
    currentStep = 1;
    localStorage.removeItem('wizardFormData');
    showStep(currentStep);
}

// Event listeners
nextBtn.addEventListener('click', () => {
    if (validateCurrentStep()) {
        saveStepData();
        currentStep++;
        showStep(currentStep);
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        saveStepData();
        console.log('Formulario enviado con éxito:', formData);
        
        // Mostrar modal de éxito
        successModal.classList.add('active');
        
        // Opcional: Enviar datos al servidor aquí
        // fetch('/api/submit-form', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        
        // Limpiar datos después de 3 segundos
        setTimeout(() => {
            successModal.classList.remove('active');
            resetForm();
        }, 3000);
    }
});

// Cerrar modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        resetForm();
    });
}

// Cerrar modal al hacer clic fuera
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
        resetForm();
    }
});

// Validación en tiempo real para campos de email
document.addEventListener('input', (e) => {
    if (e.target.type === 'email' && e.target.value) {
        const formGroup = e.target.closest('.form-group');
        const errorMessage = formGroup?.querySelector('.error-message');
        
        if (!isValidEmail(e.target.value)) {
            e.target.classList.remove('valid');
            e.target.classList.add('invalid');
            if (errorMessage) {
                errorMessage.textContent = 'Email inválido';
                formGroup.classList.add('error');
            }
        } else {
            e.target.classList.remove('invalid');
            e.target.classList.add('valid');
            if (errorMessage) {
                errorMessage.textContent = '';
                formGroup.classList.remove('error');
            }
        }
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    showStep(currentStep);
    
    // Agregar iconos a los botones si existen
    const addIcons = () => {
        if (prevBtn && !prevBtn.querySelector('span')) {
            prevBtn.innerHTML = `← <span>Anterior</span>`;
        }
        if (nextBtn && !nextBtn.querySelector('span')) {
            nextBtn.innerHTML = `<span>Siguiente</span> →`;
        }
        if (submitBtn && !submitBtn.querySelector('span')) {
            submitBtn.innerHTML = `✓ <span>Enviar Formulario</span>`;
        }
    };
    
    addIcons();
});