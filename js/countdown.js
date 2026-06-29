import { Notification } from './notification.js';

export class Countdown {
  constructor() {
    this.display = document.querySelector('.countdown-display');
    this.hoursInput = document.getElementById('countdown-hours');
    this.minutesInput = document.getElementById('countdown-minutes');
    this.secondsInput = document.getElementById('countdown-seconds');
    this.startBtn = document.getElementById('countdown-start');
    this.pauseBtn = document.getElementById('countdown-pause');
    this.resetBtn = document.getElementById('countdown-reset');

    this.running = false;
    this.intervalId = null;
    this.totalSeconds = 0;
    this.remaining = 0;
  }

  init() {
    this.refreshDisplay();
    this.hoursInput.addEventListener('input', () => this.refreshDisplay());
    this.minutesInput.addEventListener('input', () => this.refreshDisplay());
    this.secondsInput.addEventListener('input', () => this.refreshDisplay());
    this.startBtn.addEventListener('click', () => this.start());
    this.pauseBtn.addEventListener('click', () => this.pause());
    this.resetBtn.addEventListener('click', () => this.reset());
  }

  getInputSeconds() {
    const h = parseInt(this.hoursInput.value, 10) || 0;
    const m = parseInt(this.minutesInput.value, 10) || 0;
    const s = parseInt(this.secondsInput.value, 10) || 0;
    return h * 3600 + m * 60 + s;
  }

  refreshDisplay() {
    this.totalSeconds = this.getInputSeconds();
    this.remaining = this.totalSeconds;
    this.display.textContent = Countdown.format(this.remaining);
  }

  start() {
    if (this.running) return;
    const total = this.getInputSeconds();
    if (total === 0) {
      Notification.show('请设置倒计时时间');
      return;
    }
    this.totalSeconds = total;
    this.remaining = total;
    this.running = true;
    this.display.textContent = Countdown.format(this.remaining);
    this.intervalId = setInterval(() => this.tick(), 1000);
    this.startBtn.style.display = 'none';
    this.pauseBtn.style.display = 'flex';
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    clearInterval(this.intervalId);
    this.startBtn.style.display = 'flex';
    this.pauseBtn.style.display = 'none';
  }

  reset() {
    this.running = false;
    if (this.intervalId) clearInterval(this.intervalId);
    this.hoursInput.value = '0';
    this.minutesInput.value = '0';
    this.secondsInput.value = '0';
    this.refreshDisplay();
    this.startBtn.style.display = 'flex';
    this.pauseBtn.style.display = 'none';
  }

  tick() {
    if (this.remaining > 0) {
      this.remaining--;
      this.display.textContent = Countdown.format(this.remaining);
    }
    if (this.remaining === 0) {
      this.running = false;
      clearInterval(this.intervalId);
      this.startBtn.style.display = 'flex';
      this.pauseBtn.style.display = 'none';
      this.display.textContent = '00:00:00';
      Notification.show('倒计时结束！');
    }
  }

  static format(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
