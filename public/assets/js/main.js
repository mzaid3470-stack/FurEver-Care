/**
 * FurEver Care — Main Application Controller
 * Handles Navigation, Header Scroll, Mobile Menu, Active Links, Personalization & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Utilities
  if (typeof initRealtimeClock === 'function') initRealtimeClock();
  if (typeof initGeolocation === 'function') initGeolocation();
  if (typeof initVisitorCounter === 'function') initVisitorCounter();
  if (typeof updatePersonalizedGreetings === 'function') updatePersonalizedGreetings();

  // 1. Header Scroll State
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-drawer-overlay');

  function toggleMobileMenu() {
    if (mobileDrawer && mobileToggle) {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileMenu);
  }

  // 3. Highlight Active Nav Links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. Personalization Banner Form Handling
  const personalizeForm = document.getElementById('personalize-experience-form');
  if (personalizeForm) {
    personalizeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('banner-user-name');
      const roleSelect = document.getElementById('banner-user-type');

      const name = nameInput ? nameInput.value.trim() : '';
      const role = roleSelect ? roleSelect.value : 'Pet Owner';

      if (!name) {
        if (typeof showToast === 'function') {
          showToast('Please provide your first name to personalize.');
        }
        return;
      }

      setUserProfile(name, role);
      if (typeof showToast === 'function') {
        showToast(`Welcome to the FurEver Care family, ${name}!`);
      }

      // Smooth redirection option based on role
      setTimeout(() => {
        if (role === 'Pet Owner' && !window.location.pathname.includes('pet-owner.html')) {
          window.location.href = 'pet-owner.html';
        } else if (role === 'Veterinarian' && !window.location.pathname.includes('veterinarian.html')) {
          window.location.href = 'veterinarian.html';
        } else if (role === 'Animal Shelter' && !window.location.pathname.includes('shelter.html')) {
          window.location.href = 'shelter.html';
        }
      }, 1000);
    });
  }
});
