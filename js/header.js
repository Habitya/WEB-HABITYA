// Cambio de logo y fondo al hacer scroll
document.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  header.classList.toggle('scrolled', window.scrollY > 80);
});

// Toggle menú mobile
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

