/** AOC */

import RayTracer from './ray_tracer';
import Day1 from './day_1';
import Day2 from './day_2';

class App {
  constructor() {
    this.el = {};
    this.el.run = document.querySelector('#button-run');
    this.el.input = document.querySelector('#input');
    this.el.output = document.querySelector('#output');
    this.el.time = document.querySelector('#time');
    this.el.canvas = document.querySelector('#canvas');

    const rayTracer = new RayTracer();
    rayTracer.run(this.el.canvas);

    // settings
    this.url = 'data/2.txt';
    this.module = new Day2();

    // event
    this.el.run.onclick = () => {
      this.run();
    };

    // run
    // this.run();
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
}

window.addEventListener('load', () => {
  const app = new App();
});
