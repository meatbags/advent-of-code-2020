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
      this.day1_HASH();
      this.el.time.value = `${performance.now() - t} ms`;
    };
  }

  day1_HASH() {
    const data = this.el.input.value.trim().split('\n').map(e => parseInt(e));
    const iLim = data.length-1;
    const jLim = data.length;
    const len = data.length;
    let p1 = null;
    let p2 = null;
    let iter = 0;
    const map1 = {};
    const map2 = {};

    for (let i=0; i<len; i++) {
      iter++;
      const v = data[i];
      const d = 2020 - v;

      if (d < 0)
        continue;

      if (map1[v]) {
        p1 = map1[v].val * v;

        console.log(v, map1[v], p1);
      } else {
        map1[d] = {
          val: v,
        };
      }
    }

    console.log('Iterations: ' + iter);
  }

  day1() {
    const data = this.el.input.value.trim().split('\n').map(e => parseInt(e));
    const iLim = data.length-1;
    const jLim = data.length;
    let p1 = null;
    let p2 = null;
    let iter = 0;

    // loop
    br:
    for (let i=0; i<iLim; i++) {
      iter++;
      for (let j=i+1; j<jLim; j++) {
        iter++;
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
          iter++;
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
    this.el.output.value = 'p1: ' + p1 + '\np2: ' + p2 + '\niterations: ' + iter;
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
