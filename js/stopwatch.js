export class Stopwatch {
  constructor() {
    this.display = document.querySelector('.stopwatch-display');
    this.startBtn = document.getElementById('stopwatch-start');
    this.pauseBtn = document.getElementById('stopwatch-pause');
    this.resetBtn = document.getElementById('stopwatch-reset');
    this.lapBtn = document.getElementById('stopwatch-lap');
    this.lapsContainer = document.getElementById('stopwatch-laps');

    this.running = false;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.rafId = null;
    this.lapCount = 0;
    this.lastLapTime = 0;
  }

  init() {
    this.startBtn.addEventListener('click', () => this.start());
    this.pauseBtn.addEventListener('click', () => this.pause());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.lapBtn.addEventListener('click', () => this.recordLap());
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.startTime = performance.now();
    this.loop();
    this.startBtn.style.display = 'none';
    this.pauseBtn.style.display = 'flex';
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.elapsedTime += performance.now() - this.startTime;
    this.startBtn.style.display = 'flex';
    this.pauseBtn.style.display = 'none';
  }

  reset() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.startTime = 0;
    this.elapsedTime = 0;
    this.lastLapTime = 0;
    this.lapCount = 0;
    this.display.textContent = '00:00.000';
    this.lapsContainer.innerHTML = '<div class="laps-empty">暂无圈数记录</div>';
    this.startBtn.style.display = 'flex';
    this.pauseBtn.style.display = 'none';
  }

  loop() {
    if (!this.running) return;
    const current = this.elapsedTime + (performance.now() - this.startTime);
    this.display.textContent = Stopwatch.format(current);
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  recordLap() {
    if (!this.running) return;
    this.lapCount++;
    const current = this.elapsedTime + (performance.now() - this.startTime);
    const lapTime = current - this.lastLapTime;
    this.lastLapTime = current;

    if (this.lapsContainer.querySelector('.laps-empty')) {
      this.lapsContainer.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'lap-row';
    item.style.animationDelay = '0ms';
    item.innerHTML = `
      <span class="lap-num">圈 ${this.lapCount}</span>
      <span class="lap-split">${Stopwatch.format(lapTime)}</span>
      <span class="lap-total">${Stopwatch.format(current)}</span>
    `;
    this.lapsContainer.prepend(item);

    const allItems = this.lapsContainer.querySelectorAll('.lap-row');
    allItems.forEach((el, i) => {
      el.style.animationDelay = (i * 40) + 'ms';
    });
  }

  static format(ms) {
    const totalSec = Math.floor(ms / 1000);
    const millis = Math.floor(ms % 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
  }
}
