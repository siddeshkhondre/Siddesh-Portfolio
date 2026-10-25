const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const nav = document.querySelector('.nav-links');
const navIndicator = document.querySelector('.nav-indicator');
const navLinks = [...document.querySelectorAll('.nav-links a')];
function moveNavIndicator(link) {
  if (!nav || !navIndicator || !link) return;
  const navRect = nav.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  navIndicator.style.width = `${linkRect.width}px`;
  navIndicator.style.transform = `translate(${linkRect.left - navRect.left}px, -50%)`;
}
navLinks.forEach((link) => link.addEventListener('click', () => moveNavIndicator(link)));
nav?.addEventListener('pointerleave', () => moveNavIndicator(navLinks.find((link) => link.getAttribute('aria-current') === 'location')));
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const current = navLinks.find((link) => link.hash === `#${entry.target.id}`);
    navLinks.forEach((link) => {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    moveNavIndicator(current);
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
window.addEventListener('resize', () => moveNavIndicator(navLinks.find((link) => link.hasAttribute('aria-current'))));
requestAnimationFrame(() => moveNavIndicator(navLinks[0]));

const carousel = document.querySelector('.project-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.project-slide')];
  const dots = [...carousel.querySelectorAll('.carousel-dot')];
  const currentSlide = carousel.querySelector('.current-slide');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let timer;
  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
    currentSlide.textContent = String(activeIndex + 1).padStart(2, '0');
  }
  function stopAutoplay() { window.clearInterval(timer); }
  function startAutoplay() {
    stopAutoplay();
    if (!reducedMotion.matches && !document.hidden) timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  }
  carousel.querySelectorAll('.carousel-arrow').forEach((button) => button.addEventListener('click', () => {
    showSlide(activeIndex + Number(button.dataset.direction));
    startAutoplay();
  }));
  dots.forEach((dot) => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.goTo));
    startAutoplay();
  }));
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener('visibilitychange', startAutoplay);
  reducedMotion.addEventListener('change', startAutoplay);
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) showSlide(activeIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
    if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
  });
  startAutoplay();
}
