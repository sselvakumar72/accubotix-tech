/* ============================================================
   AccuBotix — Global JavaScript
   ============================================================ */

/* ── Shared header + active nav state ── */
(function () {
  const headerMount = document.getElementById('site-header');
  if (!headerMount) {
    return;
  }

  headerMount.innerHTML = [
    '<nav>',
    '  <a href="index.html" class="nav-logo"><img src="images/logos/AccuBotix%20Logo-196x196.png" alt="AccuBotix" class="nav-logo-img" /></a>',
    '  <div class="nav-links">',
    '    <a href="index.html" class="hide-mobile">Home</a>',
    '    <a href="technology.html" class="hide-mobile">Technology</a>',
    '    <a href="product.html" class="hide-mobile">Product</a>',
    '    <a href="about.html" class="hide-mobile">About</a>',
    '    <a href="contact.html" class="nav-cta">Request Demo</a>',
    '  </div>',
    '</nav>'
  ].join('');

  const page = document.body.getAttribute('data-page');
  const currentFile = page ? page + '.html' : (window.location.pathname.split('/').pop() || 'index.html');
  headerMount.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
    }
  });
})();

/* ── Shared footer ── */
(function () {
  const footerMount = document.getElementById('site-footer');
  if (!footerMount) {
    return;
  }

  const page = document.body.getAttribute('data-page') || 'index';
  const links = [
    { href: 'index.html', label: 'Home', page: 'index' },
    { href: 'technology.html', label: 'Technology', page: 'technology' },
    { href: 'product.html', label: 'Product', page: 'product' },
    { href: 'about.html', label: 'About', page: 'about' },
    { href: 'contact.html', label: 'Contact', page: 'contact' }
  ];

  const footerLinks = links
    .filter(function (item) { return item.page !== page; })
    .map(function (item) { return '<a href="' + item.href + '">' + item.label + '</a>'; })
    .join('');

  footerMount.innerHTML = [
    '<a href="index.html" class="footer-logo">Accu<span class="footer-logo-botix">Botix</span></a>',
    '<div class="footer-links">' + footerLinks + '</div>',
    '<div>&copy; 2026 <span class="brand-highlight"><span class="brand-accu">Accu</span><span class="brand-botix">Botix</span></span>Technologix. &middot; Bengaluru, India</div>'
  ].join('');
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

