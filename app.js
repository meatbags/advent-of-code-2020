/** AOC */

class App {
  constructor() {
    this.el = {
      run: document.querySelector('#button-run'),
      bigBoy: document.querySelector('#button-run-big-boy'),
      input: document.querySelector('#input'),
      output: document.querySelector('#output'),
      time: document.querySelector('#time'),
    };
    this.el.run.onclick = () => {
      const t = performance.now();
      this.day1();
      this.el.time.value = `${performance.now() - t} ms`;
    };
  }

  day1() {
    const input = this.el.input.value;
    const data = input.split('\n').map(e => parseInt(e));
    const iLim = data.length-1;
    const jLim = data.length;
    let p1 = null;
    let p2 = null;

    br:
    for (let i=0; i<iLim; i++) {
      for (let j=i+1; j<jLim; j++) {
        const sum2 = data[i] + data[j];
        if (sum2 > 2020)
          continue;
        if (!p1 && sum2 === 2020) {
          p1 = data[i] * data[j];
          if (p1 && p2)
            break br;
        }
        if (p2)
          continue;
        for (let k=0; k<jLim; k++) {
          if (k == i || k == j || sum2 + data[k] !== 2020)
            continue;
          p2 = data[i] * data[j] * data[k];
          if (p1 && p2)
            break br;
        }
      }
    }

    console.log(p1);
    console.log(p2);
    this.el.output.value = p1 + '\n' + p2;
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
