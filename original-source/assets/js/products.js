/**
 * FurEver Care — Products Showcase Controller
 * Dynamic JSON loading, Search, Category Filter, Sorting, Quick View Modal, Non-functional Buy Now feedback
 */

const FALLBACK_PRODUCTS = [
  {
    "id": "prod-01",
    "name": "Artisanal Organic Salmon & Duck Feast",
    "category": "Dog/Cat Food",
    "subCategory": "Grain-Free Nutrition",
    "price": 48.00,
    "rating": 4.9,
    "reviews": 128,
    "badge": "Bestseller",
    "image": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
    "description": "Slow-cooked wild Alaskan salmon paired with heritage duck breast, infused with cranberries, pumpkin, and cold-pressed flaxseed oil for optimal coat luster and cellular vitality.",
    "weight": "2.5 kg / 5.5 lbs",
    "ingredients": ["Wild Alaskan Salmon", "Free-Range Duck", "Organic Pumpkin", "Cranberries", "Flaxseed Oil"]
  },
  {
    "id": "prod-02",
    "name": "Velvet Orthopedic Memory Boudoir",
    "category": "Bedding & Apparel",
    "subCategory": "Luxury Comfort",
    "price": 145.00,
    "rating": 5.0,
    "reviews": 94,
    "badge": "Signature",
    "image": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80",
    "description": "Handcrafted orthopedic dual-layer memory foam encased in stain-resistant burgundy velvet with removable, machine-washable hypoallergenic upholstery.",
    "weight": "Medium / Large Sizes",
    "ingredients": ["High-Density Visco Foam", "Burgundy Velvet Cover", "Waterproof Inner Membrane"]
  },
  {
    "id": "prod-03",
    "name": "Botanical Rosewater & Silk Coat Elixir",
    "category": "Grooming Essentials",
    "subCategory": "Coat Care",
    "price": 34.00,
    "rating": 4.8,
    "reviews": 76,
    "badge": "Eco-Luxe",
    "image": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    "description": "pH-balanced botanical conditioning shampoo formulated with pure damask rosewater, silk amino acids, and soothing chamomile extract to restore natural sheen.",
    "weight": "500 ml / 16.9 fl oz",
    "ingredients": ["Damask Rose Hydrosol", "Hydrolyzed Silk", "Aloe Barbadensis", "Chamomile Extract"]
  },
  {
    "id": "prod-04",
    "name": "Cellular Probiotic & Marine Collagen Boost",
    "category": "Health Supplements",
    "subCategory": "Joint & Gut Wellness",
    "price": 52.00,
    "rating": 4.9,
    "reviews": 115,
    "badge": "Vet Formulated",
    "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    "description": "Clinical-grade microencapsulated probiotics (10 Billion CFU) combined with marine collagen peptides and green-lipped mussel for joint lubrication and gut health.",
    "weight": "90 Chewable Morsels",
    "ingredients": ["Marine Collagen Peptides", "Green-Lipped Mussel", "L. acidophilus", "Glucosamine HCL"]
  },
  {
    "id": "prod-05",
    "name": "Hand-stitched Tuscan Leather Lead & Collar",
    "category": "Bedding & Apparel",
    "subCategory": "Atelier Walking Wear",
    "price": 89.00,
    "rating": 4.9,
    "reviews": 62,
    "badge": "Artisan Crafted",
    "image": "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80",
    "description": "Vegetable-tanned full-grain Italian leather in deep burgundy with solid brushed brass hardware and reinforced saddle stitching for effortless strolls.",
    "weight": "Adjustable (S, M, L)",
    "ingredients": ["Full-Grain Tuscan Leather", "Solid Brass Hardware", "Natural Wax Finish"]
  },
  {
    "id": "prod-06",
    "name": "Sensory Sisal & Teakwood Prowl Tower",
    "category": "Toys",
    "subCategory": "Enrichment & Play",
    "price": 120.00,
    "rating": 4.7,
    "reviews": 48,
    "badge": "Design Icon",
    "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    "description": "Sculptural architectural cat enrichment tower crafted from sustainably harvested teakwood and natural unbleached sisal rope with a cushioned observation perch.",
    "weight": "H: 110cm / 43.3 in",
    "ingredients": ["Solid Teakwood", "Natural Sisal Fiber", "Burgundy Linen Cushion"]
  },
  {
    "id": "prod-07",
    "name": "Freeze-Dried Venison & Wild Berry Bites",
    "category": "Dog/Cat Food",
    "subCategory": "Pure Raw Treats",
    "price": 26.00,
    "rating": 5.0,
    "reviews": 142,
    "badge": "Single Protein",
    "image": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    "description": "100% pasture-raised New Zealand venison freeze-dried at peak nutrient density, tossed with antioxidant-rich hand-harvested lingonberries.",
    "weight": "180 g / 6.3 oz",
    "ingredients": ["96% Grass-Fed Venison", "4% Organic Lingonberries"]
  },
  {
    "id": "prod-08",
    "name": "Ceramic Whisper-Quiet Circulating Fountain",
    "category": "Grooming Essentials",
    "subCategory": "Hydration Systems",
    "price": 68.00,
    "rating": 4.8,
    "reviews": 89,
    "badge": "Eco-Luxe",
    "image": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
    "description": "Heavy glazed ceramic drinking fountain with quadruple coconut carbon filtration and ultra-silent submersible pump to encourage natural hydration habits.",
    "weight": "2.2 Liters / 74 fl oz",
    "ingredients": ["Food-Grade Ceramic", "Coconut Shell Carbon Filter", "BPA-Free Pump"]
  },
  {
    "id": "prod-09",
    "name": "Natural Rubber Cognitive Puzzle Ball",
    "category": "Toys",
    "subCategory": "Mental Stimulation",
    "price": 22.00,
    "rating": 4.9,
    "reviews": 110,
    "badge": "Interactive",
    "image": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80",
    "description": "Ergonomically textured non-toxic natural rubber puzzle feeder designed to reward patience, slow down fast eaters, and provide stimulating mental exercise.",
    "weight": "Standard / 8.5 cm dia",
    "ingredients": ["100% Pure Natural Tree Rubber", "Food-Safe Plant Dyes"]
  },
  {
    "id": "prod-10",
    "name": "Herbal Calming Tincture with Ashwagandha",
    "category": "Health Supplements",
    "subCategory": "Emotional Balance",
    "price": 38.00,
    "rating": 4.8,
    "reviews": 57,
    "badge": "Holistic",
    "image": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    "description": "Veterinarian-formulated liquid adaptogen elixir containing organic KSM-66 Ashwagandha, passionflower, and L-theanine for separation anxiety, grooming, and travel calm.",
    "weight": "60 ml / 2.0 fl oz",
    "ingredients": ["Organic Ashwagandha", "Passionflower Extract", "L-Theanine", "MCT Coconut Carrier Oil"]
  }
];

