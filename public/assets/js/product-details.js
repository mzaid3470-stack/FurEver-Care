(() => {
  const PRODUCT_DATA_URL = '/data/products.json';

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));

  const productPageFor = (id) => `product-${String(id).replace('prod-', '')}.html`;

  const getCurrentProductId = () => {
    const container = document.getElementById('product-detail-container');
    if (container?.dataset.productPage) return container.dataset.productPage;
    const file = window.location.pathname.split('/').pop() || '';
    const match = file.match(/^product-(\d{2})\.html$/);
    if (match) return `prod-${match[1]}`;
    return new URLSearchParams(window.location.search).get('id') || 'prod-01';
  };

  const showProduct = (product, allProducts) => {
    const container = document.getElementById('product-detail-container');
    const relatedGrid = document.getElementById('related-products-grid');
    if (!container || !product) return;

    document.title = `${product.name} | FurEver Care`;

    const ingredients = (product.ingredients || []).map((item) =>
      `<li class="product-detail-list-item">✦ ${escapeHtml(item)}</li>`
    ).join('');

    const specifications = (product.specifications || []).map((item) =>
      `<li class="product-spec-item"><span>✦</span><span>${escapeHtml(item)}</span></li>`
    ).join('');

    container.innerHTML = `
      <div class="product-detail-layout product-detail-animate">
        <div class="product-detail-visual">
          <div class="hero-image-frame product-detail-image-frame">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" referrerpolicy="no-referrer">
          </div>
          <div class="product-detail-trust-grid">
            <div class="product-detail-trust-card">
              <div class="product-detail-trust-label">Catalog Status</div>
              <div>Curated Offering</div>
            </div>
            <div class="product-detail-trust-card">
              <div class="product-detail-trust-label">Product Type</div>
              <div>${escapeHtml(product.subCategory)}</div>
            </div>
            <div class="product-detail-trust-card">
              <div class="product-detail-trust-label">Packaging</div>
              <div>Retail Ready</div>
            </div>
          </div>
        </div>

        <div class="product-detail-copy">
          <div class="product-detail-kicker">
            <span class="card-badge card-badge-dusty">${escapeHtml(product.badge)}</span>
            <span class="label-editorial">${escapeHtml(product.category)} • ${escapeHtml(product.subCategory)}</span>
          </div>

          <h1 class="product-detail-title">${escapeHtml(product.name)}</h1>

          <div class="product-detail-price-row">
            <span class="card-price product-detail-price">$${Number(product.price).toFixed(2)}</span>
            <span class="product-detail-rating">★ ${escapeHtml(product.rating)} / 5.0 (${escapeHtml(product.reviews)} Reviews)</span>
          </div>

          <p class="product-detail-description">${escapeHtml(product.description)}</p>

          <div class="product-detail-panel">
            <div class="product-detail-panel-label">About This Product</div>
            <p>${escapeHtml(product.overview)}</p>
          </div>

          <div class="product-detail-panel">
            <h3>Product Specifications</h3>
            <ul class="product-spec-list">${specifications}</ul>
          </div>

          <div class="product-detail-panel">
            <h3>Composition & Ingredients</h3>
            <ul class="product-detail-list">${ingredients}</ul>
          </div>

          <div class="product-detail-two-column">
            <div class="product-detail-mini-card">
              <span class="product-detail-mini-label">Best For</span>
              <p>${escapeHtml(product.bestFor)}</p>
            </div>
            <div class="product-detail-mini-card">
              <span class="product-detail-mini-label">Size / Weight</span>
              <p>${escapeHtml(product.weight)}</p>
            </div>
          </div>

          <div class="product-detail-panel product-detail-guidance">
            <h3>Directions & Care</h3>
            <p>${escapeHtml(product.serving)}</p>
            <p>${escapeHtml(product.care)}</p>
          </div>

          <div class="product-detail-note">
            <strong>Important:</strong> ${escapeHtml(product.notes)}
          </div>

          <div class="product-detail-actions">
            <button class="btn btn-burgundy btn-lg product-action-btn" type="button">Add to Cart</button>
            <a href="products.html" class="btn btn-outline-burgundy btn-lg">Browse More</a>
          </div>
        </div>
      </div>
    `;

    const action = container.querySelector('.product-action-btn');
    action?.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast(`Added "${product.name}" ($${Number(product.price).toFixed(2)}) to your Atelier reservation.`);
      }
    });

    if (relatedGrid) {
      const sameCategory = allProducts.filter((item) =>
        item.id !== product.id && item.category === product.category
      );
      const fallback = allProducts.filter((item) => item.id !== product.id);
      const related = [...sameCategory, ...fallback].filter(
        (item, index, array) => array.findIndex((candidate) => candidate.id === item.id) === index
      ).slice(0, 3);

      relatedGrid.innerHTML = related.map((item, index) => `
        <article class="card-editorial product-related-card reveal-on-scroll is-visible" style="--product-delay:${index * 70}ms;">
          <span class="card-badge">${escapeHtml(item.badge)}</span>
          <div class="card-media">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" referrerpolicy="no-referrer">
          </div>
          <span class="label-editorial" style="color: var(--burgundy-light); margin-bottom: 0.35rem;">${escapeHtml(item.category)}</span>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">
            <a href="${productPageFor(item.id)}">${escapeHtml(item.name)}</a>
          </h3>
          <div class="card-price" style="margin-bottom: 1rem;">$${Number(item.price).toFixed(2)}</div>
          <a href="${productPageFor(item.id)}" class="btn btn-outline-burgundy btn-sm" style="margin-top: auto;">View Specifications</a>
        </article>
      `).join('');
    }
  };

  const initProductDetail = async () => {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    try {
      const response = await fetch(PRODUCT_DATA_URL);
      if (!response.ok) throw new Error('Unable to load product catalog.');
      const allProducts = await response.json();
      const productId = getCurrentProductId();
      const product = allProducts.find((item) => item.id === productId);

      if (!product) {
        container.innerHTML = `
          <div class="product-detail-not-found">
            <h1>Product Not Found</h1>
            <p>That product is not available in the current Care Collection.</p>
            <a href="products.html" class="btn btn-burgundy">Back to Products</a>
          </div>
        `;
        return;
      }

      showProduct(product, allProducts);
    } catch (error) {
      container.innerHTML = `
        <div class="product-detail-not-found">
          <h1>Unable to Load Product</h1>
          <p>Please return to the Care Collection and try again.</p>
          <a href="products.html" class="btn btn-burgundy">Back to Products</a>
        </div>
      `;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetail, { once: true });
  } else {
    initProductDetail();
  }
})();
