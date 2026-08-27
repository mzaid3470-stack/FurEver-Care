/**
 * FurEver Care — Utilities & Shared Helpers
 * Includes Clock, Geolocation, Visitor Counter, Toast Notifications, Modal Control & Data Fallbacks
 */

// ==========================================
// 1. Real-Time Clock & Date
// ==========================================
function initRealtimeClock() {
  const clockElement = document.getElementById('live-clock');
  const dateElement = document.getElementById('live-date');

  function update() {
    const now = new Date();
    if (clockElement) {
      clockElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }
    if (dateElement) {
      dateElement.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 2. Geolocation with Graceful Fallback
// ==========================================
function initGeolocation() {
  const locationElement = document.getElementById('user-location');
  if (!locationElement) return;

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        locationElement.innerHTML = `<span class="utility-dot"></span> Lat ${lat}°, Lon ${lon}° (Regional Care Online)`;
      },
      (error) => {
        // Graceful fallback for permission denied or unavailable
        locationElement.innerHTML = `<span class="utility-dot"></span> Regional Sanctuary Hub Active`;
      },
      { timeout: 8000 }
    );
  } else {
    locationElement.innerHTML = `<span class="utility-dot"></span> Global Sanctuary Network`;
  }
}

// ==========================================
// 3. Dynamic Simulated Visitor Counter
// ==========================================
function initVisitorCounter() {
  const counterElement = document.getElementById('visitor-count');
  if (!counterElement) return;

  // Persistent simulated public counter: each page visit advances the
  // displayed total, and the value continues to grow while the page is open.
  let baseCount = parseInt(localStorage.getItem('furever_visitor_count') || '1434', 10);
  if (!Number.isFinite(baseCount) || baseCount < 1434) baseCount = 1434;

  // Count this new visit once, with a small natural-looking variation.
  baseCount += Math.floor(Math.random() * 3) + 1;
  localStorage.setItem('furever_visitor_count', String(baseCount));

  const render = (value) => {
    counterElement.textContent = value.toLocaleString('en-US');
  };

  render(baseCount);

  // Keep the counter active while visitors browse the site.
  window.setInterval(() => {
    baseCount += Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('furever_visitor_count', String(baseCount));
    render(baseCount);
  }, 12000);
}

// ==========================================
// 4. Session & LocalStorage Personalization
// ==========================================
const USER_KEY = 'furever_user_profile';
const PET_KEY = 'furever_registered_pet';

function getUserProfile() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setUserProfile(name, userType) {
  const data = {
    name: name.trim() || 'Guest Companion',
    userType: userType || 'Pet Owner',
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(USER_KEY, JSON.stringify(data));
  updatePersonalizedGreetings();
  return data;
}

function getRegisteredPet() {
  try {
    const raw = localStorage.getItem(PET_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setRegisteredPet(petData) {
  localStorage.setItem(PET_KEY, JSON.stringify(petData));
}

function updatePersonalizedGreetings() {
  const user = getUserProfile();
  const greetingElements = document.querySelectorAll('.utility-user-greeting, .dynamic-user-greeting');
  
  greetingElements.forEach(el => {
    if (user && user.name) {
      el.textContent = `Welcome, ${user.name} (${user.userType})`;
    } else {
      el.textContent = `Welcome to FurEver Care`;
    }
  });

  const bannerInput = document.getElementById('banner-user-name');
  const bannerSelect = document.getElementById('banner-user-type');
  if (bannerInput && user && user.name) {
    bannerInput.value = user.name;
  }
  if (bannerSelect && user && user.userType) {
    bannerSelect.value = user.userType;
  }
}

// ==========================================
// 5. Toast Notification System
// ==========================================
function showToast(message, duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--dusty-pink); flex-shrink: 0;">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 14 14"></polyline>
    </svg>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==========================================
// 6. Modal Helpers
// ==========================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global modal backdrop click listener
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }
});
