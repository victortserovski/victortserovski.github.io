/* Victor Tserovski — portfolio interactions
 * Minimal JS: reveal-on-scroll + click-to-copy contact card.
 * (Smooth scroll is handled by CSS scroll-behavior; honors prefers-reduced-motion.)
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Reveal on scroll ---- */
  const revealTargets = document.querySelectorAll(
    '.section__title, .section__lead, .toolbelt-grid, .note, .project, .contact-list'
  );

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ---- Count-up animation ---- */
  const countUpTargets = document.querySelectorAll('[data-countup]');

  function animateCountUp(el, target) {
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Numbers stay as-is (already showing final values)
  } else {
    // Set initial display to 0
    countUpTargets.forEach((el) => { el.textContent = '0'; });

    const countUpObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.countup, 10);
            animateCountUp(el, target);
            countUpObserver.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.3 }
    );
    countUpTargets.forEach((el) => countUpObserver.observe(el));
  }

  /* ---- Email copy confetti ---- */
  function spawnConfetti(originEl) {
    if (prefersReducedMotion) return;

    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#3b82f6', '#60a5fa', '#e88da0', '#f59e0b', '#10b981', '#8b7355'];
    const count = 7;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'confetti-particle';
      particle.style.left = cx + 'px';
      particle.style.top = cy + 'px';
      particle.style.background = colors[i % colors.length];

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const distance = 25 + Math.random() * 45;
      particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--ty', (Math.sin(angle) * distance + 20) + 'px');
      particle.style.setProperty('--rot', (Math.random() * 360) + 'deg');

      document.body.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    }
  }

  /* ---- Click-to-copy contact card ---- */
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      const hint = btn.querySelector('[data-hint-default]');
      const copied = hint?.dataset.hintCopied || 'Copied ✓';
      const original = hint?.dataset.hintDefault || hint?.textContent || '';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback: hidden textarea + execCommand
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        btn.classList.add('is-copied');
        if (hint) hint.textContent = copied;
        spawnConfetti(btn);
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (hint) hint.textContent = original;
        }, 1800);
      } catch (e) {
        if (hint) hint.textContent = 'Copy blocked — select manually';
      }
    });
  });

  /* ---- Set current year in footer (if a placeholder exists) ---- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
