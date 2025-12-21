
const products = [
    { 
        id: 1, 
        name: "MacBook Air M2 2023", 
        category: "electronics", 
        price: 999, 
        rating: 5,
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 2, 
        name: "Sudadera Oversize Premium", 
        category: "clothing", 
        price: 45, 
        rating: 4,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 3, 
        name: "Cafetera Espresso Automática", 
        category: "home", 
        price: 120, 
        rating: 4,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwbWFjaGluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 4, 
        name: "Teclado Mecánico RGB Gaming", 
        category: "electronics", 
        price: 85, 
        rating: 5,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 5, 
        name: "Pantalón Denim Slim Fit", 
        category: "clothing", 
        price: 60, 
        rating: 3,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 6, 
        name: "Lámpara de Pie Moderna", 
        category: "home", 
        price: 35, 
        rating: 2,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvb3IlMjBsYW1wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 7, 
        name: "iPhone 15 Pro Max", 
        category: "electronics", 
        price: 800, 
        rating: 5,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 8, 
        name: "Zapatillas Running Ultra Boost", 
        category: "clothing", 
        price: 110, 
        rating: 4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 9, 
        name: "Set de Cuchillos Profesional", 
        category: "home", 
        price: 75, 
        rating: 3,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a25pZmUlMjBzZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 10, 
        name: "Monitor 4K Curvo Gaming", 
        category: "electronics", 
        price: 400, 
        rating: 4,
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 11, 
        name: "Camisa Casual Algodón", 
        category: "clothing", 
        price: 35, 
        rating: 4,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 12, 
        name: "Sofá Moderno 3 Plazas", 
        category: "home", 
        price: 550, 
        rating: 5,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
];

// Configuración de visualización
const ITEMS_PER_PAGE = 6; // Aumentado para mostrar más productos

// Referencias al DOM
const form = document.getElementById('filterForm');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const pageInfo = document.getElementById('pageInfo');
const priceLabel = document.getElementById('priceLabel');

/**
 * 2. FUNCIÓN DEBOUNCE
 */
function debounce(func, delay = 400) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 3. ACTUALIZAR URL Y ESTADO
 */
function syncFiltersToURL() {
    const formData = new FormData(form);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
        if (value && value !== "0") {
            params.set(key, value);
        }
    });

    params.set('page', '1');
    const newRelativePathQuery = window.location.pathname + '?' + params.toString();
    window.history.pushState(null, '', newRelativePathQuery);

    render();
}

/**
 * 4. FUNCIÓN PRINCIPAL DE RENDERIZADO
 */
function render() {
    // Leer filtros desde la URL
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q')?.toLowerCase() || "";
    const category = params.get('category') || "";
    const maxPrice = parseInt(params.get('maxPrice')) || 1000;
    const rating = parseInt(params.get('rating')) || 0;
    let page = parseInt(params.get('page')) || 1;

    // Filtrar productos
    const filtered = products.filter(item => {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = category === "" || item.category === category;
        const matchesPrice = item.price <= maxPrice;
        const matchesRating = item.rating >= rating;
        return matchesName && matchesCategory && matchesPrice && matchesRating;
    });

    // Lógica de Paginación
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (page > totalPages) page = totalPages;
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const itemsToShow = filtered.slice(start, end);

    // Inyectar HTML de las tarjetas con imágenes
    if (itemsToShow.length > 0) {
        resultsGrid.innerHTML = itemsToShow.map(p => `
            <article class="card">
                <img src="${p.image}" alt="${p.name}" class="card-image" loading="lazy">
                <div class="card-content">
                    <h4>${p.name}</h4>
                    <p><strong>Precio:</strong> $${p.price}</p>
                    <p><small>Categoría: ${getCategoryName(p.category)}</small></p>
                    <div class="rating">
                        ${generateStars(p.rating)}
                        <span style="margin-left: 8px;">${p.rating}/5</span>
                    </div>
                </div>
            </article>
        `).join('');
    } else {
        resultsGrid.innerHTML = `
            <div class="no-results">
                <h3>¡Ups! No encontramos productos</h3>
                <p>Intenta con otros filtros o ajusta el precio máximo</p>
                <button id="clearFiltersBtn" class="btn-secondary" style="margin-top: 20px; width: auto;">
                    Limpiar todos los filtros
                </button>
            </div>
        `;
        
        // Agregar evento al botón dentro del mensaje
        document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
            form.reset();
            window.history.pushState(null, '', window.location.pathname);
            render();
        });
    }

    // Actualizar textos de la interfaz
    resultsCount.innerText = `✨ ${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    pageInfo.innerText = `📄 Página ${page} de ${totalPages}`;
    
    // Controlar estado de botones de paginación
    document.getElementById('prevBtn').disabled = (page <= 1);
    document.getElementById('nextBtn').disabled = (page >= totalPages);

    // Actualizar el label del precio
    priceLabel.innerText = `$${maxPrice}`;
}

/**
 * Función auxiliar para generar estrellas
 */
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

/**
 * Función para obtener nombre de categoría
 */
function getCategoryName(category) {
    const categories = {
        'electronics': 'Electrónica',
        'clothing': 'Ropa',
        'home': 'Hogar'
    };
    return categories[category] || category;
}

/**
 * 5. GESTIÓN DE EVENTOS
 */

// Evento para el campo de texto con Debounce
const handleSearchInput = debounce(() => syncFiltersToURL());
document.getElementById('search').addEventListener('input', handleSearchInput);

// Evento para cambios en Selects, Ranges y Radios
form.addEventListener('change', (e) => {
    if (e.target.id !== 'search') {
        syncFiltersToURL();
    }
});

// Actualizar label del precio en tiempo real
document.getElementById('maxPrice').addEventListener('input', (e) => {
    priceLabel.innerText = `$${e.target.value}`;
});

// Eventos de Paginación
function changePage(offset) {
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get('page')) || 1;
    params.set('page', currentPage + offset);
    
    window.history.pushState(null, '', `?${params.toString()}`);
    render();
}

document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
document.getElementById('nextBtn').addEventListener('click', () => changePage(1));

// Botón Limpiar
document.getElementById('clearBtn').addEventListener('click', () => {
    form.reset();
    priceLabel.innerText = '$1000';
    window.history.pushState(null, '', window.location.pathname);
    render();
});

/**
 * 6. INICIALIZACIÓN
 */
window.addEventListener('popstate', render);

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        const input = form.elements[key];
        if (input) {
            if (input.type === 'radio') {
                if (input.value === value) input.checked = true;
            } else {
                input.value = value;
            }
        }
    });
    render();
});