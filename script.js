const newsData = [
  {
    title: "Samsung Galaxy Z Fold 8",
    desc: "Прорывной гибкий дисплей 2026 года, ультратонкий титановый корпус и глубокая интеграция с персональным AI-помощником."
  },
  {
    title: "Xiaomi 18 Pro Max",
    desc: "Новый флагман с квадрокамерой Leica, емким аккумулятором 7000 мАч и рекордной сверхбыстрой зарядкой 210 Вт."
  }
];
const phonesData = [
  { id: 'p1', brand: 'Apple', name: 'Apple iPhone 17 Pro Max', image: 'image/iphone.jpg', color: 'Титановый синий', storage: '512 ГБ', material: 'Титан + стекло', price: 159990 },
  { id: 'p2', brand: 'Samsung', name: 'Samsung Galaxy S26 Ultra', image: 'image/samsung.jpg', color: 'Черный', storage: '1 ТБ', material: 'Титан', price: 179999 },
  { id: 'p3', brand: 'Xiaomi', name: 'Xiaomi 17 Ultra Leica Edition', image: 'image/xiaomi.png', color: 'Изумрудный', storage: '512 ГБ', material: 'Эко-кожа', price: 109999 },
  { id: 'p4', brand: 'Google', name: 'Google Pixel 10 Pro', image: 'image/pixel.jpg', color: 'Фарфоровый', storage: '256 ГБ', material: 'Переработанный металл', price: 109999 },
  { id: 'p5', brand: 'OnePlus', name: 'OnePlus 15 ', image: 'image/oneplus.png', color: 'Черный', storage: '512 ГБ', material: 'Керамика', price: 89999 },
  { id: 'p6', brand: 'Sony', name: 'Sony Xperia 1 VII', image: 'image/sony.png', color: 'Матовый черный', storage: '512 ГБ', material: 'Закаленное стекло', price: 109999 },
  { id: 'p7', brand: 'Huawei', name: 'Huawei Mate XT Ultimate Design', image: 'image/huawei.png', color: 'красный', storage: '1 ТБ', material: 'Керамика + Алюминий', price: 259999 }
];

const accessoriesData = [
  { id: 'a1', emoji: '🎧', name: 'Наушники Apple AirPods Pro 2', price: 24999 },
  { id: 'a2', emoji: '🎧', name: 'Наушники Samsung Galaxy Buds3 Pro', price: 18999 },
  { id: 'a3', emoji: '🔋', name: 'Повербанк UltraCharge 20000 mAh', price: 4999 },
  { id: 'a4', emoji: '⌚', name: 'Смарт-часы SmartWatch 9 Pro', price: 15999 },
  { id: 'a5', emoji: '🔌', name: 'Кабель USB-C Fast Charge 2m', price: 1499 },
  { id: 'a6', emoji: '📱', name: 'Защитное стекло 9H Tempered Glass', price: 999 }
];


let currentSlide = 0;
let cart = [];


function formatPrice(val) {
  return val.toLocaleString('ru-RU') + ' ₽';
}

const shopView = document.getElementById('shop-view');
const view404 = document.getElementById('view-404');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCountBadge = document.getElementById('cart-count');
const cartItemsView = document.getElementById('cart-items-view');
const orderSuccessView = document.getElementById('order-success-view');
const generatedOrderNum = document.getElementById('generated-order-num');
const modalHeaderText = document.getElementById('modal-header-text');
const toastMsg = document.getElementById('toast-msg');

function renderPhones() {
  const container = document.getElementById('phones-grid');
  container.innerHTML = phonesData.map(phone => `
    <div class="product-card">
      <div>
        <div class="photo-placeholder">
          <img src="${phone.image}" alt="${phone.name}" class="phone-img">
        </div>
        <div class="product-name">${phone.name}</div>
        <div class="spec-list">
          <div class="spec-item"><span class="spec-label">Цвет:</span> <span class="spec-value">${phone.color}</span></div>
          <div class="spec-item"><span class="spec-label">Объем памяти:</span> <span class="spec-value">${phone.storage}</span></div>
          <div class="spec-item"><span class="spec-label">Материал:</span> <span class="spec-value">${phone.material}</span></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="price">${formatPrice(phone.price)}</div>
        <button class="btn" onclick="addToCart('${phone.id}', 'phone')">В корзину</button>
      </div>
    </div>
  `).join('');
}

