/* ===================================
   CHAMP EVENTS — GALLERY JS
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== GLIGHTBOX INIT ========== */
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector:   '.glightbox',
      touchNavigation: true,
      loop:       true,
      autoplayVideos: false,
      openEffect:  'zoom',
      closeEffect: 'zoom',
      cssEfects: {
        zoom: { in:'zoomIn', out:'zoomOut' }
      },
    });
  }

  /* ========== GALLERY FILTER ========== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach((item, i) => {
          const category = item.dataset.category || 'all';
          const show = filter === 'all' || category === filter;

          if (show) {
            item.classList.remove('hidden');
            // Stagger re-appear
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, i * 40);
          } else {
            item.style.opacity  = '0';
            item.style.transform = 'scale(0.85)';
            setTimeout(() => item.classList.add('hidden'), 300);
          }
        });

        // Re-initialize lightbox after filter
        if (typeof GLightbox !== 'undefined') {
          setTimeout(() => {
            GLightbox({ selector:'.glightbox' });
          }, 500);
        }
      });
    });
  }

  /* ========== HOME GALLERY LIGHTBOX ========== */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector:'.gallery-lb' });
  }

  /* ========== MASONRY REFRESH ========== */
  function refreshMasonry() {
    // CSS columns masonry doesn't need JS refresh, but we reflow
    const masonries = document.querySelectorAll('.gallery-masonry, .gallery-grid');
    masonries.forEach(m => { m.style.display = 'none'; void m.offsetHeight; m.style.display = ''; });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(refreshMasonry, 350));
  });

});
