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

  // 3. Pinned "GET IN TOUCH" Button & "Contact Us" buttons
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

  // 9. Interactive Stacked Team ID Card Deck
  const teamDeck = document.getElementById('teamDeck');
  const teamCards = Array.from(document.querySelectorAll('.team-card'));
  const teamPrevBtn = document.getElementById('teamPrevBtn');
  const teamNextBtn = document.getElementById('teamNextBtn');
  const teamCounterCurrent = document.getElementById('teamCounterCurrent');

  if (teamDeck && teamCards.length > 0) {
    let activeIndex = 0;
    const totalCards = teamCards.length;
    let isAnimating = false;

    function renderPositions(direction = null, oldIndex = null) {
      teamCards.forEach((card, index) => {
        // Calculate relative offset in stack: 0 is front, 1 is behind 1, etc.
        const relPos = (index - activeIndex + totalCards) % totalCards;

        // Remove old position and exit classes
        card.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-3', 'exiting-next', 'exiting-prev');

        if (direction === 'next' && index === oldIndex) {
          // Play flying exit animation
          card.classList.add('exiting-next');
          setTimeout(() => {
            card.classList.remove('exiting-next');
            card.classList.add(`pos-${relPos}`);
          }, 240);
        } else if (direction === 'prev' && relPos === 0) {
          // Swoop in from rear
          card.classList.add('exiting-prev');
          setTimeout(() => {
            card.classList.remove('exiting-prev');
            card.classList.add('pos-0');
          }, 50);
        } else {
          card.classList.add(`pos-${relPos}`);
        }
      });

      if (teamCounterCurrent) {
        teamCounterCurrent.textContent = String(activeIndex + 1).padStart(2, '0');
      }
    }

    function nextCard() {
      if (isAnimating) return;
      isAnimating = true;
      const oldIndex = activeIndex;
      activeIndex = (activeIndex + 1) % totalCards;
      renderPositions('next', oldIndex);
      setTimeout(() => { isAnimating = false; }, 480);
    }

    function prevCard() {
      if (isAnimating) return;
      isAnimating = true;
      const oldIndex = activeIndex;
      activeIndex = (activeIndex - 1 + totalCards) % totalCards;
      renderPositions('prev', oldIndex);
      setTimeout(() => { isAnimating = false; }, 480);
    }

    if (teamNextBtn) teamNextBtn.addEventListener('click', nextCard);
    if (teamPrevBtn) teamPrevBtn.addEventListener('click', prevCard);

    // Clicking individual cards
    teamCards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        // Don't trigger card flip if user is clicking an external social link or email
        if (e.target.closest('a') || e.target.closest('button')) return;

        const relPos = (index - activeIndex + totalCards) % totalCards;
        if (relPos === 0) {
          // Clicking front card cycles to next
          nextCard();
        } else {
          // Clicking a peeking card promotes it directly to front
          if (isAnimating) return;
          isAnimating = true;
          activeIndex = index;
          renderPositions('next');
          setTimeout(() => { isAnimating = false; }, 480);
        }
      });
    });

    // Touch Swipe Support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    teamDeck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    teamDeck.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only trigger if horizontal swipe is dominant
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextCard(); // Swipe left -> Next
        } else {
          prevCard(); // Swipe right -> Previous
        }
      }
    }, { passive: true });

    // Keyboard navigation when viewing the team deck
    window.addEventListener('keydown', (e) => {
      const rect = teamDeck.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    });
  }
});
