export class RippleEffect {
  static init() {
    document.addEventListener('pointerdown', RippleEffect.handle);
  }

  static handle(event) {
    const el = event.target.closest('.fab, .icon-btn, .tab, .gh-link');
    if (!el) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}
