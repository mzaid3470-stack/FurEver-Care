/* FurEver Care — final polish: readable contrast, animated back-to-top, safe page helpers. */
document.addEventListener('DOMContentLoaded', function () {
  // Back-to-top control is injected on every page so no existing layout markup is changed.
  if (!document.querySelector('.furever-back-to-top')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'furever-back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(btn);

    const toggle = function () {
      btn.classList.toggle('is-visible', window.scrollY > 420);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Make keyboard focus obvious without changing the site's visual language.
  document.querySelectorAll('a, button, input, select, textarea').forEach(function (el) {
    el.addEventListener('focus', function () { el.classList.add('furever-focus'); });
    el.addEventListener('blur', function () { el.classList.remove('furever-focus'); });
  });
});
