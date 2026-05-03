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
