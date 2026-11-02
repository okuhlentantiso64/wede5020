// services.js - Services & Initiatives page behaviour
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('main .grid-2');
  const cards = Array.from(document.querySelectorAll('.service-card'));
  if (!grid || !cards.length) return;

  // Inject a search box above the grid
  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-bottom:1.5rem;';
  wrap.innerHTML = `
    <label for="service-search" style="display:block;font-weight:600;margin-bottom:.4rem;">Search our programs:</label>
    <input type="search" id="service-search" class="form-control" placeholder="e.g. recycling, schools, cleanup...">
    <p id="service-count" aria-live="polite" style="margin-top:.5rem;color:#555;"></p>
  `;
  grid.parentNode.insertBefore(wrap, grid);

  const input = wrap.querySelector('#service-search');
  const count = wrap.querySelector('#service-count');

  const noResults = document.createElement('p');
  noResults.textContent = 'No programs match your search. Try a different keyword.';
  noResults.style.cssText = 'display:none;text-align:center;margin:2rem 0;';
  grid.parentNode.insertBefore(noResults, grid.nextSibling);

  function filter() {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = !q || card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    noResults.style.display = visible ? 'none' : 'block';
    count.textContent = q ? `${visible} of ${cards.length} programs shown` : '';
  }
  input.addEventListener('input', filter);

  // Collapse long descriptions with a "Read more" toggle on small screens
  cards.forEach(card => {
    const p = card.querySelector('.service-content p');
    if (!p) return;
    p.style.transition = 'max-height .3s ease';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'btn btn-secondary';
    toggle.style.cssText = 'margin-top:.75rem;padding:.35rem .9rem;font-size:.85rem;display:none;';
    toggle.textContent = 'Read more';
    p.after(toggle);

    function setup() {
      const small = window.matchMedia('(max-width: 600px)').matches;
      if (small) {
        p.style.cssText += 'overflow:hidden;max-height:4.5em;';
        toggle.style.display = 'inline-block';
        toggle.textContent = 'Read more';
      } else {
        p.style.overflow = '';
        p.style.maxHeight = '';
        toggle.style.display = 'none';
      }
    }
    toggle.addEventListener('click', () => {
      const expanded = p.style.maxHeight === 'none';
      p.style.maxHeight = expanded ? '4.5em' : 'none';
      toggle.textContent = expanded ? 'Read more' : 'Show less';
    });
    setup();
    window.addEventListener('resize', setup);
  });

  // Footer year
  const bottom = document.querySelector('.footer-bottom p');
  if (bottom) bottom.innerHTML = bottom.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});
