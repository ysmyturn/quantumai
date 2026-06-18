// 페이지 로더 생성 및 load 이벤트 후 페이드아웃 제거
function initLoader() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-inner">
      <div class="loader-logo">Quantum AI</div>
      <div class="loader-bar"><div class="loader-bar-fill"></div></div>
    </div>`;
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 500);
    }, 800);
  });
}
