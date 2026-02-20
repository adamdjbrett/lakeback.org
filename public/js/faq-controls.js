(() => {
    const expandBtn = document.querySelector('[data-faq-expand-all]');
    const collapseBtn = document.querySelector('[data-faq-close-all]');
    const items = document.querySelectorAll('#accordionFAQ .accordion-collapse');
    const buttons = document.querySelectorAll('#accordionFAQ .accordion-button');

    if (!items.length) return;

    const updateUI = (item, isOpen) => {
        item.classList.toggle('show', isOpen);
        const btn = document.querySelector(`[data-bs-target="#${item.id}"]`);
        if (btn) {
            btn.setAttribute('aria-expanded', isOpen);
            btn.classList.toggle('collapsed', !isOpen);
        }
    };

    expandBtn?.addEventListener('click', () => {
        items.forEach(item => updateUI(item, true));
    });

    collapseBtn?.addEventListener('click', () => {
        items.forEach(item => updateUI(item, false));
    });
})();