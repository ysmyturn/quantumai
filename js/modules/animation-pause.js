// 기술 섹션 가시성에 따라 코어 신경망 애니메이션 일시정지/재생
function initAnimationPause() {
  // Pause core neural animation when section not visible
  const techSection = document.getElementById('technology');
  if (!techSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const coreEl = entry.target.querySelector('.neural-core');
      if (coreEl) {
        coreEl.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      }
    });
  }, { threshold: 0 });

  observer.observe(techSection);
}
