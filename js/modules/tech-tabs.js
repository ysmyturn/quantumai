// 기술 탭 전환 + 키보드 화살표 네비게이션 + 패널 재애니메이션
function initTechTabs() {
  const tabs   = document.querySelectorAll('.tech-tab');
  const panels = document.querySelectorAll('.tech-panel');

  function activateTab(tab) {
    const targetId = tab.getAttribute('aria-controls');

    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels
    panels.forEach(panel => {
      if (panel.id === targetId) {
        panel.removeAttribute('hidden');
        panel.classList.add('active');
        // Trigger re-animation
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      } else {
        panel.setAttribute('hidden', '');
        panel.classList.remove('active');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));

    // Keyboard navigation
    tab.addEventListener('keydown', (e) => {
      const currentIndex = Array.from(tabs).indexOf(tab);
      let nextIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      }
    });
  });
}
