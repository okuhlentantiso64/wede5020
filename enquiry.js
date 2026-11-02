// enquiry.js - checks the enquiry details and displays relevant next-step information.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const result = document.getElementById('enquiry-result');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('enquiry-name');
    const email = document.getElementById('enquiry-email');
    const kind = document.getElementById('enquiry-kind');
    const message = document.getElementById('enquiry-message');
    [name,email,kind,message].forEach(el => el.classList.remove('invalid'));
    if (!form.checkValidity()) {
      form.reportValidity();
      const invalid = form.querySelector(':invalid');
      if (invalid) invalid.classList.add('invalid');
      return;
    }
    const guidance = {
      service: 'Thank you for asking about our services. Programme dates, availability and any applicable costs must be confirmed with our team.',
      volunteer: 'Thank you for your interest in volunteering. Our team can advise you about upcoming activities, available places and participation requirements.',
      sponsor: 'Thank you for considering a partnership. Our team can discuss sponsorship options, project needs and suitable arrangements.'
    };
    result.hidden = false;
    result.className = 'form-message success';
    result.textContent = `Thank you, ${name.value.trim()}! ${guidance[kind.value]} Please email info@ecoreach.org.za if you need a direct response.`;
  });
});
