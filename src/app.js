/** AOC */

import Day13 from './day_13';
// import Renderer from './util/renderer';

class App {
  constructor() {
    this.el = {};
    this.el.run = document.querySelector('#button-run');
    this.el.input = document.querySelector('#input');
    this.el.output = document.querySelector('#output');
    this.el.time = document.querySelector('#time');
    this.el.canvas = document.querySelector('#canvas');

    this.initWindows();

    // settings
    this.url = {
      sample: 'data/sample.txt',
      main: 'data/13.txt',
    };
    this.module = new Day13();
    this.run();
  }

  run() {
    let toLoad = 2;
    let text = null;
    let sample = null;
    const callback = () => {
      if (--toLoad == 0) {
        const t = performance.now();
        this.el.input.value = text;
        this.el.output.value = this.module.solve(text, sample);
        this.el.time.value = `${performance.now() - t} ms`;
      }
    };
    fetch(this.url.sample)
      .then(res => res.text())
      .then(txt => {
        sample = txt;
        callback();
      });
    fetch(this.url.main)
      .then(res => res.text())
      .then(txt => {
        text = txt;
        callback();
      });
  }

  initWindows() {
    this.mouse = {x: 0, y: 0};
    this.windows = [];

    // init windows
    document.querySelectorAll('.window').forEach(el => {
      const win = {el: el};
      this.windows.push(win);
      el.querySelector('.window__header').onmousedown = evt => {
        const rect = el.getBoundingClientRect();
        win.x = rect.left + rect.width / 2;
        win.y = rect.top + rect.height / 2;
        this.mouse.x = evt.clientX;
        this.mouse.y = evt.clientY;
        win.active = true;
        win.el.classList.add('dragging');
      };
    });

    // drag windows
    window.addEventListener('mousemove', evt => {
      this.windows.forEach(win => {
        if (win.active) {
          const dx = evt.clientX - this.mouse.x;
          const dy = evt.clientY - this.mouse.y;
          win.el.style.left = `${win.x + dx}px`;
          win.el.style.top = `${win.y + dy}px`;
        }
      });
    });

    // mouse up
    const onmouseup = evt => {
      this.windows.forEach(win => {
        win.active = false;
        win.el.classList.remove('dragging');
      });
    };
    window.addEventListener('mouseup', onmouseup);
    window.addEventListener('mouseleave', onmouseup);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
