// 1. База данных товаров
const products = [
    { id: 0, ref: '"Blackline" Waxed jeans', price: '35€', sold: false, desc: 'Custom waxed denim with reinforced stitching and industrial hardware.', size: 'W30 L32 | Waist: 40cm, Length: 105cm, Leg Opening: 19cm', images: ['https://i.postimg.cc/fbFp49Fc/Photoroom-20260130-225625.jpg', 'https://i.postimg.cc/tTnTyFgZ/Photoroom-20260130-225839.jpg', 'https://i.postimg.cc/RV4MpkwV/Photoroom-20260130-225800.jpg'] },
    { id: 1, ref: 'Boots', price: '30€', sold: false, desc: 'Military-inspired boots, heavy duty sole, distressed leather finish.', size: '42 EU | Insole length: 27.5cm', images: ['https://i.postimg.cc/0NdnnJvk/Photoroom-20260128-141222.jpg', 'https://i.postimg.cc/2jXw0Dsw/Photoroom-20260128-141126.jpg','https://i.postimg.cc/GpQPGwPk/Photoroom-20260128-141154.jpg'] },
    { id: 2, ref: 'Cross hat', price: '10€', sold: false, desc: 'Сделана из приятной вязаной ткани с нашитым мелкими швами крестом.', size: 'One Size', images: ['https://i.postimg.cc/4d25BspB/Photoroom-20260121-135030.jpg'] },
    { id: 3, ref: 'Leather portmone', price: '11€', sold: false, desc: 'Натуральная синяя кожа, приятная на ощупь. Сделано в Берлине', size: 'One Size', images: ['https://i.postimg.cc/gk710jHf/Photoroom-20260207-162916.jpg','https://i.postimg.cc/J762T0vG/Photoroom-20260207-162947.jpg'] }
];

let cart = [];
let currentProduct = null;
let currentImgIdx = 0;

// Отрисовка товаров (вызывается автоматически)
function renderProducts() {
    const shopContainer = document.getElementById('buy');
    if (!shopContainer) return;

    shopContainer.innerHTML = products.map((p, index) => `
        <div class="product-card border border-zinc-900 p-2">
            ${p.sold ? '<div class="sold-overlay"><div class="sold-badge">SOLD OUT</div></div>' : ''}
            <div class="text-[8px] mb-2 opacity-20 uppercase">REF: ${p.ref}</div>
            <div class="w-full aspect-video overflow-hidden bg-zinc-950 mb-4 border border-zinc-900">
                <img src="${p.images[0]}" class="w-full h-full object-contain ${p.sold ? 'sold-img' : ''}">
            </div>
            <button onclick="openModal(${index})" class="text-[10px] uppercase hover:line-through">
                ${p.sold ? 'Продано' : 'Просмотр'}
            </button>
        </div>
    `).join('');
}

// Функции делаем глобальными через window.
window.openModal = function(index) {
    currentProduct = products[index];
    currentImgIdx = 0;
    
    const modal = document.getElementById('productModal');
    const content = modal.querySelector('div');
    
    document.getElementById('modalTitle').innerText = currentProduct.ref;
    document.getElementById('modalPrice').innerText = currentProduct.price;
    document.getElementById('modalDesc').innerText = currentProduct.desc;
    document.getElementById('modalSize').innerText = currentProduct.size;
    
    updateSlider();
    modal.style.display = 'flex';
    content.classList.add('animate-modal');
};

window.closeModal = function() {
    document.getElementById('productModal').style.display = 'none';
};

window.nextImg = function() {
    currentImgIdx = (currentImgIdx + 1) % currentProduct.images.length;
    updateSlider();
};

function updateSlider() {
    document.getElementById('sliderImg').src = currentProduct.images[currentImgIdx];
    document.getElementById('imageCounter').innerText = `${currentImgIdx + 1} / ${currentProduct.images.length}`;
}

window.toggleCart = function() {
    const s = document.getElementById('cartSidebar');
    const content = s.querySelector('div');
    s.style.display = (s.style.display === 'none' || !s.style.display) ? 'flex' : 'none';
    if(s.style.display === 'flex') content.classList.add('animate-slide');
};

window.addToCart = function() {
    if (!currentProduct) return;
    cart.push(currentProduct);
    updateCartUI();
    
    const count = document.getElementById('cart-count');
    count.classList.add('scale-150');
    
    setTimeout(() => {
        closeModal();
        toggleCart();
        count.classList.remove('scale-150');
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
    document.getElementById('cart-total').innerText = cart.length ? (parseFloat(cart[0].price) * cart.length) + '€' : '0€';
}

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
        const msg = `ЗАКАЗ: ${cart.map(i=>i.ref).join(', ')}`;
        document.getElementById('tgLink').href = `https://t.me/yamusulmaninsalam?text=${encodeURIComponent(msg)}`;
        btn.classList.add('hidden');
        document.getElementById('tgAction').classList.remove('hidden');
    }, 1500);
};

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', renderProducts);
