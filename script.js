(() => {
  const hero = document.querySelector('.hero');
  if (hero) hero.remove();

  const links = Array.from(document.querySelectorAll('a[href^="#"]'));
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealTargets = Array.from(document.querySelectorAll('.section-heading,.copy,.origin-grid,.heritage-grid,.transition-grid,.principles-grid,.feature-image,.two-image-grid,.role-grid,.application-block,.signature,.legal'));
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px' });

  revealTargets.forEach((el) => observer.observe(el));
})();