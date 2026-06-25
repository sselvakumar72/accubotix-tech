/* ============================================================
   AccuBotix — Global JavaScript
   ============================================================ */

const BRAND_OBJECT = {
  plain: '<span class="brand-accu">Accu</span><span class="brand-botix">Botix</span>',
  highlight: '<span class="brand-highlight"><span class="brand-accu">Accu</span><span class="brand-botix">Botix</span></span>'
};

function getBrandMarkup(variant) {
  return BRAND_OBJECT[variant] || BRAND_OBJECT.plain;
}

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
    '    <a href="pipeline.html" class="hide-mobile">Pipeline</a>',
    '    <a href="pdi.html" class="hide-mobile">PDI</a>',
    '    <a href="about.html" class="hide-mobile">About</a>',
    '    <a href="contact.html" class="nav-cta">Request Demo</a>',
    '  </div>',
    '</nav>'
  ].join('');

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
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
    { href: 'pipeline.html', label: 'Pipeline Inspection', page: 'product' },
    { href: 'pdi.html', label: 'Partial Discharge Inspection', page: 'pdi' },
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
    '<div>&copy; 2026 ' + getBrandMarkup('highlight') + ' Technologix. &middot; Bengaluru, India</div>'
  ].join('');
})();

/* ── Reusable brand object renderer ── */
(function () {
  document.querySelectorAll('[data-brand]').forEach(function (node) {
    node.innerHTML = getBrandMarkup(node.getAttribute('data-brand'));
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

/* ── Contact form submission via EmailJS ── */
(function () {
  var contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Always intercept submit so the page never reloads / appends query params
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = contactForm.querySelector('.btn-primary');
    var original = btn.textContent;

    // Guard: EmailJS library must be loaded
    if (typeof emailjs === 'undefined') {
      btn.textContent = 'Email service unavailable ✗';
      btn.style.background = '#d9534f';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.background = '';
      }, 4000);
      console.error('EmailJS library not loaded.');
      return;
    }

    // Initialize EmailJS with your public key
    emailjs.init({ publicKey: 'aXVWJejZqQ3RC6JVV' });

    var inquiryType = document.getElementById('interest').value || 'Not specified';
    var formData = {
      name:     document.getElementById('name').value,
      company:  document.getElementById('company').value,
      email:    document.getElementById('email').value,
      phone:    document.getElementById('phone').value,
      interest: inquiryType,
      product:  document.getElementById('product') ? document.getElementById('product').value : 'Not specified',
      pipeline: document.getElementById('pipeline').value || 'Not provided',
      message:  document.getElementById('message').value,
      to_email: inquiryType === 'Request for Proposal' ? 'rfp@accubotix-tech.com' : 'inquiry@accubotix-tech.com'
    };

    btn.textContent = 'Sending…';
    btn.disabled = true;

    emailjs.send('service_l4fuv1h', 'template_clxht8n', formData)
      .then(function () {
        btn.textContent = 'Message sent ✓';
        btn.style.background = '#1a4a6b';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 4000);
      })
      .catch(function (error) {
        console.error('EmailJS Error:', error);
        btn.textContent = 'Failed to send ✗';
        btn.style.background = '#d9534f';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      });
  });
})();

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

  var autoPlay = setInterval(function () {
    currentIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(currentIndex);
  }, 3000);

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      currentIndex = i;
      setActiveSlide(currentIndex);
      // Reset the timer so auto-advance doesn't fire immediately after manual navigation
      clearInterval(autoPlay);
      autoPlay = setInterval(function () {
        currentIndex = (currentIndex + 1) % slides.length;
        setActiveSlide(currentIndex);
      }, 3000);
    });
  });
})();
