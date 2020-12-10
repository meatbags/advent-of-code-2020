/** AOC */

import Day1 from './day_1';
import Day2 from './day_2';
import Day3 from './day_3';
import Day4 from './day_4';
import Day5 from './day_5';
import Day6 from './day_6';
import Day7 from './day_7';
import Day8 from './day_8';
import Day9 from './day_9';
import Day10 from './day_10';
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
    this.url = 'data/10.txt';
    this.module = new Day10();
    this.run();

    // this.renderer = new Renderer();
    // this.el.run.onclick = () => {
    //   this.run();
    // };
  }

  run() {
    fetch(this.url)
      .then(res => res.text())
      .then(text => {
        const t = performance.now();
        this.el.input.value = text;
        this.el.output.value = this.module.solve(text);
        this.el.time.value = `${performance.now() - t} ms`;
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
