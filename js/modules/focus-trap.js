// 모바일 드로어 내 Tab 포커스 트랩
function initFocusTrap() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;

  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
