// donations.js - Donations page behaviour
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nameEl = document.getElementById('donor-name');
  const emailEl = document.getElementById('donor-email');
  const amountEl = document.getElementById('amount');
  const freqEl = document.getElementById('frequency');
  if (!form) return;

  const style = document.createElement('style');
  style.textContent = `
    .quick-amounts { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:.75rem; }
    .quick-amounts button { padding:.4rem .9rem; border:1px solid #2e7d32; background:#fff; color:#2e7d32;
      border-radius:999px; cursor:pointer; font-weight:600; }
    .quick-amounts button.selected, .quick-amounts button:hover { background:#2e7d32; color:#fff; }
    .field-error { color:#c62828; font-size:.85rem; margin-top:.25rem; }
    .form-control.invalid { border-color:#c62828; }
    .form-message { margin-top:1rem; padding:.9rem 1rem; border-radius:6px; }
    .form-message.success { background:#e8f5e9; color:#1b5e20; border:1px solid #a5d6a7; }
    .copy-btn { margin-left:.5rem; padding:.1rem .6rem; font-size:.75rem; cursor:pointer;
      border:1px solid #2e7d32; background:#fff; color:#2e7d32; border-radius:4px; }
  `;
  document.head.appendChild(style);

  // ----- Quick amount buttons -----
  const quick = document.createElement('div');
  quick.className = 'quick-amounts';
  [100, 250, 500, 1000].forEach(v => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = `R${v}`;
    b.addEventListener('click', () => { amountEl.value = v; updateSelected(); updateSummary(); clearError(amountEl); });
    quick.appendChild(b);
  });
  amountEl.parentNode.insertBefore(quick, amountEl);

  function updateSelected() {
    quick.querySelectorAll('button').forEach(b => {
      b.classList.toggle('selected', b.textContent === `R${amountEl.value}`);
    });
  }

  // ----- Live summary -----
  const summary = document.createElement('p');
  summary.style.cssText = 'margin:0 0 1rem;font-weight:600;color:#2e7d32;';
  summary.setAttribute('aria-live', 'polite');
  freqEl.parentNode.after(summary);

  function updateSummary() {
    const amt = parseFloat(amountEl.value);
    if (!amt || amt < 10) { summary.textContent = ''; return; }
    const label = { once: 'one-time', monthly: 'per month', annually: 'per year' }[freqEl.value];
    const fmt = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amt);
    let text = `Your pledge: ${fmt} ${label}`;
    if (freqEl.value === 'monthly') {
      text += ` (${new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amt * 12)} per year)`;
    }
    summary.textContent = text;
  }
  amountEl.addEventListener('input', () => { updateSelected(); updateSummary(); });
  freqEl.addEventListener('change', updateSummary);

  // ----- Validation helpers -----
  function showError(el, msg) {
    clearError(el);
    el.classList.add('invalid');
    const p = document.createElement('div');
    p.className = 'field-error';
    p.textContent = msg;
    el.parentNode.appendChild(p);
  }
  function clearError(el) {
    el.classList.remove('invalid');
    const e = el.parentNode.querySelector('.field-error');
    if (e) e.remove();
  }
  [nameEl, emailEl, amountEl].forEach(el => el.addEventListener('input', () => clearError(el)));

  function validate() {
    let ok = true;
    if (nameEl.value.trim().length < 2) { showError(nameEl, 'Please enter your full name.'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) { showError(emailEl, 'Please enter a valid email address.'); ok = false; }
    const amt = parseFloat(amountEl.value);
    if (!amt || amt < 10) { showError(amountEl, 'Minimum pledge is R10.'); ok = false; }
    return ok;
  }

  // ----- Submit (no backend yet: confirm on-screen and keep a local record) -----
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const old = form.querySelector('.form-message');
    if (old) old.remove();
    if (!validate()) return;

    const pledge = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      amount: parseFloat(amountEl.value),
      frequency: freqEl.value,
      date: new Date().toISOString()
    };
    try {
      const all = JSON.parse(localStorage.getItem('ecoreach_pledges') || '[]');
      all.push(pledge);
      localStorage.setItem('ecoreach_pledges', JSON.stringify(all));
    } catch (_) { /* storage unavailable - ignore */ }

    const msg = document.createElement('div');
    msg.className = 'form-message success';
    msg.textContent = `Thank you, ${pledge.name.split(' ')[0]}! Your pledge has been registered. Our finance team will email ${pledge.email} with payment confirmation.`;
    form.appendChild(msg);
    form.reset();
    summary.textContent = '';
    updateSelected();
    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ----- Copy buttons for bank details -----
  document.querySelectorAll('.info-box .styled-list li').forEach(li => {
    const label = li.querySelector('strong');
    if (!label || !/Account Number|Branch Code/i.test(label.textContent)) return;
    const value = li.textContent.replace(label.textContent, '').trim();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = 'Copied!';
      } catch (_) {
        btn.textContent = 'Press Ctrl+C';
      }
      setTimeout(() => (btn.textContent = 'Copy'), 1800);
    });
    li.appendChild(btn);
  });

  // Footer year
  const bottom = document.querySelector('.footer-bottom p');
  if (bottom) bottom.innerHTML = bottom.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});
