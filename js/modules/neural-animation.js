// Jeffri 탭 전환 시 신경망 연결 경로 그리기 애니메이션 재트리거
function initNeuralAnimation() {
  const jeffriTab = document.querySelector('[aria-controls="tab-jeffri"]');
  if (!jeffriTab) return;

  function triggerPathAnimation() {
    const paths = document.querySelectorAll('.conn-path');
    paths.forEach(path => {
      path.style.animation = 'none';
      void path.offsetWidth;
      path.style.animation = 'draw-path 2s ease forwards';
    });
  }

  jeffriTab.addEventListener('click', () => {
    setTimeout(triggerPathAnimation, 50);
  });

  // Initial trigger
  triggerPathAnimation();
}
