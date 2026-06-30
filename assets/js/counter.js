/* ===================================
   CHAMP EVENTS — COUNTER ANIMATION
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  function animateCounter(el, target, duration, suffix) {
    let start     = 0;
    const step    = target / (duration / 16);
    const timer   = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start) + suffix;
    }, 16);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          const el       = entry.target;
          const target   = parseInt(el.dataset.count, 10);
          const suffix   = el.dataset.suffix || '';
          const duration = parseInt(el.dataset.duration || 2000, 10);
          el.dataset.counted = 'true';
          animateCounter(el, target, duration, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  initCounters();

});
