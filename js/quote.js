export class QuoteService {
  constructor() {
    this.textEl = document.getElementById('quote-text');
    this.authorEl = document.getElementById('quote-author');
    this.cardEl = document.getElementById('quote-item');
    this.refreshBtn = document.getElementById('quote-refresh');
    this.timerEl = document.getElementById('quote-timer-value');
    this.lastQuote = '';
    this.cdSeconds = 30;
    this.autoInterval = null;
  }

  init() {
    this.fetch();
    this.refreshBtn.addEventListener('click', () => this.fetch());
    setInterval(() => this.tick(), 1000);
    this.autoInterval = setInterval(() => this.fetch(), 30000);
  }

  tick() {
    this.cdSeconds--;
    if (this.cdSeconds <= 0) this.cdSeconds = 30;
    this.timerEl.textContent = this.cdSeconds + 's';
  }

  fetch() {
    this.cardEl.style.opacity = '0';
    this.cardEl.style.transform = 'translateY(-8px)';

    fetch('https://v1.hitokoto.cn/?c=d&c=e&c=g&c=h&c=i&c=k')
      .then(res => res.json())
      .then(data => {
        const text = data.hitokoto;
        if (text === this.lastQuote && this.lastQuote) {
          this.fetch();
          return;
        }
        this.show(text, data.from_who || data.from || '佚名');
      })
      .catch(() => {
        this.show('一万年太久，只争朝夕。', '毛泽东');
      });
  }

  show(text, author) {
    setTimeout(() => {
      this.lastQuote = text;
      this.textEl.textContent = `"${text}"`;
      this.authorEl.textContent = `—— ${author}`;
      this.cardEl.style.opacity = '1';
      this.cardEl.style.transform = 'translateY(0)';
      this.cdSeconds = 30;
      this.timerEl.textContent = '30s';
    }, 200);
  }
}
