/** AOC */

import Day1 from './day_1';
import Day2 from './day_2';

class App {
  constructor() {
    this.el = {};
    this.el.run = document.querySelector('#button-run');
    this.el.input = document.querySelector('#input');
    this.el.output = document.querySelector('#output');
    this.el.time = document.querySelector('#time');

    // settings
    this.url = 'data/2.txt';
    this.module = new Day2();

    // event
    this.el.run.onclick = () => {
      this.run();
    };

    // run
    this.run();
    this.smiley();
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

  smiley() {
    const cvs = document.querySelector('#canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = 200;
    cvs.height = 200;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI, false);
    ctx.moveTo(80, 75);
    ctx.arc(75, 75, 5, 0, Math.PI*2, false);
    ctx.moveTo(130, 75);
    ctx.arc(125, 75, 5, 0, Math.PI*2, false);
    ctx.moveTo(100, 100);
    ctx.lineTo(110, 105)
    ctx.lineTo(100, 110);
    ctx.stroke();
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
