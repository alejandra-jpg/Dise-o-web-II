// Base de datos de productos
const products = [
    {
        id: 1,
        name: 'Laptop Pro',
        price: 12999,
        description: 'Laptop de alto rendimiento',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        stock: 5
    },
    {
        id: 2,
        name: 'Smartphone',
        price: 8999,
        description: 'Teléfono inteligente de última generación',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
        stock: 10
    },
    {
        id: 3,
        name: 'Auriculares',
        price: 2499,
        description: 'Auriculares inalámbricos con cancelación de ruido',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        stock: 15
    },
    {
        id: 4,
        name: 'Tablet',
        price: 6999,
        description: 'Tablet de 10 pulgadas',
        image: 'https://images.unsplash.com/photo-1546054450-5cf5d3d47d0c?w=400&h=300&fit=crop',
        stock: 8
    },
    {
        id: 5,
        name: 'Smartwatch',
        price: 4999,
        description: 'Reloj inteligente con GPS',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
        stock: 12
    },
    {
        id: 6,
        name: 'Cámara',
        price: 15999,
        description: 'Cámara profesional 4K',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
        stock: 3
    },
    {
        id: 7,
        name: 'Monitor 4K',
        price: 8999,
        description: 'Monitor 27" 4K UHD',
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=300&fit=crop',
        stock: 7
    },
    {
        id: 8,
        name: 'Teclado Mecánico',
        price: 1999,
        description: 'Teclado RGB mecánico',
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
        stock: 20
    },
    {
        id: 9,
        name: 'Mouse Gaming',
        price: 1499,
        description: 'Mouse inalámbrico para gaming',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
        stock: 15
    },
    {
        id: 10,
        name: 'Bocina Bluetooth',
        price: 2999,
        description: 'Bocina portátil con 20h de batería',
        image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=300&fit=crop',
        stock: 10
    },
    {
        id: 11,
        name: 'Power Bank',
        price: 1299,
        description: 'Batería externa 20000mAh',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        stock: 25
    },
    {
        id: 12,
        name: 'Drone',
        price: 18999,
        description: 'Drone con cámara 4K',
        image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
        stock: 4
    },
    {
        id: 13,
        name: 'Consola Gaming',
        price: 14999,
        description: 'Consola de última generación',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
        stock: 6
    },
    {
        id: 14,
        name: 'Impresora',
        price: 4999,
        description: 'Impresora multifuncional',
        image: 'https://images.unsplash.com/photo-1592496006967-a59111444e84?w=400&h=300&fit=crop',
        stock: 9
    },
    {
        id: 15,
        name: 'Router WiFi 6',
        price: 3499,
        description: 'Router de alta velocidad',
        image: 'https://images.unsplash.com/photo-1597910037297-5e4a6bf4bcb7?w=400&h=300&fit=crop',
        stock: 12
    }
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSummary = document.getElementById('cartSummary');
const subtotal = document.getElementById('subtotal');
const tax = document.getElementById('tax');
const shipping = document.getElementById('shipping');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const confirmModal = document.getElementById('confirmModal');
const orderTotal = document.getElementById('orderTotal');
const clearCartModal = document.getElementById('clearCartModal');

const SHIPPING_COST = 50;
const TAX_RATE = 0.16;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCart();
    updateCartCount();
    
    // Event Listeners
    checkoutBtn.addEventListener('click', checkout);
    
    // Event listeners para vaciar carrito
    clearCartBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('El carrito ya está vacío', 'warning');
            return;
        }
        clearCartModal.classList.add('active');
    });
    
    // Cerrar modal de vaciar carrito al hacer clic fuera
    clearCartModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeClearCartModal();
        }
    });
    
    // Cerrar modal de checkout al hacer clic fuera
    confirmModal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
});

/**
 * Renderizar productos en el catálogo
 */
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stockClass = product.stock < 5 ? 'low' : '';
        const stockText = product.stock < 5 ? `¡Solo ${product.stock} disponibles!` : `${product.stock} disponibles`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toLocaleString()}</p>
                <p class="product-stock ${stockClass}">${stockText}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

/**
 * Añadir producto al carrito
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product || product.stock === 0) {
        showNotification('Producto no disponible', 'warning');
        return;
    }
    
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Verificar stock
        if (existingItem.quantity >= product.stock) {
            showNotification(`No hay más stock disponible de ${product.name}`, 'warning');
            return;
        }
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    renderCart();
    updateCartCount();
    
    // Animación del icono del carrito
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 300);
    
    showNotification(`${product.name} añadido al carrito`, 'success');
}

/**
 * Renderizar carrito
 */
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartItems.innerHTML = '';
    cartSummary.style.display = 'block';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    updateTotals();
}

/**
 * Aumentar cantidad
 */
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem.quantity >= product.stock) {
        showNotification(`No hay más stock disponible de ${product.name}`, 'warning');
        return;
    }
    
    cartItem.quantity++;
    saveCart();
    renderCart();
    updateCartCount();
}

/**
 * Disminuir cantidad
 */
function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        removeFromCart(productId);
        return;
    }
    
    saveCart();
    renderCart();
    updateCartCount();
}

/**
 * Eliminar producto del carrito
 */
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
    
    showNotification(`${item.name} eliminado del carrito`, 'success');
}

/**
 * Actualizar totales
 */
function updateTotals() {
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * TAX_RATE;
    const shippingAmount = cart.length > 0 ? SHIPPING_COST : 0;
    const totalAmount = subtotalAmount + taxAmount + shippingAmount;
    
    subtotal.textContent = `$${subtotalAmount.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    tax.textContent = `$${taxAmount.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    shipping.textContent = `$${shippingAmount.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    total.textContent = `$${totalAmount.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
}

/**
 * Actualizar contador del carrito
 */
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

/**
 * Guardar carrito en localStorage
 */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Cerrar modal de vaciar carrito
 */
function closeClearCartModal() {
    clearCartModal.classList.remove('active');
}

/**
 * Confirmar vaciar carrito
 */
function confirmClearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    closeClearCartModal();
    
    showNotification('Carrito vaciado correctamente', 'success');
}

/**
 * Realizar checkout
 */
function checkout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'warning');
        return;
    }
    
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * TAX_RATE;
    const finalTotal = subtotalAmount + taxAmount + SHIPPING_COST;
    
    // Mostrar modal de confirmación
    orderTotal.textContent = `$${finalTotal.toLocaleString('es-MX', {minimumFractionDigits: 2})}`;
    confirmModal.classList.add('active');
    
    // Limpiar carrito después del pedido
    setTimeout(() => {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
    }, 500);
}

/**
 * Cerrar modal de checkout
 */
function closeModal() {
    confirmModal.classList.remove('active');
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'success') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    let icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
    `;
    
    // Establecer color según tipo
    if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}