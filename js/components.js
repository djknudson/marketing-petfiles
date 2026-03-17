/* ==========================================================================
   PetFiles — Component JS (Accordion, Carousel, Pricing Toggle)
   ========================================================================== */

(function () {
  'use strict';

  /* ---- FAQ Accordion (single-open) ---- */
  const accordion = document.querySelector('.accordion');
  if (accordion) {
    const items = accordion.querySelectorAll('.accordion__item');

    items.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach(other => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  /* ---- Screenshot Carousel ---- */
  const carouselTrack = document.querySelector('.carousel__track');
  const carouselDots = document.querySelectorAll('.carousel__dot');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');

  if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel__slide');
    let currentSlide = 0;

    function updateCarousel(index, behavior) {
      if (index < 0) index = 0;
      if (index >= slides.length) index = slides.length - 1;
      currentSlide = index;

      // Scroll within the track only — never moves the page vertically
      var slide = slides[index];
      var trackRect = carouselTrack.getBoundingClientRect();
      var slideRect = slide.getBoundingClientRect();
      var scrollTarget = carouselTrack.scrollLeft + (slideRect.left + slideRect.width / 2) - (trackRect.left + trackRect.width / 2);
      carouselTrack.scrollTo({
        left: scrollTarget,
        behavior: behavior || 'smooth'
      });

      // Update active states
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      carouselDots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    // Dot click
    carouselDots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateCarousel(i));
    });

    // Prev / Next
    if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));

    // Sync dots on manual scroll
    if ('IntersectionObserver' in window) {
      const slideObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const index = Array.from(slides).indexOf(entry.target);
              if (index >= 0) {
                currentSlide = index;
                slides.forEach((s, i) => s.classList.toggle('active', i === index));
                carouselDots.forEach((d, i) => d.classList.toggle('active', i === index));
              }
            }
          });
        },
        { root: carouselTrack, threshold: 0.6 }
      );

      slides.forEach(slide => slideObserver.observe(slide));
    }

    // Initialize first slide (instant — no page scroll)
    updateCarousel(0, 'instant');
  }

  /* ---- Pricing Toggle ---- */
  const pricingSwitch = document.querySelector('.pricing-toggle__switch');
  const monthlyLabel = document.querySelector('.pricing-toggle__label--monthly');
  const annualLabel = document.querySelector('.pricing-toggle__label--annual');
  const monthlyPrices = document.querySelectorAll('.price--monthly');
  const annualPrices = document.querySelectorAll('.price--annual');

  if (pricingSwitch) {
    let isAnnual = false;

    function updatePricing() {
      pricingSwitch.classList.toggle('active', isAnnual);
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

      monthlyPrices.forEach(el => {
        el.style.display = isAnnual ? 'none' : '';
        if (!isAnnual) el.classList.add('price-animate');
      });

      annualPrices.forEach(el => {
        el.style.display = isAnnual ? '' : 'none';
        if (isAnnual) el.classList.add('price-animate');
      });

      // Remove animation class after it completes
      setTimeout(() => {
        monthlyPrices.forEach(el => el.classList.remove('price-animate'));
        annualPrices.forEach(el => el.classList.remove('price-animate'));
      }, 400);
    }

    pricingSwitch.addEventListener('click', () => {
      isAnnual = !isAnnual;
      updatePricing();
    });

    // Initialize
    updatePricing();
  }

  /* ---- Screenshot Modal ---- */
  var screenshotModal = null;
  var screenshotModalImg = null;

  function createScreenshotModal() {
    screenshotModal = document.createElement('div');
    screenshotModal.className = 'screenshot-modal';
    screenshotModal.setAttribute('role', 'dialog');
    screenshotModal.setAttribute('aria-label', 'Screenshot preview');

    screenshotModalImg = document.createElement('img');
    screenshotModalImg.className = 'screenshot-modal__img';
    screenshotModal.appendChild(screenshotModalImg);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'screenshot-modal__close';
    closeBtn.setAttribute('aria-label', 'Close preview');
    closeBtn.innerHTML = '&times;';
    screenshotModal.appendChild(closeBtn);

    document.body.appendChild(screenshotModal);

    screenshotModal.addEventListener('click', function (e) {
      if (e.target !== screenshotModalImg) {
        closeScreenshotModal();
      }
    });

    closeBtn.addEventListener('click', closeScreenshotModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && screenshotModal.classList.contains('active')) {
        closeScreenshotModal();
      }
    });
  }

  function openScreenshotModal(src, alt) {
    if (!screenshotModal) createScreenshotModal();
    screenshotModalImg.src = src;
    screenshotModalImg.alt = alt || 'Screenshot preview';
    // Force reflow so the transition plays on first open
    screenshotModal.offsetHeight;
    screenshotModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeScreenshotModal() {
    if (!screenshotModal) return;
    screenshotModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach click-to-expand on carousel slides
  if (carouselTrack) {
    carouselTrack.querySelectorAll('.carousel__slide').forEach(function (slide) {
      slide.style.cursor = 'zoom-in';
      slide.addEventListener('click', function () {
        var img = slide.querySelector('.device-frame__screen img');
        if (img) openScreenshotModal(img.src, img.alt);
      });
    });
  }
})();
