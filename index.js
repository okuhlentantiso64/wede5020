// index.js - Home page behaviour
document.addEventListener('DOMContentLoaded', () => {
  // Reveal cards and sections as they scroll into view
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('.card, .intro-section, .hero-content');
  targets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      observer.observe(el);
    });
  } else {
    targets.forEach(el => el.classList.add('visible'));
  }

  // Footer year stays current
  const bottom = document.querySelector('.footer-bottom p');
  if (bottom) bottom.innerHTML = bottom.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});
