// ═══════════════════════════════════════════════════════════
// BULLBEAR MARKET – UNIFIED 3D INTERACTIVITY & RESPONSIVE ENGINE
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle & Auto-Close
  const burger = document.querySelector('.bbm-burger');
  const drawer = document.querySelector('.bbm-mobile-drawer');
  
  if (burger && drawer) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.toggle('open');
      burger.textContent = isOpen ? '✕' : '☰';
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== burger) {
        drawer.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click inside drawer
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        burger.textContent = '☰';
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Desktop-Only 3D Card Tilt Engine (Disabled on Touch Devices for Smooth 60fps Performance)
  if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.card-3d, .phone-mockup-card, .bbm-eco-card, .step, .feature, .topic-card-3d, .stat-card-3d, .review-card-3d, .pillar-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // 3. Highlight Active Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bbm-nav-links a, .bbm-mobile-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html') || (href.endsWith(currentPath) && currentPath !== ''))) {
      link.classList.add('active');
    }
  });

  // 4. Mobile Table Wrap Auto-Enforcer (Guarantees zero horizontal blowout across all 46 pages)
  document.querySelectorAll('table').forEach(tbl => {
    if (!tbl.parentElement.classList.contains('table-responsive') && !tbl.parentElement.classList.contains('table-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'table-responsive';
      wrap.style.overflowX = 'auto';
      wrap.style.webkitOverflowScrolling = 'touch';
      wrap.style.maxWidth = '100%';
      wrap.style.width = '100%';
      wrap.style.margin = '16px 0';
      tbl.parentNode.insertBefore(wrap, tbl);
      wrap.appendChild(tbl);
    }
  });
});