function renderAccessories() {
  const container = document.getElementById('accessories-grid');
  container.innerHTML = accessoriesData.map(acc => `
    <div class="product-card">
      <div>
        <div class="photo-placeholder" style="background-color: #ffffff;">
          <div class="emoji-box">${acc.emoji}</div>
        </div>
        <div class="product-name">${acc.name}</div>
        <div class="work-badge">Характеристики: <strong>работают</strong></div>
      </div>
      <div class="card-footer">
        <div class="price">${formatPrice(acc.price)}</div>
        <button class="btn" onclick="addToCart('${acc.id}', 'accessory')">В корзину</button>
      </div>
    </div>
  `).join('');
}

function updateSlide() {
  document.getElementById('slide-title').innerText = newsData[currentSlide].title;
  document.getElementById('slide-desc').innerText = newsData[currentSlide].desc;
}

document.getElementById('next-slide-btn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % newsData.length;
  updateSlide();
});

document.getElementById('prev-slide-btn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + newsData.length) % newsData.length;
  updateSlide();
});

function addToCart(id, type) {
  let itemData = type === 'phone' 
    ? phonesData.find(p => p.id === id) 
    : accessoriesData.find(a => a.id === id);

  if (!itemData) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: itemData.id,
      name: itemData.name,
      price: itemData.price,
      quantity: 1
    });
  }

  updateCartBadge();
  showToast(`«${itemData.name}» добавлен в корзину!`);
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.innerText = totalCount;
}

function renderCartModal() {
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <div style="font-size: 40px; margin-bottom: 10px;">🛒</div>
        <p style="font-weight: 600;">Ваша корзина пуста</p>
      </div>
    `;
    cartTotalPrice.innerText = '0 ₽';
    return;
  }

  let total = 0;
  cartItemsList.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div>
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)} / шт.</div>
          </div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
          <span style="font-weight: 700; font-size: 14px;">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          <button class="delete-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
  cartTotalPrice.innerText = formatPrice(total);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      renderCartModal();
      updateCartBadge();
    }
  }
}
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCartModal();
  updateCartBadge();
}

document.getElementById('open-cart-btn').addEventListener('click', () => {
  cartItemsView.classList.remove('hidden');
  orderSuccessView.classList.add('hidden');
  modalHeaderText.innerText = 'Ваша корзина';
  renderCartModal();
  cartModal.classList.remove('hidden');
});

document.getElementById('close-modal-btn').addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return;

  const rand = () => Math.floor(1000 + Math.random() * 9000);
  generatedOrderNum.innerText = `Ваш заказ №${rand()}-${rand()}-${rand()}`;
  
  cartItemsView.classList.add('hidden');
  orderSuccessView.classList.remove('hidden');
  modalHeaderText.innerText = 'Заказ оформлен!';
});

document.getElementById('finish-order-btn').addEventListener('click', () => {
  cart = [];
  updateCartBadge();
  cartModal.classList.add('hidden');
});

function showToast(text) {
  toastMsg.innerText = text;
  toastMsg.classList.remove('hidden');
  setTimeout(() => {
    toastMsg.classList.add('hidden');
  }, 2000);
}


document.getElementById('link-404').addEventListener('click', () => {
  shopView.classList.add('hidden');
  view404.classList.remove('hidden');
  window.scrollTo(0, 0);
});

function showShop() {
  view404.classList.add('hidden');
  shopView.classList.remove('hidden');
}

document.getElementById('back-home-btn').addEventListener('click', () => {
  showShop();
  window.scrollTo(0, 0);
});

document.getElementById('logo-btn').addEventListener('click', () => {
  showShop();
  window.scrollTo(0, 0);
});

document.getElementById('nav-phones').addEventListener('click', () => {
  showShop();
  document.getElementById('phones-section').scrollIntoView();
});

document.getElementById('nav-accessories').addEventListener('click', () => {
  showShop();
  document.getElementById('accessories-section').scrollIntoView();
});

window.onload = function() {
  renderPhones();
  renderAccessories();
  updateSlide();
};


