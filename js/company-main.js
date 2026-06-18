'use strict';

initNavigation();
initScrollReveal();
initCounters();
initCardGlow();
initActiveNav();
initAnimationPause();
initParallaxGlow();
initFocusTrap();

document.addEventListener('DOMContentLoaded', () => {
  window.dispatchEvent(new Event('scroll'));
});
