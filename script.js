// ... (массив products остается прежним)

// Улучшенная функция открытия модалки
window.openModal = function(index) {
    currentProduct = products[index];
    currentImgIdx = 0;
    
    const modal = document.getElementById('productModal');
    const content = modal.querySelector('div'); // Берем внутренний контейнер
    
    document.getElementById('modalTitle').innerText = currentProduct.ref;
    document.getElementById('modalPrice').innerText = currentProduct.price;
    document.getElementById('modalDesc').innerText = currentProduct.desc;
    document.getElementById('modalSize').innerText = currentProduct.size;
    
    updateSlider();
    
    modal.style.display = 'flex';
    content.classList.add('animate-modal'); // Добавляем анимацию
};

// Плавное закрытие
window.closeModal = function() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.querySelector('div').classList.remove('animate-modal');
};

// Анимация корзины
window.toggleCart = function() {
    const s = document.getElementById('cartSidebar');
    const content = s.querySelector('div');
    
    if (s.style.display === 'none' || s.style.display === '') {
        s.style.display = 'flex';
        content.classList.add('animate-slide');
    } else {
        // Небольшая задержка перед скрытием, чтобы анимация могла бы проиграться (опционально)
        s.style.display = 'none';
        content.classList.remove('animate-slide');
    }
};

// Эффект "вспышки" при добавлении в корзину
window.addToCart = function() {
    if (!currentProduct) return;
    
    cart.push({ ...currentProduct, cartId: Date.now() });
    updateCartUI();
    
    // Анимируем счетчик корзины
    const count = document.getElementById('cart-count');
    count.style.color = '#fff';
    count.classList.add('scale-150');
    
    setTimeout(() => {
        closeModal();
        toggleCart();
        count.classList.remove('scale-150');
    }, 200);
};

// Красивое появление чекаута
window.openCheckout = function() {
    if (cart.length === 0) return;
    const checkout = document.getElementById('checkoutModal');
    checkout.style.display = 'flex';
    checkout.querySelector('div').classList.add('animate-modal');
    
    document.getElementById('finalPrice').innerText = document.getElementById('cart-total').innerText;
    // Закрываем корзину без анимации, чтобы не перегружать экран
    document.getElementById('cartSidebar').style.display = 'none';
};

// ... (остальные функции processPayment и т.д. остаются без изменений)
