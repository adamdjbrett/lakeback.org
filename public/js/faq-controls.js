(() => {
  const faqRoots = document.querySelectorAll('[data-faq-controls="true"]');
  if (!faqRoots.length) return;

  faqRoots.forEach((root) => {
    const expandAllButton = root.querySelector('[data-faq-expand-all]');
    const closeAllButton = root.querySelector('[data-faq-close-all]');
    const collapseItems = root.querySelectorAll('.accordion-collapse');

    if (!expandAllButton || !closeAllButton || !collapseItems.length) return;

    const setOpenState = (open) => {
      collapseItems.forEach((item) => {
        item.classList.remove('collapsing');
        item.classList.toggle('show', open);
        item.style.height = '';
        item.style.overflow = '';

        const toggle = root.querySelector(`[data-bs-target="#${item.id}"]`);
        if (!toggle) return;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.classList.toggle('collapsed', !open);
      });
    };

    expandAllButton.addEventListener('click', () => setOpenState(true));
    closeAllButton.addEventListener('click', () => setOpenState(false));
  });
})();
