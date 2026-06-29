export class Clock {
  constructor() {
    this.timeDisplay = document.querySelector('.time-display');
    this.dateRow = document.querySelector('.date-row');
    this.weekdayBadge = document.querySelector('.weekday-badge');
    this.weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  }

  init() {
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    this.timeDisplay.textContent = `${h}:${m}:${s}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    if (this.dateRow) {
      this.dateRow.textContent = `${year}年${month}月${day}日`;
    }

    if (this.weekdayBadge) {
      this.weekdayBadge.textContent = this.weekdays[now.getDay()];
    }
  }
}
