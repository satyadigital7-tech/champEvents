/* ===================================
   CHAMP EVENTS — SCROLL ANIMATIONS
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== AOS INIT ========== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration:   800,
      easing:     'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      once:       true,
      mirror:     false,
      offset:     80,
      delay:      0,
    });
  }

  /* ========== GSAP SCROLL TRIGGERS ========== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section headers
    gsap.utils.toArray('.sec-header').forEach(el => {
      gsap.fromTo(el,
        { opacity:0, y:50 },
        {
          opacity:1, y:0, duration:0.9, ease:'power3.out',
          scrollTrigger: { trigger:el, start:'top 85%', once:true }
        }
      );
    });

    // Why cards stagger
    gsap.utils.toArray('.why-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:60 },
        {
          opacity:1, y:0, duration:0.7, ease:'power2.out',
          delay: i * 0.08,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

    // Event cards
    gsap.utils.toArray('.event-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:80, scale:0.95 },
        {
          opacity:1, y:0, scale:1, duration:0.9, ease:'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

    // About section
    const aboutImg = document.querySelector('.about-img-wrap');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg) {
      gsap.fromTo(aboutImg,
        { opacity:0, x:-60 },
        {
          opacity:1, x:0, duration:1, ease:'power3.out',
          scrollTrigger: { trigger:aboutImg, start:'top 80%', once:true }
        }
      );
    }
    if (aboutContent) {
      gsap.fromTo(aboutContent,
        { opacity:0, x:60 },
        {
          opacity:1, x:0, duration:1, ease:'power3.out',
          scrollTrigger: { trigger:aboutContent, start:'top 80%', once:true }
        }
      );
    }

    // Gallery items stagger
    gsap.utils.toArray('.gallery-item, .gallery-grid-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity:0, scale:0.9 },
        {
          opacity:1, scale:1, duration:0.6, ease:'power2.out',
          delay: (i % 6) * 0.07,
          scrollTrigger: { trigger:item, start:'top 90%', once:true }
        }
      );
    });

    // Stat items
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity:0, y:40 },
        {
          opacity:1, y:0, duration:0.7, ease:'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger:item, start:'top 85%', once:true }
        }
      );
    });

    // Testimonials
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:40, scale:0.97 },
        {
          opacity:1, y:0, scale:1, duration:0.7, ease:'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

    // Footer
    gsap.fromTo('.footer-grid > *',
      { opacity:0, y:40 },
      {
        opacity:1, y:0, duration:0.8, stagger:0.1, ease:'power2.out',
        scrollTrigger: { trigger:'.footer-grid', start:'top 85%', once:true }
      }
    );

    // Category sections
    gsap.utils.toArray('.category-gallery-wrap').forEach(wrap => {
      gsap.fromTo(wrap.querySelectorAll('.cat-img'),
        { opacity:0, scale:0.88 },
        {
          opacity:1, scale:1, duration:0.6, stagger:0.08, ease:'power2.out',
          scrollTrigger: { trigger:wrap, start:'top 82%', once:true }
        }
      );
    });

    // Birthday cards
    gsap.utils.toArray('.bday-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:50 },
        {
          opacity:1, y:0, duration:0.7, ease:'power3.out',
          delay: (i % 4) * 0.1,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

    // Photo service cards
    gsap.utils.toArray('.photo-service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:50 },
        {
          opacity:1, y:0, duration:0.7, ease:'power3.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

    // Service list cards
    gsap.utils.toArray('.service-list-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity:0, y:30 },
        {
          opacity:1, y:0, duration:0.5, ease:'power2.out',
          delay: (i % 4) * 0.07,
          scrollTrigger: { trigger:card, start:'top 88%', once:true }
        }
      );
    });

  }

  /* ========== INTERSECTION OBSERVER REVEALS ========== */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ========== STAGGER OBSERVER ========== */
  const staggerEls = document.querySelectorAll('.stagger-children');
  if (staggerEls.length) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.1 });

    staggerEls.forEach(el => staggerObserver.observe(el));
  }

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });

});
