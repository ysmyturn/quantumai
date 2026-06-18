// 서비스 카드 화면조회 모달 + 다중 이미지 캐러셀 오토스핀
function initServiceModal() {
  const MODALS = {
    'modal-sooni':  { title: 'sooni AICC', imgs: [
        { src: 'img/sooni-dashboard.png', label: '대시보드' },
        { src: 'img/sooni-consult.png',   label: '상담화면' },
    ] },
    'modal-qeepi':  { title: 'qeepi', imgs: [
        { src: 'img/qeepi-dashboard.png', label: '대시보드' },
        { src: 'img/qeepi-gathering.png', label: '데이터 수집' },
    ] },
    'modal-claimq': { title: 'claimi', imgs: [
        { src: 'img/claimq-review.png',    label: '심사화면' },
        { src: 'img/claimq-dashboard.png', label: '대시보드' },
    ] },
    'modal-agent':  { title: 'AI-Agent', imgs: [
        { src: 'img/agent-main.png',   label: '메인화면' },
        { src: 'img/agent-detail.png', label: '에이전트 상세' },
    ] },
  };

  const SPIN_INTERVAL = 4000; // 4초 간격 오토스핀

  const overlay = document.getElementById('svc-modal-overlay');
  const closeBtn = document.getElementById('svc-modal-close');
  const contentEl = document.getElementById('svc-modal-content');
  const boxEl = document.querySelector('.svc-modal-box');
  if (!overlay || !closeBtn || !contentEl) return;

  let spinTimer = null;

  function clearSpin() {
    if (spinTimer) { clearInterval(spinTimer); spinTimer = null; }
  }

  function openModal(id) {
    const data = MODALS[id];
    if (!data) return;
    clearSpin();

    // 이미지 목록 정규화 ({src,label} 객체 배열로 통일)
    let imgs = [];
    if (data.imgs) {
      imgs = data.imgs.map(function (it) {
        return typeof it === 'string' ? { src: it, label: '' } : it;
      });
    } else if (data.img) {
      imgs = [{ src: data.img, label: '' }];
    }
    const hasImg = imgs.length > 0;
    if (boxEl) boxEl.classList.toggle('is-wide', hasImg);

    let body;
    if (imgs.length >= 1) {
      const slides = imgs.map(function (it, i) {
        return `<img src="${it.src}" alt="${data.title} ${it.label || (i + 1)}" class="carousel-slide${i === 0 ? ' active' : ''}" loading="lazy" />`;
      }).join('');
      const dots = imgs.map(function (it, i) {
        return `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="${it.label || (i + 1) + '번째 화면'}"></button>`;
      }).join('');
      const showDots = imgs.length > 1 ? '' : ' style="display:none;"';
      const controls = imgs.length > 1
        ? `<div class="carousel-controls">
             <button class="carousel-nav carousel-prev" id="carousel-prev" aria-label="이전 화면" type="button">‹</button>
             <div class="carousel-dots"${showDots}>${dots}</div>
             <button class="carousel-nav carousel-next" id="carousel-next" aria-label="다음 화면" type="button">›</button>
           </div>`
        : `<div class="carousel-dots"${showDots}>${dots}</div>`;
      body = `
        <div class="modal-carousel" id="modal-carousel">
          <div class="carousel-track">${slides}</div>
          ${controls}
        </div>`;
    } else {
      body = `<div class="modal-placeholder">내용은 추후 제공 예정입니다</div>`;
    }

    const firstLabel = (imgs[0] && imgs[0].label) || '';
    contentEl.innerHTML = `
      <div class="modal-header">
        <span class="modal-title">${data.title}</span>
        <span class="modal-screen-label" id="modal-screen-label">${firstLabel}</span>
      </div>
      ${body}
      <p class="svc-modal-esc-hint">ESC 또는 바깥 영역을 클릭하면 닫힙니다</p>
    `;

    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();

    // 다중 이미지면 캐러셀 구동
    if (imgs.length > 1) initCarousel(imgs);
  }

  function initCarousel(imgs) {
    const count = imgs.length;
    const slides = contentEl.querySelectorAll('.carousel-slide');
    const dots = contentEl.querySelectorAll('.carousel-dot');
    const labelEl = contentEl.querySelector('#modal-screen-label');
    let idx = 0;

    function show(n) {
      idx = (n + count) % count;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      if (labelEl) labelEl.textContent = imgs[idx].label || '';
    }

    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }

    function start() { clearSpin(); spinTimer = setInterval(next, SPIN_INTERVAL); }

    // 도트 클릭 시 해당 화면으로 이동 + 타이머 재시작
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        show(parseInt(d.dataset.idx, 10));
        start();
      });
    });

    // 좌우 내비게이션 버튼
    const prevBtn = contentEl.querySelector('#carousel-prev');
    const nextBtn = contentEl.querySelector('#carousel-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); start(); });

    start(); // 무한 루프 오토스핀
  }

  function closeModal() {
    clearSpin();
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // 화면조회 버튼 + 미리보기 이미지 클릭
  document.querySelectorAll('.svc-view-btn, .svc-preview').forEach(function (el) {
    el.addEventListener('click', function () {
      openModal(el.dataset.modal);
    });
  });

  // 미리보기 이미지 키보드 접근 (Enter / Space)
  document.querySelectorAll('.svc-preview').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(el.dataset.modal);
      }
    });
  });

  // 닫기 버튼
  closeBtn.addEventListener('click', closeModal);

  // 오버레이 바깥 클릭
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // ESC 키
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) closeModal();
  });
}
