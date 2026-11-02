// site.js - shared interactions used across the EcoReach website.
document.addEventListener('DOMContentLoaded', () => {
  // Update the displayed copyright year automatically.
  document.querySelectorAll('.footer-bottom p').forEach(p => {
    p.innerHTML = p.innerHTML.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`);
  });

  // Create one reusable image lightbox for images marked as gallery-image.
  const images = document.querySelectorAll('.gallery-image');
  if (images.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.hidden = true;
    lightbox.innerHTML = '<div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="Expanded image"><button type="button" class="lightbox-close" aria-label="Close image">&times;</button><img alt=""><p class="lightbox-caption"></p></div>';
    document.body.appendChild(lightbox);
    const largeImage = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    function openImage(image) {
      largeImage.src = image.src;
      largeImage.alt = image.alt;
      caption.textContent = image.alt;
      lightbox.hidden = false;
      closeButton.focus();
    }
    function closeImage() { lightbox.hidden = true; largeImage.removeAttribute('src'); }
    images.forEach(image => {
      image.addEventListener('click', () => openImage(image));
      image.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(image); }
      });
    });
    closeButton.addEventListener('click', closeImage);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeImage(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeImage(); });
  }
});
