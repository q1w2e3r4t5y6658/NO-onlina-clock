import { RippleEffect } from './ripple.js';
import { Clock } from './clock.js';
import { Stopwatch } from './stopwatch.js';
import { Countdown } from './countdown.js';
import { QuoteService } from './quote.js';
import { HistoryService } from './history.js';
import { ExamCountdown } from './exam.js';

class App {
  constructor() {
    this.tabs = document.querySelectorAll('.tab');
    this.panels = document.querySelectorAll('.tab-panel');
    this.tabOrder = ['local-time', 'stopwatch', 'countdown'];
    this.currentIndex = 0;

    this.clock = new Clock();
    this.stopwatch = new Stopwatch();
    this.countdown = new Countdown();
    this.quote = new QuoteService();
    this.history = new HistoryService();
    this.exam = new ExamCountdown();
  }

  init() {
    RippleEffect.init();
    this.initTabs();
    this.clock.init();
    this.stopwatch.init();
    this.countdown.init();
    this.quote.init();
    this.history.init();
    this.exam.init();
  }

  initTabs() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        const newIndex = this.tabOrder.indexOf(tabId);
        if (newIndex === this.currentIndex) return;

        const direction = newIndex > this.currentIndex ? 1 : -1;
        const oldPanel = document.getElementById(this.tabOrder[this.currentIndex]);
        const newPanel = document.getElementById(tabId);

        this.animateTabSwitch(oldPanel, newPanel, direction);

        this.tabs.forEach(t => t.classList.remove('active'));
        this.panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        newPanel.classList.add('active');

        this.currentIndex = newIndex;
      });
    });
  }

  animateTabSwitch(oldPanel, newPanel, direction) {
    const duration = 280;
    const easing = 'cubic-bezier(0.2, 0, 0, 1)';
    const outX = direction > 0 ? -24 : 24;
    const inX = direction > 0 ? 24 : -24;

    oldPanel.style.transition = `all ${duration}ms ${easing}`;
    oldPanel.style.opacity = '1';
    oldPanel.style.transform = 'translateX(0)';
    requestAnimationFrame(() => {
      oldPanel.style.opacity = '0';
      oldPanel.style.transform = `translateX(${outX}px)`;
    });

    newPanel.style.display = 'block';
    newPanel.style.transition = 'none';
    newPanel.style.opacity = '0';
    newPanel.style.transform = `translateX(${inX}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        newPanel.style.transition = `all ${duration}ms ${easing}`;
        newPanel.style.opacity = '1';
        newPanel.style.transform = 'translateX(0)';
      });
    });

    setTimeout(() => {
      oldPanel.style.display = 'none';
    }, duration);
  }
}

const app = new App();
app.init();
