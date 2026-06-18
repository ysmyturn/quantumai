// 압축 시각화 + active-nav 관련 키프레임/스타일 동적 주입
function injectCubeAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    .ba-step.ba-animate, .ba-center.ba-animate {
      animation: ba-rise 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    @keyframes ba-rise {
      0%   { transform: translateY(18px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .nav-link.active-nav {
      color: var(--text-primary);
    }
    .nav-link.active-nav::after {
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(style);
}
