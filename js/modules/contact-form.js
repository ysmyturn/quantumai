// 문의 폼 검증 + 제출 시뮬레이션 + 성공 오버레이 처리
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const overlay    = document.getElementById('form-success-overlay');
  const closeBtn   = document.getElementById('form-success-close');
  const submitBtn  = document.getElementById('submit-btn');

  if (!form) return;

  function openSuccess() {
    if (!overlay) return;
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeSuccess() {
    if (!overlay) return;
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSuccess);
  if (overlay) {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSuccess(); });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && !overlay.hasAttribute('hidden')) closeSuccess();
  });

  // Email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  // Field validation
  function validateField(field) {
    field.classList.remove('error');
    let valid = true;

    if (field.required && !field.value.trim()) {
      valid = false;
    }
    if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
      valid = false;
    }

    if (!valid) field.classList.add('error');
    return valid;
  }

  // Real-time validation
  form.querySelectorAll('.form-input').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const fields = Array.from(form.querySelectorAll('.form-input[required]'));
    const allValid = fields.every(field => validateField(field));

    if (!allValid) {
      // Focus first error field
      const firstError = form.querySelector('.form-input.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate submission
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    await new Promise(resolve => setTimeout(resolve, 1200));

    // 폼 리셋 후 완료 팝업 표시
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    openSuccess();
  });
}
