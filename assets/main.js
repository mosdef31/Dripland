// Hamburger (flat menu, no nested dropdowns inside)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Category dropdown with slight delay (desktop)
const dropdown = document.querySelector('.dropdown');
let dropdownTimer = null;
if (dropdown) {
  dropdown.addEventListener('mouseenter', () => {
    dropdownTimer = setTimeout(() => dropdown.classList.add('open'), 200);
  });
  dropdown.addEventListener('mouseleave', () => {
    clearTimeout(dropdownTimer);
    dropdown.classList.remove('open');
  });
}

// Product page boot: hydrate details by URL ?id=...
(function initProductPage(){
  const root = document.getElementById('product-root');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'air-flex';

  // 1) Add color + images: paste your image links here (leave "" if you don’t have one)
  const PRODUCTS = {
  'air-flex':   { name:'Air Flex',    price:'$199', desc:'Breathable daily trainer for versatile wear.', sku:'AF-001',
                  color:'#ececec', images:['assets/media/AIR+JORDAN+3+RETRO1.webp','assets/media/AIR+JORDAN+3+RETRO.webp','assets/media/AIR+JORDAN+3+RETRO2.webp'] },
  'runner-x':   { name:'Runner X',    price:'$149', desc:'Lightweight build for fast, responsive runs.', sku:'RX-200',
                  color:'#e8e8e8', images:['assets/media/AIR+ZOOM+PEGASUS+411.webp','assets/media/AIR+ZOOM+PEGASUS+41.webp','assets/media/AIR+ZOOM+PEGASUS+412.webp'] },
  'classic-pro':{ name:'Classic Pro', price:'$129', desc:'Timeless leather profile, street-ready.', sku:'CP-130',
                  color:'#f0f0f0', images:['assets/media/u1906lcr_nb_05_i.webp','assets/media/u1906lcr_nb_02_i.webp','assets/media/u1906lcr_nb_04_i.webp'] },
  'limitless':  { name:'Limitless',   price:'$179', desc:'Cushioned long-mile comfort.', sku:'LM-310',
                  color:'#ededed', images:['assets/media/AIR+MAX+95+OG+PRM1.webp','assets/media/AIR+MAX+95+OG+PRM.webp','assets/media/AIR+MAX+95+OG+PRM4.webp'] },
  'street-nova':{ name:'Street Nova', price:'$159', desc:'Everyday favorite with modern edge.', sku:'SN-210',
                  color:'#efefef', images:['assets/media/JORDAN+TATUM+41.webp','assets/media/JORDAN+TATUM+4.webp','assets/media/JORDAN+TATUM+42.webp'] },
  'trail-edge': { name:'Trail Edge',  price:'$169', desc:'All-terrain grip for the unbeaten path.', sku:'TE-118',
                  color:'#ececec', images:['assets/media/ct500grn_nb_05_i.webp','assets/media/ct500grn_nb_02_i.webp','assets/media/ct500grn_nb_04_i.webp'] },
  'urban-lite': { name:'Urban Lite',  price:'$139', desc:'City-ready design with feather feel.', sku:'UL-510',
                  color:'#e6e6e6', images:['assets/media/JORDAN+TRUNNER+O_S1.webp','assets/media/JORDAN+TRUNNER+O_S.webp','assets/media/JORDAN+TRUNNER+O_S2.webp'] },
  'velocity':   { name:'Velocity',    price:'$189', desc:'High-energy return for daily training.', sku:'VL-090',
                  color:'#e7e7e7', images:['assets/media/mevozrb4_nb_05_i.webp','assets/media/mevozrb4_nb_04_i.webp','assets/media/mevozrb4_nb_06_i.webp'] },
  'prime-court':{ name:'Prime Court', price:'$149', desc:'Court classic reimagined for comfort.', sku:'PC-410',
                  color:'#f2f2f2', images:['assets/media/mfcxly5_nb_05_i.webp','assets/media/mfcxly5_nb_04_i.webp','assets/media/mfcxly5_nb_06_i.webp'] },
  'aero-max':   { name:'Aero Max',    price:'$209', desc:'Air-cushioned ride with premium finish.', sku:'AM-550',
                  color:'#ececec', images:['assets/media/u370oa_nb_05_i.webp','assets/media/u370oa_nb_04_i.webp','assets/media/u370oa_nb_06_i.webp'] },
  'tempo':      { name:'Tempo',       price:'$139', desc:'Smooth strides for everyday movement.', sku:'TP-061',
                  color:'#e8e8e8', images:['assets/media/NIKE+C1TY+PRM1.webp','assets/media/NIKE+C1TY+PRM.webp','assets/media/NIKE+C1TY+PRM2.webp'] },
  'stride-pro': { name:'Stride Pro',  price:'$169', desc:'Balanced support and agility.', sku:'SP-377',
                  color:'#ededed', images:['assets/media/u1906nvp_nb_05_i.webp','assets/media/u1906nvp_nb_02_i.webp','assets/media/u1906nvp_nb_04_i.webp'] },
  'zen-walk':   { name:'Zen Walk',    price:'$119', desc:'Minimal design for mindful steps.', sku:'ZW-004',
                  color:'#efefef', images:['assets/media/w88015a_nb_05_i.webp','assets/media/w88015a_nb_02_i.webp','assets/media/w88015a_nb_04_i.webp'] },
};

  const p = PRODUCTS[id] || PRODUCTS['air-flex'];

  // 2) Bind basic info
  root.querySelector('[data-name]').textContent  = p.name;
  root.querySelector('[data-price]').textContent = p.price;
  root.querySelector('[data-desc]').textContent  = p.desc;
  root.querySelector('[data-sku]').textContent   = p.sku;

  // 3) Image elements
  const mainBox = document.querySelector('.product-main');
  const mainImg = document.getElementById('prod-main');
  const t1 = document.getElementById('t1');
  const t2 = document.getElementById('t2');
  const t3 = document.getElementById('t3');
  const thumbsWrap = document.getElementById('thumbs');
  const thumbs = [t1, t2, t3];
  const btns = Array.from(thumbsWrap.querySelectorAll('.thumb'));

  // 4) Fixed fallback color always present
  mainBox.style.backgroundColor = p.color || '#e5e5e5';

  // Helper: set a thumbnail slot (hide if no URL)
  function setThumb(imgEl, url) {
    const btn = imgEl.closest('.thumb');
    if (url) {
      imgEl.src = url;
      imgEl.onload = null;
      imgEl.onerror = () => { btn.style.display = 'none'; };
      btn.style.display = '';
    } else {
      btn.style.display = 'none';
    }
  }

  // Initialize thumbs from p.images (can be empty strings)
  setThumb(t1, p.images?.[0] || '');
  setThumb(t2, p.images?.[1] || '');
  setThumb(t3, p.images?.[2] || '');

  // Show selected main image or only the color if missing/failed
  function showMain(n) {
    const url = p.images?.[n] || '';
    if (url) {
      mainImg.style.display = 'block';
      mainImg.src = url;
      mainImg.onload = null;
      mainImg.onerror = () => { mainImg.style.display = 'none'; };
    } else {
      mainImg.style.display = 'none';
    }
    btns.forEach((b, i) => b.classList.toggle('active', i === n));
  }

  // Default to the first available image, otherwise color-only
  const firstIdx = (p.images || []).findIndex(u => u);
  showMain(firstIdx >= 0 ? firstIdx : 0);

  // Switch on click
  thumbsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb');
    if (!btn || btn.style.display === 'none') return;
    const idx = btns.indexOf(btn);
    showMain(idx);
  });

  // add to cart via localStorage
  const cartBtn = document.getElementById('add-to-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find(i => i.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name: p.name, price: p.price, sku: p.sku, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    });
  }

  // JSON-LD Product
  const ld = {
    "@context":"https://schema.org",
    "@type":"Product",
    "name": p.name,
    "sku": p.sku,
    "offers": {
      "@type":"Offer",
      "price": p.price.replace(/[^0-9.]/g,''),
      "priceCurrency":"USD",
      "availability":"https://schema.org/InStock"
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
})();
(function scrollProgress(){
  const bar = document.getElementById('scroll-progress');
  if(!bar) return;
  const calc = () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const t = document.body.scrollTop || document.documentElement.scrollTop;
    bar.style.width = `${(t / (h || 1)) * 100}%`;
  };
  window.addEventListener('scroll', calc, { passive:true });
  calc();
})();
