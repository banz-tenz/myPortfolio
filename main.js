import './style.css'

const header = document.getElementById('header');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');

  const icon = themeToggle.querySelector('i');
  if (isDark) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  animateOnScroll();
});

function animateOnScroll() {
  const skillCards = document.querySelectorAll('.skill-card');
  const projectCards = document.querySelectorAll('.project-card');

  [...skillCards, ...projectCards].forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.85;

    if (cardTop < triggerPoint && !card.classList.contains('animate')) {
      card.classList.add('animate');

      if (card.classList.contains('skill-card')) {
        const progressBar = card.querySelector('.skill-progress');
        const progress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
          progressBar.style.width = progress + '%';
        }, 100);
      }
    }
  });
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);

  contactForm.reset();
});

animateOnScroll();
