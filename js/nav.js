// ===== NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(function (link) {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});
