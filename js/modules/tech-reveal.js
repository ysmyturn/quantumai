// 기술 섹션 진입 시 내부 .reveal-up 요소 순차 노출
function initTechReveal() {
  const techSection = document.querySelector('.tech-section');
  if (!techSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('is-visible'), i * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(techSection);
}