let allProducts = [];
let activeCategory = 'All';
let currentSort = 'featured';
let searchQuery = '';

async function loadProductsData() {
  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('Network error loading products');
    allProducts = await res.json();
  } catch (err) {
    // Graceful fallback for direct file execution or offline mode
    allProducts = FALLBACK_PRODUCTS;
  }
  renderProducts();
}

function filterAndSortProducts() {
  let filtered = allProducts.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(item.category.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  const countElement = document.getElementById('products-count');
  if (!container) return;

  const items = filterAndSortProducts();

  if (countElement) {
    countElement.textContent = `Showing ${items.length} of ${allProducts.length} Atelier Offerings`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--dusty-pink-light); border-radius: var(--radius-md); border: 1px dashed var(--burgundy-tint-20);">
        <h3 style="margin-bottom: 0.5rem;">No Curated Items Match Your Selection</h3>
        <p style="margin-bottom: 1.5rem;">Try adjusting your search criteria or resetting filters.</p>
        <button class="btn btn-burgundy btn-sm" onclick="resetProductFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((product, index) => {
    const formattedIndex = (index + 1).toString().padStart(2, '0');
    return `
      <article class="card-editorial reveal-on-scroll is-visible" data-product-id="${product.id}">
        <span class="card-badge">${product.badge || 'Atelier'}</span>
        <div class="card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
          <span class="label-editorial" style="color: var(--burgundy-light);">${product.category}</span>
          <span class="card-number">N°${formattedIndex}</span>
        </div>
        <h3 style="font-size: 1.35rem; margin-bottom: 0.6rem; min-height: 2.8rem; line-height: 1.2;">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p style="font-size: 0.9rem; margin-bottom: 1.25rem; opacity: 0.85; flex: 1;">
          ${product.description.substring(0, 95)}...
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--burgundy-tint-20); margin-top: auto;">
          <div>
            <div class="card-price">$${product.price.toFixed(2)}</div>
            <div style="font-size: 0.72rem; letter-spacing: 0.08em; opacity: 0.75;">★ ${product.rating} (${product.reviews} Reviews)</div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline-burgundy btn-sm" onclick="openProductQuickView('${product.id}')" title="Quick View">Details</button>
            <button class="btn btn-burgundy btn-sm" onclick="handleBuyNowClick('${product.name}', ${product.price})">Buy Now</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function resetProductFilters() {
  activeCategory = 'All';
  searchQuery = '';
  currentSort = 'featured';

  const searchInput = document.getElementById('product-search');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('product-sort');
  if (sortSelect) sortSelect.value = 'featured';

  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-category') === 'All') p.classList.add('active');
    else p.classList.remove('active');
  });

  renderProducts();
}

function handleBuyNowClick(productName, price) {
  if (typeof showToast === 'function') {
    showToast(`Added "${productName}" ($${price.toFixed(2)}) to your Atelier reservation (UI Demo).`);
  }
}

function openProductQuickView(productId) {
  const product = allProducts.find(p => p.id === productId) || FALLBACK_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('product-modal-content');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
      <div>
        <img src="${product.image}" alt="${product.name}" style="border-radius: var(--radius-md); border: 1px solid var(--burgundy-tint-20); width: 100%; height: 320px; object-fit: cover;">
      </div>
      <div>
        <span class="label-editorial" style="color: var(--burgundy-light); margin-bottom: 0.5rem; display: block;">${product.category} • ${product.subCategory}</span>
        <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem; line-height: 1.15;">${product.name}</h2>
        <div class="card-price" style="margin-bottom: 1rem;">$${product.price.toFixed(2)}</div>
        <p style="font-size: 0.95rem; margin-bottom: 1.25rem;">${product.description}</p>
        <div style="background: rgba(74, 21, 33, 0.05); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
          <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">Specifications / Weight</div>
          <div style="font-size: 0.88rem;">${product.weight}</div>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-burgundy" style="flex: 1;" onclick="handleBuyNowClick('${product.name}', ${product.price}); closeModal('product-modal');">Acquire Product</button>
          <a href="product-details.html?id=${product.id}" class="btn btn-outline-burgundy">Full View</a>
        </div>
      </div>
    </div>
  `;

  if (typeof openModal === 'function') {
    openModal('product-modal');
  }
}

// Attach Event Listeners on Load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid')) {
    loadProductsData();

    // Category Filter Pills
    const pills = document.querySelectorAll('.filter-pill[data-category]');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category');
        renderProducts();
      });
    });

    // Search Input
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('product-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }
  }
});
