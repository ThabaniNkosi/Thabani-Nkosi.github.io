(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
  const yearNode = document.querySelector('[data-year]');

  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const setHeaderState = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeNav = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    navLinks.forEach((link) => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });
  }

  document.documentElement.classList.add('js-enhanced');
  const revealNodes = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px' });
    revealNodes.forEach((node) => { node.classList.add('reveal-ready'); revealObserver.observe(node); });
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('[data-category]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle('is-active', active);
        candidate.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        card.hidden = selected !== 'all' && !categories.includes(selected);
      });
    });
  });
})();

