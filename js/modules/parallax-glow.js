// 마우스 이동에 따른 히어로 글로우 패럴랙스 이동
function initParallaxGlow() {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }, { passive: true });
}
