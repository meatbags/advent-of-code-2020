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

    // dom events
    this.el.run.onclick = () => {
      const t = performance.now();
      this.day2();
      this.el.time.value = `${performance.now() - t} ms`;
    };

    // canvas init
    this.cvs = document.querySelector('#canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = 400;
    this.cvs.height = 200;
  }

  day2() {
    let p1 = 0;
    let p2 = 0;
    const res = this.el.input.value.trim().split('\n').forEach(row => {
      const p = e.split()
      const n = (e.password.match(new RegExp(e.letter, 'g')) || []).length;
      p1 +=
      p2 += ;
    });

    const data = this.el.input.value.trim().split('\n').map(e => {
      const split = e.split(' ');
      const min = parseInt(split[0].split('-')[0]);
      const max = parseInt(split[0].split('-')[1]);
      const letter = split[1].split(':')[0];
      const pword = split[2];
      return {
        min: min,
        max: max,
        letter: letter,
        password: pword,
      };
    });

    let correct= 0;
    data.forEach(e => {
      const i = e.password[e.min-1] == e.letter;
      const j = e.password[e.max-1] == e.letter;
      e.res = i ^ j;
      //const n = (e.password.match(new RegExp(e.letter, 'g')) || []).length;
      //e.res = n >= e.min && n <= e.max;
      if (e.res) {
        correct += 1;
      }
    });

    console.log(data);
    console.log(correct);
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
