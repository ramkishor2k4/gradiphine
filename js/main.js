/* -------------------------------------------------------------
   GRADIFINE - MAIN JAVASCRIPT
   Interactive functionality, modals, themes, counters
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll detection
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
    });

    // Close menu when clicking on any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
      });
    });
  }

  // 3. Dark / Light Theme Toggle
  const btnLight = document.getElementById('theme-light');
  const btnDark = document.getElementById('theme-dark');
  const currentTheme = localStorage.getItem('gradifine_theme') || 'dark';

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      btnDark.classList.add('active');
      btnLight.classList.remove('active');
      localStorage.setItem('gradifine_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      btnLight.classList.add('active');
      btnDark.classList.remove('active');
      localStorage.setItem('gradifine_theme', 'light');
    }
  }

  if (btnLight && btnDark) {
    setTheme(currentTheme);
    btnLight.addEventListener('click', () => setTheme('light'));
    btnDark.addEventListener('click', () => setTheme('dark'));
  }

  // 4. Pinned "GET IN TOUCH" Button & "Contact Us" buttons
  const getInTouchBtn = document.querySelector('.pinned-get-in-touch');
  const nameInput = document.getElementById('enquiry-name');
  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', () => {
      const footerForm = document.getElementById('contact-form');
      if (footerForm) {
        footerForm.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  }

  // 5. Stat Counter Animation
  const counters = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner-section');
  if (statsSection) {
    countObserver.observe(statsSection);
  }

  // 6. Project Lightbox Modal
  const projectCards = document.querySelectorAll('.project-card');
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const imgModalClose = document.getElementById('img-modal-close');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && imageModal && modalImg) {
        modalImg.src = img.src;
        imageModal.classList.add('open');
      }
    });
  });

  if (imgModalClose) {
    imgModalClose.addEventListener('click', () => {
      imageModal.classList.remove('open');
    });
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('open');
      }
    });
  }

  // 7. Contact Form Submission
  const enquiryForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-enquiry-btn');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting to Gradifine...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = '✓ Inquiry Sent Successfully!';
        submitBtn.style.background = '#25D366';
        submitBtn.style.color = '#FFFFFF';
        enquiryForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 4000);
      }, 1200);
    });
  }

  // 8. WhatsApp and Call triggers
  const whatsappBtn = document.querySelector('.floating-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.open('https://api.whatsapp.com/send?phone=919908398763&text=Hi%20Gradifine,%20I%20would%20like%20to%20discuss%20our%20digital%20marketing%20and%20branding%20goals.', '_blank');
    });
  }

  const phoneBtn = document.querySelector('.floating-phone');
  if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
      window.location.href = 'tel:+919908398763';
    });
  }
});
