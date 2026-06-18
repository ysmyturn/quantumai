// 로고 월 박스 진입 시 스태거 페이드인
function initLogoWall() {
  const logos = document.querySelectorAll('.logo-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '0.65';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  logos.forEach(logo => {
    logo.style.opacity = '0';
    logo.style.transform = 'translateY(16px)';
    logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(logo);
  });
}
