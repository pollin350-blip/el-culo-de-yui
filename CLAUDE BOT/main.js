/* ============================================
   MISTIC MARKETING — main.js
   Animaciones, scroll reveal, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. Scroll Reveal ───────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ── 2. Mobile Menu ─────────────────────── */
    const toggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }


    /* ── 3. Navbar scroll shadow ────────────── */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 24px rgba(26,107,124,.12)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });


    /* ── 4. Active nav link highlight ──────── */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--blue)' : '';
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));


    /* ── 5. Contact Form ────────────────────── */
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('#name')?.value.trim();
            const business = form.querySelector('#business')?.value.trim();
            const message = form.querySelector('#message')?.value.trim();

            if (!name || !business || !message) return;

            // Redirect to WhatsApp with prefilled message
            const text = encodeURIComponent(
                `¡Hola Mistic! 👋\n\nSoy *${name}* de *${business}*.\n\n${message}`
            );
            window.open(`https://wa.me/51934541428?text=${text}`, '_blank');

            // Reset form with feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ ¡Mensaje enviado!';
            btn.style.background = '#25d366';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }


    /* ── 6. Smooth scroll for anchor links ──── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    /* ── 7. Floating WhatsApp tooltip ──────── */
    const floatingWA = document.querySelector('.floating-whatsapp');
    if (floatingWA) {
        // Show tooltip on hover
        floatingWA.setAttribute('title', '¡Escríbenos ahora!');

        // Bounce in on load after 2s
        setTimeout(() => {
            floatingWA.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1)';
            floatingWA.style.transform = 'scale(1.2)';
            setTimeout(() => { floatingWA.style.transform = ''; }, 400);
        }, 2000);
    }


    /* ── 8. Service cards tilt effect ──────── */
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
            card.style.transition = 'transform .1s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform .3s cubic-bezier(.4,0,.2,1)';
        });
    });

    /* ── 9. Service Expand Toggle ──────────── */
    const expandBtns = document.querySelectorAll('.btn-expand');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            const details = btn.nextElementSibling;
            const btnText = btn.querySelector('.btn-text');

            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                btnText.textContent = 'Ver más';
                details.classList.remove('expanded');
            } else {
                btn.setAttribute('aria-expanded', 'true');
                btnText.textContent = 'Ver menos';
                details.classList.add('expanded');
            }
        });
    });

});