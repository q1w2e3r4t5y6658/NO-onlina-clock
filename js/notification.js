export class Notification {
  static show(message, duration = 3000) {
    const el = document.getElementById('notification');
    if (!el) return;

    el.textContent = message;
    el.classList.add('visible');

    clearTimeout(Notification._timeout);
    Notification._timeout = setTimeout(() => {
      el.classList.remove('visible');
    }, duration);
  }
}

Notification._timeout = null;
