/* Safe image fallback helper. It does not alter layout or palette. */
(function () {
  const FALLBACKS = {
    dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85',
    cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85',
    rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=85',
    vet: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85'
  };
  window.furEverImageFallback = function (img, type) {
    if (!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    img.src = FALLBACKS[type] || FALLBACKS.dog;
  };
})();
