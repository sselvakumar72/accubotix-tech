/* ============================================================
   ACCUBOTIX — Global JavaScript
   ============================================================ */

/* ── Active nav link highlighting ── */
(function () {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentFile) {
      link.classList.add('active');
    }
  });
})();

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Contact form submission (stub — wire to backend) ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const original = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#1a4a6b';
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}

/* ── Hero image slider ── */
(function () {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) {
    return;
  }

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.parentElement.querySelectorAll('.hero-dot');
  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;
  slides.forEach(function (slide, i) {
    if (slide.classList.contains('active')) {
      currentIndex = i;
    }
  });

  function setActiveSlide(index) {
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
  }

  // Show a slide immediately on page load.
  setActiveSlide(currentIndex);

  setInterval(function () {
    currentIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(currentIndex);
  }, 3000);
})();

