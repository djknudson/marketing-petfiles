/* ==========================================================================
   PetFiles — Microinteractions (Scroll-driven brand, Dock carousel)
   ========================================================================== */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Utility: easeInOutCubic for smooth scroll-driven feel */
  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ========== 1. Scroll-driven nav brand resize ========== */
  /*
   * The nav brand is the ONE element — no duplicates, no crossfade.
   * At scroll=0 it's 1.5× its normal size and translated down into the
   * hero area (centered between nav bottom and badge top). On scroll it
   * shrinks to normal nav size and slides back up. We animate width/height
   * and fontSize directly (not CSS scale) so the SVG re-rasterizes crisp
   * at every size. A spacer in the hero collapses in sync.
   */

  var navBrand = document.querySelector('.nav__brand');
  var navLinks = document.querySelector('.nav__links');
  var spacer = document.querySelector('.hero__brand-spacer');
  var badge = document.querySelector('.hero__badge');
  var brandImg = navBrand ? navBrand.querySelector('img') : null;
  var brandText = navBrand ? navBrand.querySelector('span') : null;

  if (navBrand && spacer && badge && brandImg && brandText && !window.matchMedia('(max-width: 768px)').matches) {
    // Nav links gap endpoints
    var LINKS_GAP_SM = 32;   // --space-3xl (starting)
    var LINKS_GAP_LG = 72;   // spread out (ending)
    var SCROLL_RANGE = 300;
    var NAV_H = 72;

    // Size endpoints
    var ICON_SM = 36;
    var ICON_LG = 170;
    var FONT_SM = 20;   // --font-size-lg = 1.25rem
    var FONT_LG = Math.round(FONT_SM * (ICON_LG / ICON_SM));  // ~94
    var GAP_SM = 8;
    var GAP_LG = Math.round(GAP_SM * (ICON_LG / ICON_SM));    // ~38
    var SPACER_H = ICON_LG + 48;  // icon height + breathing room

    // Set spacer to full height, then measure positions to compute translateY
    spacer.style.maxHeight = SPACER_H + 'px';
    var navActions = document.querySelector('.nav__actions');
    var badgeTop = badge.getBoundingClientRect().top;
    var actionsBottom = navActions ? navActions.getBoundingClientRect().bottom : NAV_H;
    var brandRect = navBrand.getBoundingClientRect();
    var brandCenterY = brandRect.top + brandRect.height / 2;
    var targetCenterY = (actionsBottom + badgeTop) / 2;
    var START_Y = targetCenterY - brandCenterY;

    var lastY = -1;
    var brandRaf = null;

    function updateBrand() {
      var y = window.scrollY;
      if (y === lastY) { brandRaf = null; return; }
      lastY = y;

      // Brand and spacer on same scroll range
      var raw = Math.min(Math.max(y / 200, 0), 1);

      // Brand shrinks ahead of spacer — prevents badge/icon overlap
      var bp = ease(Math.min(raw * 1.35, 1));

      // Spacer follows just behind — standard easing
      var sp = ease(raw);

      // Nav links use the overall range for a smooth spread
      var lp = ease(Math.min(Math.max(y / SCROLL_RANGE, 0), 1));

      // Interpolate sizes (large → small) — brand progress
      var iconSize = ICON_LG - (ICON_LG - ICON_SM) * bp;
      var fontSize = FONT_LG - (FONT_LG - FONT_SM) * bp;
      var gap = GAP_LG - (GAP_LG - GAP_SM) * bp;
      var ty = START_Y * (1 - bp);

      // Set dimensions directly — SVG re-rasterizes crisp at every size
      brandImg.style.width = iconSize.toFixed(1) + 'px';
      brandImg.style.height = iconSize.toFixed(1) + 'px';
      brandText.style.fontSize = fontSize.toFixed(1) + 'px';
      navBrand.style.gap = gap.toFixed(1) + 'px';

      // translateY only for vertical positioning (no scale)
      navBrand.style.transform = 'translateY(' + ty.toFixed(1) + 'px)';

      // Spacer collapses slightly after brand — badge never catches the icon
      spacer.style.maxHeight = (SPACER_H * (1 - sp)).toFixed(1) + 'px';

      // Nav links spread out on the longer curve
      if (navLinks) {
        var linksGap = LINKS_GAP_SM + (LINKS_GAP_LG - LINKS_GAP_SM) * lp;
        navLinks.style.gap = linksGap.toFixed(1) + 'px';
      }

      brandRaf = null;
    }

    window.addEventListener('scroll', function () {
      if (!brandRaf) brandRaf = requestAnimationFrame(updateBrand);
    }, { passive: true });

    // Recalculate on resize (positions may shift)
    window.addEventListener('resize', function () {
      spacer.style.maxHeight = SPACER_H + 'px';
      badgeTop = badge.getBoundingClientRect().top;
      actionsBottom = navActions ? navActions.getBoundingClientRect().bottom : NAV_H;
      brandRect = navBrand.getBoundingClientRect();
      brandCenterY = brandRect.top + brandRect.height / 2;
      targetCenterY = (actionsBottom + badgeTop) / 2;
      START_Y = targetCenterY - brandCenterY;
      lastY = -1;
      updateBrand();
    }, { passive: true });

    // Initialize
    updateBrand();
  }

  /* ========== 2. Dock-style carousel ========== */

  var track = document.querySelector('.carousel__track');

  if (track && window.matchMedia('(hover: hover)').matches) {
    var slides = Array.from(track.querySelectorAll('.carousel__slide'));
    var frames = slides.map(function (s) { return s.querySelector('.device-frame'); });

    // Scale constants
    var S_CENTER = 1.08;     // center slide scale (scroll-based)
    var S_EDGE = 0.82;       // edge slide scale
    var S_DOCK = 1.18;       // max scale on hover (dock effect)
    var SIGMA = 150;          // Gaussian sigma for dock falloff (px)

    var hovering = false;
    var mouseX = 0;
    var dockRaf = null;

    // Calculate scales based on each slide's proximity to track center
    function scrollScales() {
      var rect = track.getBoundingClientRect();
      var center = rect.left + rect.width / 2;
      var maxDist = rect.width * 0.45;

      return slides.map(function (slide) {
        var sr = slide.getBoundingClientRect();
        var sc = sr.left + sr.width / 2;
        var prox = Math.max(0, 1 - Math.abs(sc - center) / maxDist);
        return S_EDGE + (S_CENTER - S_EDGE) * prox * prox;
      });
    }

    // Dock hover: Gaussian falloff from cursor position
    function dockScales(mx) {
      return slides.map(function (slide) {
        var sr = slide.getBoundingClientRect();
        var sc = sr.left + sr.width / 2;
        var dist = Math.abs(mx - sc);
        var gauss = Math.exp(-0.5 * Math.pow(dist / SIGMA, 2));
        return S_EDGE + (S_DOCK - S_EDGE) * gauss;
      });
    }

    // Apply computed scales and opacity to device frames
    function apply(scales) {
      frames.forEach(function (f, i) {
        if (!f) return;
        f.style.transform = 'scale(' + scales[i].toFixed(4) + ')';
        // Subtle opacity: edges slightly dimmed for depth
        var t = (scales[i] - S_EDGE) / (S_DOCK - S_EDGE);
        f.style.opacity = (0.6 + 0.4 * t).toFixed(3);
      });
    }

    function refresh() {
      apply(hovering ? dockScales(mouseX) : scrollScales());
      dockRaf = null;
    }

    function scheduleRefresh() {
      if (!dockRaf) dockRaf = requestAnimationFrame(refresh);
    }

    // --- Mouse events for dock magnification ---
    // Only enable dock hover on devices with hover capability (not touch)
    if (window.matchMedia('(hover: hover)').matches) {
      track.addEventListener('mousemove', function (e) {
        hovering = true;
        mouseX = e.clientX;
        scheduleRefresh();
      });

      track.addEventListener('mouseleave', function () {
        hovering = false;
        scheduleRefresh();
      });
    }

    // --- Scroll + resize for center-based scaling ---
    track.addEventListener('scroll', scheduleRefresh, { passive: true });
    window.addEventListener('resize', scheduleRefresh, { passive: true });

    // Initialize
    refresh();
  }
})();
