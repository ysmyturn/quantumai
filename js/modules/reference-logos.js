// data-logo 경로가 채워진 .logo-box 를 자동으로 <img> 로 렌더링
function initReferenceLogos() {
  const boxes = document.querySelectorAll('.logo-box[data-logo]');
  boxes.forEach(function (box) {
    const src = (box.dataset.logo || '').trim();
    if (!src) return;

    const nameEl = box.querySelector('.logo-name');
    const alt = nameEl ? nameEl.textContent.trim() : 'client logo';

    const img = document.createElement('img');
    img.alt = alt;
    img.onerror = function () {
      box.removeChild(img);
    };
    box.innerHTML = '';
    box.appendChild(img);
    img.src = src; // DOM에 삽입한 뒤 src 지정 → lazy 지연 없이 즉시 fetch
  });
}
