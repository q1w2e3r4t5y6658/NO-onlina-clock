export class HistoryService {
  constructor() {
    this.yearEl = document.getElementById('history-year');
    this.eventEl = document.getElementById('history-event');
    this.cardEl = document.getElementById('history-item');
  }

  init() {
    this.fetch();
  }

  fetch() {
    this.cardEl.style.opacity = '0';
    this.cardEl.style.transform = 'translateY(8px)';

    fetch('https://jkapi.com/api/history')
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(l => l.trim());
        let year = '';
        let event = '';

        for (let i = 1; i < lines.length; i++) {
          const match = lines[i].match(/^(\d+)\s+(.+)$/);
          if (match) {
            year = match[1] + '年';
            event = match[2];
            break;
          }
        }

        if (!year) {
          year = '历史';
          event = '今天是普通的一天，但可以变得不平凡！';
        }

        this.show(year, event);
      })
      .catch(() => {
        this.show('历史', '今天是普通的一天，但可以变得不平凡！');
      });
  }

  show(year, event) {
    setTimeout(() => {
      this.yearEl.textContent = year;
      this.eventEl.textContent = event;
      this.cardEl.style.opacity = '1';
      this.cardEl.style.transform = 'translateY(0)';
    }, 200);
  }
}
