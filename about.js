// about.js - About page behaviour
document.addEventListener('DOMContentLoaded', () => {
  // Reveal cards on scroll
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
    #back-to-top { position: fixed; right: 1.25rem; bottom: 1.25rem; width: 44px; height: 44px;
      border: none; border-radius: 50%; background: #2e7d32; color: #fff; font-size: 1.25rem;
      cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.3); opacity: 0; pointer-events: none;
      transition: opacity .3s; z-index: 1000; }
    #back-to-top.show { opacity: 1; pointer-events: auto; }
    @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);

  const cards = document.querySelectorAll('.card');
  cards.forEach(c => c.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    cards.forEach(c => obs.observe(c));
  } else {
    cards.forEach(c => c.classList.add('visible'));
  }

  // Back-to-top button
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Footer year
  const bottom = document.querySelector('.footer-bottom p');
  if (bottom) bottom.innerHTML = bottom.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});
