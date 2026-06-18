// 역량 리스트 항목 진입 시 좌측 슬라이드 스태거 인
function initCapabilityStagger() {
  const lists = document.querySelectorAll('.capability-list');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('li');
        items.forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-16px)';
          item.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  lists.forEach(list => observer.observe(list));
}
