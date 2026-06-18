// 서비스 카드 높이 균등화 (로드/리사이즈 시 최대 높이로 통일)
function equalizeServiceCards() {
  const grid = document.querySelector('.services-grid');
  if (!grid) return;
  // 모바일(1열) 에서는 높이 리셋
  if (window.innerWidth <= 640) {
    grid.querySelectorAll('.service-card').forEach(c => c.style.height = '');
    return;
  }
  const cards = Array.from(grid.querySelectorAll('.service-card'));
  // 먼저 높이 초기화해서 자연 높이 측정
  cards.forEach(c => c.style.height = '');
  const maxH = Math.max(...cards.map(c => c.getBoundingClientRect().height));
  cards.forEach(c => c.style.height = maxH + 'px');
}

function initServiceCards() {
  // 로드 후 + 리사이즈 시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', equalizeServiceCards);
  } else {
    equalizeServiceCards();
  }
  window.addEventListener('resize', equalizeServiceCards);
}
