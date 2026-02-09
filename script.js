// База данных для модального окна (данные должны совпадать с твоим HTML)
const products = [
    { 
        id: 0, 
        ref: '"Blackline" Waxed jeans', 
        price: '35€', 
        desc: 'Custom waxed denim with reinforced stitching and industrial hardware.',
        size: 'W30 L32 | Waist: 40cm, Length: 105cm, Leg Opening: 19cm',
        images: ['https://i.postimg.cc/fbFp49Fc/Photoroom-20260130-225625.jpg', 'https://i.postimg.cc/tTnTyFgZ/Photoroom-20260130-225839.jpg', 'https://i.postimg.cc/RV4MpkwV/Photoroom-20260130-225800.jpg'] 
    },
    { 
        id: 1, 
        ref: 'Boots', 
        price: '30€', 
        desc: 'Military-inspired boots, heavy duty sole, distressed leather finish.',
        size: '42 EU | Insole length: 27.5cm',
        images: ['https://i.postimg.cc/0NdnnJvk/Photoroom-20260128-141222.jpg', 'https://i.postimg.cc/2jXw0Dsw/Photoroom-20260128-141126.jpg','https://i.postimg.cc/GpQPGwPk/Photoroom-20260128-141154.jpg'] 
    },
    { 
        id: 2, 
        ref: 'Cross hat', 
        price: '10€', 
        desc: 'Сделана из приятной вязаной ткани с нашитым крестом.', 
        size: 'One Size', 
        images: ['https://i.postimg.cc/4d25BspB/Photoroom-20260121-135030.jpg'] 
    },
    { 
        id: 3, 
        ref: 'Leather portmone', 
        price: '11€', 
        desc: 'Натуральная синяя кожа, приятная на ощупь.', 
        size: 'One Size', 
        images: ['https://i.postimg.cc/gk710jHf/Photoroom-20260207-162916.jpg'] 
    }
    // Сюда можно дописать остальные UNIT_05 и т.д., чтобы они открывались
];

let cart = [];
let currentProduct = null;
let currentImgIdx = 0;

// ОТКРЫТИЕ ОКНА (Эту функцию будут вызывать кнопки из твоего HTML)
window.openModal = function(index) {
    currentProduct = products[index];
    if (!currentProduct) return; // Если товара нет в списке выше, ничего не произойдет
    
    currentImgIdx = 0;
    
    // Заполняем данными из массива
    document.getElementById('modalTitle').innerText = currentProduct.ref;
    document.getElementById('modalPrice').innerText = currentProduct.price;
    document.getElementById('modalDesc').innerText = currentProduct.desc;
    document.getElementById('modalSize').innerText = currentProduct.size;
    
    updateSlider();
    
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    
    // Добавляем твою анимацию всплытия
    const content = modal.querySelector('div');
    content.classList.remove('animate-modal');
    void content.offsetWidth; // Сброс анимации для повтора
    content.classList.add('animate-modal');
};

// СЛАЙДЕР
window.nextImg = function() {
    if (!currentProduct) return;
    currentImgIdx = (currentImgIdx + 1) % currentProduct.images.length;
    updateSlider();
};

function updateSlider() {
    document.getElementById('sliderImg').src = currentProduct.images[currentImgIdx];
    document.getElementById('imageCounter').innerText = `${currentImgIdx + 1} / ${currentProduct.images.length}`;
}

window.closeModal = function() {
    document.getElementById('productModal').style.display = 'none';
};

// КОРЗИНА И АНИМАЦИИ
window.toggleCart = function() {
    const s = document.getElementById('cartSidebar');
    const content = s.querySelector('div');
    
    if (s.style.display === 'none' || !s.style.display) {
        s.style.display = 'flex';
        content.classList.add('animate-slide');
    } else {
        s.style.display = 'none';
    }
};

window.addToCart = function() {
    if (!currentProduct) return;
    cart.push(currentProduct);
    
    updateCartUI();
    
    const count = document.getElementById('cart-count');
    count.classList.add('scale-150');
    
    setTimeout(() => {
        count.classList.remove('scale-150');
        closeModal();
        toggleCart();
    }, 200);
};

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const container = document.getElementById('cartItems');
    container.innerHTML = cart.map(item => `
        <div class="flex justify-between mb-4 border-b border-zinc-900 pb-2">
            <div class="text-[10px] uppercase">${item.ref}</div>
            <div class="text-[10px]">${item.price}</div>
        </div>
    `).join('');
    
    let total = 0;
    cart.forEach(item => {
        total += parseInt(item.price) || 0;
    });
    document.getElementById('cart-total').innerText = total + '€';
}

// ОФОРМЛЕНИЕ
window.openCheckout = function() {
    if (cart.length === 0) return;
    const m = document.getElementById('checkoutModal');
    m.style.display = 'flex';
    m.querySelector('div').classList.add('animate-modal');
    document.getElementById('finalPrice').innerText = document.getElementById('cart-total').innerText;
};

window.closeCheckout = () => { document.getElementById('checkoutModal').style.display = 'none'; };

window.nextStep = () => {
    if(document.getElementById('clientName').value) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
};

window.processPayment = function() {
    const btn = document.getElementById('payBtn');
    btn.innerText = "ПРОВЕРКА...";
    setTimeout(() => {
        const msg = `ЗАКАЗ ОПЛАЧЕН\nТовары: ${cart.map(i=>i.ref).join(', ')}`;
        document.getElementById('tgLink').href = `https://t.me/yamusulmaninsalam?text=${encodeURIComponent(msg)}`;
        btn.classList.add('hidden');
        document.getElementById('tgAction').classList.remove('hidden');
    }, 1500);
};
