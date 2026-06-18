// 압축 패널 before/after 스텝 진입 스태거 애니메이션
function initCompressionAnimation() {
  const compressionPanel = document.getElementById('tab-compression');
  if (!compressionPanel) return;

  const items = compressionPanel.querySelectorAll('.ba-step, .ba-center');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((el, i) => {
          el.style.animationDelay = `${i * 0.18}s`;
          el.classList.add('ba-animate');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(compressionPanel);
}
