/* ===================================
   CHAMP EVENTS — MAIN JS
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== PRELOADER ========== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
      }, 500);
    });
    // Fallback
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
      }
    }, 3000);
    document.body.style.overflow = 'hidden';
  } else {
    initHeroAnimations();
  }

  /* ========== SCROLL PROGRESS ========== */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive:true });

  /* ========== NAVBAR SCROLL ========== */
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive:true });
  updateNavbar();

  /* Highlight active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ========== MOBILE MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  overlay.id = 'menu-overlay';
  document.body.appendChild(overlay);

  function toggleMenu(state) {
    const open = state !== undefined ? state : !navMenu.classList.contains('open');
    hamburger.classList.toggle('open', open);
    navMenu.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => toggleMenu());
    overlay.addEventListener('click', () => toggleMenu(false));
    // Close on nav link click (non-dropdown)
    navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
    // Mobile dropdown toggle (opens/closes on arrow click)
    navMenu.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parentLi = toggle.closest('.nav-item');
          const isOpen = parentLi.classList.contains('open');
          // Close all other open dropdowns first
          navMenu.querySelectorAll('.nav-item.open').forEach(li => li.classList.remove('open'));
          // Toggle this one
          if (!isOpen) parentLi.classList.add('open');
        }
      });
    });
    // Close dropdown + mobile menu when a dropdown link is clicked
    navMenu.querySelectorAll('.dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        // Remove 'open' from parent nav-item → arrow rotates back to 0°
        const parentLi = link.closest('.nav-item');
        if (parentLi) parentLi.classList.remove('open');
        // Close the full mobile menu
        toggleMenu(false);
      });
    });
    // Add mobile CTA buttons if not present
    if (!document.querySelector('.nav-mobile-cta') && window.innerWidth <= 1024) {
      const cta = document.createElement('div');
      cta.className = 'nav-mobile-cta';
      cta.innerHTML = `
        <a href="tel:+919666670066" class="btn btn-call"><i class="fas fa-phone"></i> +91 9666670066</a>
        <a href="https://wa.me/919666670066" class="btn btn-wa" target="_blank"><i class="fab fa-whatsapp"></i> WhatsApp Us</a>
        <a href="contact.html" class="btn btn-primary"><i class="fas fa-calendar-check"></i> Book Event</a>
      `;
      navMenu.appendChild(cta);
    }
  }

  /* ========== BACK TO TOP ========== */
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive:true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ========== HERO SLIDER ========== */
  initHeroSlider();

  /* ========== PARTICLES ========== */
  initParticles();

  /* ========== PAGE TRANSITIONS ========== */
  initPageTransitions();

  /* ========== RIPPLE BUTTONS ========== */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect  = this.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.4);
        width:20px; height:20px;
        left:${x-10}px; top:${y-10}px;
        animation:ripple 0.6s linear;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ========== LAZY IMAGES ========== */
  initLazyImages();

});

/* ========================================================
   HERO SLIDER
======================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;
  const INTERVAL = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  // Init
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
  startAuto();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Touch/swipe
  let touchStartX = 0;
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive:true });
    heroEl.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current+1 : current-1); startAuto(); }
    }, { passive:true });
  }
}

/* ========================================================
   HERO GSAP ANIMATIONS
======================================================== */
function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease:'power3.out' } });

  tl.fromTo('.hero-badge',
    { opacity:0, y:-30 },
    { opacity:1, y:0, duration:0.8 }
  )
  .fromTo('.hero-title',
    { opacity:0, y:60, skewY:5 },
    { opacity:1, y:0, skewY:0, duration:1 },
    '-=0.4'
  )
  .fromTo('.hero-subtitle',
    { opacity:0, y:40 },
    { opacity:1, y:0, duration:0.8 },
    '-=0.5'
  )
  .fromTo('.hero-btns .btn',
    { opacity:0, y:30, stagger:0.12 },
    { opacity:1, y:0, duration:0.7, stagger:0.12 },
    '-=0.4'
  )
  .fromTo('.hero-scroll',
    { opacity:0 },
    { opacity:1, duration:0.6 },
    '-=0.2'
  );

  // Navbar items
  gsap.fromTo('.nav-link', { opacity:0, y:-10 }, { opacity:1, y:0, duration:0.5, stagger:0.08, delay:0.5 });
  gsap.fromTo('.nav-btn',  { opacity:0, y:-10 }, { opacity:1, y:0, duration:0.5, stagger:0.08, delay:0.8 });
}

/* ========================================================
   PARTICLES
======================================================== */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const colors    = ['rgba(212,175,55,0.7)', 'rgba(247,232,200,0.5)', 'rgba(255,255,255,0.4)'];
  const COUNT     = 35;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const dur  = Math.random() * 8 + 4;
    const del  = Math.random() * 6;
    p.className = 'particle';
    p.style.cssText = `
      left:   ${Math.random() * 100}%;
      top:    ${Math.random() * 100}%;
      width:  ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --dur:   ${dur}s;
      --delay: ${del}s;
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(p);
  }
}

/* ========================================================
   PAGE TRANSITIONS
======================================================== */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  if (!overlay || typeof gsap === 'undefined') return;

  // Animate in on load
  gsap.fromTo(overlay,
    { y:'0%' },
    { y:'-100%', duration:0.8, ease:'power3.inOut', clearProps:'all' }
  );

  // Animate out on link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel') || href.startsWith('https') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', e => {
      const dest = link.href;
      if (dest === window.location.href) return;
      e.preventDefault();
      gsap.to(overlay, {
        y:'0%', duration:0.6, ease:'power3.inOut',
        onComplete: () => { window.location.href = dest; }
      });
    });
  });
}

/* ========================================================
   LAZY IMAGES
======================================================== */
function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { rootMargin:'200px' });

  images.forEach(img => {
    img.classList.add('lazy');
    observer.observe(img);
  });
}
