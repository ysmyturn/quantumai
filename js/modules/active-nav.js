// 스크롤 위치에 따라 현재 섹션의 네비 링크에 active-nav 표시
function initActiveNav() {
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // company.html: Company 드로어 링크 active 표시
  const isCompanyPage = window.location.pathname.includes('company.html');
  if (isCompanyPage) {
    drawerLinks.forEach(link => {
      if (link.getAttribute('href') === 'company.html') {
        link.classList.add('drawer-active');
      }
    });
    return;
  }

  function updateActive() {
    const scrollY = window.scrollY + 100;

    let current = sections.length ? sections[0].getAttribute('id') : '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active-nav');
    });

    drawerLinks.forEach(link => {
      link.classList.remove('drawer-active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('drawer-active');
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive(); // 페이지 로드 시 즉시 실행
}
