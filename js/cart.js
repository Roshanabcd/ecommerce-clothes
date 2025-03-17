// Cart functionality
const cartItems = document.querySelector('.cart-items');
const emptyCartMessage = document.querySelector('.empty-cart-message');
const cartContainer = document.querySelector('.cart-container');
const subtotalElement = document.querySelector('.subtotal');
const shippingElement = document.querySelector('.shipping');
const taxElement = document.querySelector('.tax');
const totalElement = document.querySelector('.total-amount');

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Shipping cost
const SHIPPING_COST = 5.99;
const TAX_RATE = 0.08; // 8%

// Update cart display
function updateCartDisplay() {
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContainer.style.display = 'none';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartContainer.style.display = 'flex';
    
    // Clear current cart items
    cartItems.innerHTML = '';
    
    // Add each item to the cart
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity || 1}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotals();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        const quantity = item.quantity || 1;
        return total + (price * quantity);
    }, 0);
    
    const shipping = cart.length > 0 ? SHIPPING_COST : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Event delegation for cart item controls
cartItems.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.index;
    
    if (target.classList.contains('remove-item') || target.parentElement.classList.contains('remove-item')) {
        removeItem(index);
    } else if (target.classList.contains('quantity-btn')) {
        updateQuantity(index, target.classList.contains('plus') ? 1 : -1);
    }
});

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity = (item.quantity || 1) + change;
    
    if (item.quantity < 1) {
        removeItem(index);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Promo code functionality
const promoInput = document.querySelector('.promo-code input');
const promoButton = document.querySelector('.promo-code button');

const promoCodes = {
    'WELCOME10': 0.10,
    'SUMMER20': 0.20,
    'SALE30': 0.30
};

promoButton.addEventListener('click', () => {
    const code = promoInput.value.toUpperCase();
    if (promoCodes[code]) {
        const discount = promoCodes[code];
        applyDiscount(discount);
        showNotification(`Promo code applied! ${discount * 100}% off your order.`);
    } else {
        showNotification('Invalid promo code.', 'error');
    }
});

function applyDiscount(discount) {
    const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
    const discountAmount = subtotal * discount;
    const newTotal = (subtotal - discountAmount + SHIPPING_COST) * (1 + TAX_RATE);
    totalElement.textContent = `$${newTotal.toFixed(2)}`;
}

// Checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    // Here you would typically redirect to a checkout page
    showNotification('Proceeding to checkout...', 'success');
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize cart display
updateCartDisplay(); 