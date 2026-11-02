// contact.js - validates the contact form and prepares an email for the user.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const nameEl = document.getElementById('contact-name');
  const emailEl = document.getElementById('contact-email');
  const typeEl = document.getElementById('message-type');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');
  const recipient = 'info@ecoreach.org.za';
  const MAX = 1000;
  messageEl.maxLength = MAX;

  const counter = document.createElement('p');
  counter.className = 'char-count';
  counter.setAttribute('aria-live', 'polite');
  messageEl.insertAdjacentElement('afterend', counter);
  const updateCount = () => counter.textContent = `${messageEl.value.length} / ${MAX} characters`;
  messageEl.addEventListener('input', updateCount); updateCount();

  function clearError(el) {
    el.classList.remove('invalid');
    const old = el.parentElement.querySelector('.field-error');
    if (old) old.remove();
  }
  function showError(el, text) {
    clearError(el); el.classList.add('invalid');
    const error = document.createElement('p'); error.className = 'field-error';
    error.textContent = text; el.insertAdjacentElement('afterend', error);
  }
  [nameEl,emailEl,typeEl,subjectEl,messageEl].forEach(el => el.addEventListener('input', () => clearError(el)));
  typeEl.addEventListener('change', () => clearError(typeEl));

  form.addEventListener('submit', event => {
    event.preventDefault();
    [nameEl,emailEl,typeEl,subjectEl,messageEl].forEach(clearError);
    let valid = true;
    if (nameEl.value.trim().length < 2) { showError(nameEl,'Please enter your full name.'); valid=false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) { showError(emailEl,'Please enter a valid email address.'); valid=false; }
    if (!typeEl.value) { showError(typeEl,'Please select a message type.'); valid=false; }
    if (subjectEl.value.trim().length < 3) { showError(subjectEl,'Please enter a subject of at least 3 characters.'); valid=false; }
    if (messageEl.value.trim().length < 10) { showError(messageEl,'Please enter a message of at least 10 characters.'); valid=false; }
    if (!valid) { form.querySelector('.invalid').focus(); return; }

    const subject = encodeURIComponent(subjectEl.value.trim());
    const body = encodeURIComponent(
      `Name: ${nameEl.value.trim()}\nEmail: ${emailEl.value.trim()}\nMessage type: ${typeEl.value}\n\nMessage:\n${messageEl.value.trim()}`
    );
    const status = document.getElementById('contact-status');
    status.hidden = false;
    status.textContent = 'Your email application should open with the message prepared. Review it and press Send to email EcoReach.';
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
