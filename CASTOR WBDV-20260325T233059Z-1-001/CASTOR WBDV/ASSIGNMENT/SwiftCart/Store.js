let cart = [];
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');

// --- CART LOGIC ---
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // We check if it's a product button and not the tracking button
        if (button.id !== 'track-btn') {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            cart.push({ name, price });
            updateCartUI();
            // ALERT REMOVED FROM HERE
        }
    });
});

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span> <span>P ${item.price.toFixed(2)}</span>`;
        cartItems.appendChild(li);
        total += item.price;
    });
    cartTotal.innerText = total.toFixed(2);
}

// --- MODAL CONTROLS ---
document.getElementById('cart-btn').onclick = () => cartModal.style.display = 'flex';
document.getElementById('close-cart').onclick = () => cartModal.style.display = 'none';

document.getElementById('checkout-btn').onclick = () => {
    if(cart.length === 0) return alert("Cart is empty!");
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
    document.getElementById('checkout-items').innerHTML = document.getElementById('cart-items').innerHTML;
    document.getElementById('checkout-total').innerText = document.getElementById('cart-total').innerText;
};

document.getElementById('close-checkout').onclick = () => checkoutModal.style.display = 'none';

// --- PAYMENT LOGIC ---
document.getElementById('payment-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Purchase successful! Thank you for shopping with SwiftCart.");
    cart = [];
    updateCartUI();
    checkoutModal.style.display = 'none';
};

// Global close handler
window.onclick = (event) => {
    if (event.target == cartModal) cartModal.style.display = "none";
    if (event.target == checkoutModal) checkoutModal.style.display = "none";
    if (event.target == document.getElementById('track-modal')) document.getElementById('track-modal').style.display = "none";
}