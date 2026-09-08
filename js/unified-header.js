// ═══════════════════════════════════════════════════════════
// BULLBEAR MARKET – UNIFIED 3D INTERACTIVITY & HEADER SCRIPT
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const burger = document.querySelector('.bbm-burger');
  const drawer = document.querySelector('.bbm-mobile-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      burger.textContent = drawer.classList.contains('open') ? '✕' : '☰';
    });
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== burger) {
        drawer.classList.remove('open');
        burger.textContent = '☰';
      }
    });
  }

  // 2. Dynamic 3D Card Tilt Engine
  const cards = document.querySelectorAll('.card-3d, .phone-mockup-card, .bbm-eco-card, .step, .feature');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = perspective(1000px) rotateX(deg) rotateY(deg) translateY(-8px) scale3d(1.02, 1.02, 1.02);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 3. Highlight Active Navigation Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.bbm-nav-links a, .bbm-mobile-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html') || (href.endsWith(currentPath) && currentPath !== ''))) {
      link.classList.add('active');
    }
  });
});
