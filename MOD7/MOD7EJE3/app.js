/**
 * Misión 03: Layouts Complejos
 * Control mejorado con efectos visuales adicionales
 */

document.addEventListener('DOMContentLoaded', function() {
    
    const galleryGrid = document.querySelector('.gallery-grid');
    const toggleDenseBtn = document.getElementById('toggleDense');
    const randomizeBtn = document.getElementById('randomize');
    const colorModeBtn = document.getElementById('colorMode');
    const cards = document.querySelectorAll('.card');
    
    // Configuración inicial
    let isDenseMode = true;
    let isColorfulMode = false;
    
    console.log('🚀 Misión 03: Layout Masonry mejorado iniciado');
    console.log('🌈 Colores llamativos activados');
    console.log('📋 Requisitos implementados:');
    console.log('   • grid-template-areas (en header y sección demo) ✓');
    console.log('   • grid-auto-flow: dense (en galería principal) ✓');
    console.log('   • aspect-ratio (4:3, 3:4, 16:9, 1:1) ✓');
    console.log('   • Grid + Flexbox combinados ✓');
    console.log('   • Gradientes animados ✓');
    console.log('   • Transiciones CSS avanzadas ✓');
    
    // Toggle dense mode (REQUERIDO)
    toggleDenseBtn.addEventListener('click', function() {
        isDenseMode = !isDenseMode;
        
        if (isDenseMode) {
            galleryGrid.style.gridAutoFlow = 'dense';
            toggleDenseBtn.textContent = 'Modo Dense: ACTIVADO';
            toggleDenseBtn.classList.add('active');
            console.log('🧩 Modo Dense ACTIVADO');
            console.log('   - Rellena huecos automáticamente');
            console.log('   - Reorganiza elementos para optimizar espacio');
        } else {
            galleryGrid.style.gridAutoFlow = 'row';
            toggleDenseBtn.textContent = 'Modo Dense: DESACTIVADO';
            toggleDenseBtn.classList.remove('active');
            console.log('⬇️  Modo Dense DESACTIVADO');
            console.log('   - Los huecos quedan visibles');
            console.log('   - Elementos en orden secuencial');
        }
    });
    
    // Aleatorizar tamaños (demostración del efecto masonry)
    randomizeBtn.addEventListener('click', function() {
        console.log('🎲 Aleatorizando tamaños de tarjetas...');
        
        const sizeClasses = [
            {class: '', name: 'normal', probability: 0.5},
            {class: 'card-tall', name: 'alta', probability: 0.25},
            {class: 'card-wide', name: 'ancha', probability: 0.15},
            {class: 'card-big', name: 'grande', probability: 0.1}
        ];
        
        let count = {
            normal: 0,
            alta: 0,
            ancha: 0,
            grande: 0
        };
        
        cards.forEach(card => {
            // Remover clases anteriores
            card.classList.remove('card-tall', 'card-wide', 'card-big');
            
            // Determinar tamaño aleatorio según probabilidades
            const random = Math.random();
            let cumulative = 0;
            let selectedClass = '';
            let selectedName = 'normal';
            
            for (const size of sizeClasses) {
                cumulative += size.probability;
                if (random <= cumulative) {
                    selectedClass = size.class;
                    selectedName = size.name;
                    break;
                }
            }
            
            // Aplicar clase si hay una seleccionada
            if (selectedClass) {
                card.classList.add(selectedClass);
                count[selectedName]++;
            } else {
                count.normal++;
            }
        });
        
    
        
        // Efecto visual de confirmación
        randomizeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            randomizeBtn.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Toggle modo colorido
    colorModeBtn.addEventListener('click', function() {
        isColorfulMode = !isColorfulMode;
        
        if (isColorfulMode) {
            document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 50%, #6bcf7f 100%)';
            colorModeBtn.textContent = 'Modo Normal';
            colorModeBtn.style.background = 'linear-gradient(45deg, #2c3e50, #3498db)';
            console.log('🌈 Modo Colorido ACTIVADO');
        } else {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            colorModeBtn.textContent = 'Modo Colorido';
            colorModeBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ffd93d)';
            console.log('🎨 Modo Normal ACTIVADO');
        }
    });
    
    // Efecto de entrada para las tarjetas
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
});