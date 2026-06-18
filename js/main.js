/**
 * Quantum AI — Main JavaScript (엔트리)
 *
 * 각 모듈(js/modules/*.js)은 index.html 에서 classic <script> 로 먼저 로드되어
 * 전역 init 함수를 정의한다. 이 파일은 그 init 들을 원래 순서대로 호출한다.
 * (ES module 아님 — file:// 직접 열기에서도 동작. 배포는 nginx/http.)
 */
'use strict';

initLoader();
initParticles();
initNavigation();
initScrollReveal();
initCounters();
initTechTabs();
initContactForm();
initCardGlow();
initCompressionAnimation();
initNeuralAnimation();
initActiveNav();
initAnimationPause();
initLogoWall();
initParallaxGlow();
initTechReveal();
initCapabilityStagger();
initFocusTrap();
injectCubeAnimation();

// ─── INITIALIZE ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Trigger scroll check on load (for elements already in view)
  window.dispatchEvent(new Event('scroll'));

  console.log('%c퀀텀에이아이™ — Proprietary AI Technology',
    'color: #00D4FF; font-size: 14px; font-weight: bold; font-family: monospace;');
  console.log('%cJeffri™ | Data2Vec™ | Ultra Compression',
    'color: #A855F7; font-size: 12px; font-family: monospace;');
});

initHeroQuantum();
initServiceCards();
initServiceModal();
initReferenceLogos();
