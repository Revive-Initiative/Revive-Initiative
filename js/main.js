// Revive Initiative — shared site behavior (nav, mobile menu, reveal-on-scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Mobile nav toggle
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('flex');
            menu.classList.toggle('hidden');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Mark current page in nav
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === path) {
            link.classList.add('text-brand-green', 'font-semibold');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Subtle reveal-on-scroll (respects prefers-reduced-motion via CSS)
    const revealEls = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // Footer year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form (frontend-only demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('contact-status');
            status.textContent = 'Thank you — your message has been received. This form is not yet connected to email delivery.';
            status.classList.remove('hidden');
            contactForm.reset();
        });
    }
});
