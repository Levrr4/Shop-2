// Проверка загрузки скрипта в консоли
console.log("DARKSALE script loaded");

const products = [
    { id: 0, ref: '"Blackline" Waxed jeans', price: '35€', sold: false, desc: 'Custom waxed denim.', size: 'W30 L32', images: ['https://i.postimg.cc/fbFp49Fc/Photoroom-20260130-225625.jpg', 'https://i.postimg.cc/tTnTyFgZ/Photoroom-20260130-225839.jpg'] },
    { id: 1, ref: 'Boots', price: '30€', sold: false, desc: 'Military-inspired boots.', size: '42 EU', images: ['https://i.postimg.cc/0NdnnJvk/Photoroom-20260128-141222.jpg'] },
    { id: 2, ref: 'Cross hat', price: '10€', sold: false, desc: 'Hand-knit cross hat.', size: 'One Size', images: ['https://i.postimg.cc/4d25BspB/Photoroom-20260121-135030.jpg'] },
    { id: 3, ref: 'Leather portmone', price: '11€', sold: false, desc: 'Berlin made portmone.', size: 'One Size', images: ['https://i.postimg.cc/gk710jHf/Photoroom-20260207-162916.jpg'] }
];

let cart = [];
let currentProduct = null;
let currentImgIdx = 0;

// Функция отрисовки товаров
function render() {
    const buySection = document.getElementById('buy');
    if (!buySection) return;

    buySection.innerHTML = products.map((p, i) => `
        <div class="product-card border border-zinc-900 p-2">
            ${p.sold ? '<div class="sold-overlay"><div class="sold-badge">SOLD</div></div>' : ''}
            <div class="text-[8px] mb-2 opacity-20 uppercase">REF: ${p.ref}</div>
            <div class="w-full aspect-video overflow-hidden bg-zinc-950 mb-4 border border-zinc-900">
                <img src="${p.images[0]}" class="w-full h-full object-contain ${p.sold ? 'sold-img' : ''}">
            </div>
            <button onclick="openModal(${i})" class="text-[10px] uppercase hover:line-through">
                Просмотр
            </button>
        </div>
    `).join('');
}

// Привязываем функции к объекту window, чтобы кнопки их видели
window.openModal = (i) => {
    currentProduct = products[i];
    currentImgIdx = 0;
    
    document.getElementById('modalTitle').innerText = currentProduct.ref;
    document.getElementById('modalPrice').innerText = currentProduct.price;
    document.getElementById('modalDesc').innerText = currentProduct.desc;
    document.getElementById('modalSize').innerText = currentProduct.size;
    
    updateSlider();
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    modal.querySelector('div').classList.add('animate-modal');
};

window.closeModal = () => {
    document.getElementById('productModal').style.display = 'none';
};

window.nextImg = () => {
    currentImgIdx = (currentImgIdx + 1) % currentProduct.images.length;
    updateSlider();
};

function updateSlider() {
    document.getElementById('sliderImg').src = currentProduct.images[currentImgIdx];
    document.getElementById('imageCounter').innerText = `${currentImgIdx + 1} / ${currentProduct.images.length}`;
}

window.toggleCart = () => {
    const s = document.getElementById('cartSidebar');
    const content = s.querySelector('div');
    if (s.style.display === 'none' || !s.style.display) {
        s.style.display = 'flex';
        content.classList.add('animate-slide');
    } else {
        s.style.display = 'none';
    }
};

window.addToCart = () => {
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
    document.getElementById('cart-total').innerText = cart.length ? (parseInt(cart[0].price) * cart.length) + '€' : '0€';
}

window.openCheckout = () => {
    const m = document.getElementById('checkoutModal');
    m.style.display = 'flex';
    m.querySelector('div').classList.add('animate-modal');
    document.getElementById('finalPrice').innerText = document.getElementById('cart-total').innerText;
};

window.closeCheckout = () => {
    document.getElementById('checkoutModal').style.display = 'none';
};

window.nextStep = () => {
    if(document.getElementById('clientName').value) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
};

window.processPayment = () => {
    const btn = document.getElementById('payBtn');
    btn.innerText = "ПРОВЕРКА...";
    setTimeout(() => {
        const msg = `ЗАКАЗ: ${cart.map(i=>i.ref).join(', ')}`;
        document.getElementById('tgLink').href = `https://t.me/yamusulmaninsalam?text=${encodeURIComponent(msg)}`;
        btn.classList.add('hidden');
        document.getElementById('tgAction').classList.remove('hidden');
    }, 1500);
};

// Запускаем отрисовку сразу после загрузки скрипта
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
} else {
    render();
}
