// Accordion toggle logic
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.accordion-item')?.classList.toggle('active'));
});

// In-view fade animation for header
const header = document.querySelector('.faq-header');
if (header) {
  const reveal = () => {
    if (header.getBoundingClientRect().top < window.innerHeight - 100) {
      header.classList.add('visible');
      window.removeEventListener('scroll', reveal);
    }
  };
  window.addEventListener('scroll', reveal);
  reveal(); // trigger check on load
}
