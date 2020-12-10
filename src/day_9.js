/* Day 8 */

class Day8 {
  solve(text) {
    // parse
    let list = text.trim().split('\n').map(n => parseInt(n));

    // part 1
    let p1 = null;
    let i = 24;
    while (!p1) {
      let target = list[++i];
      let map = {};

      for (let j=i-25; j<i; j++) {
        let x = list[j];

        if (map[target - x])
          break;
        if (j == i-1) {
          p1 = target;
          break;
        }

        map[x] = true;
      }
    }
    console.log(p1);

    this.simulate(list, p1);
    this.loop();
  }

  part(list, p1) {
    // part 2
    let p2 = null;
    let lower = 0;
    let upper = 0;
    let acc = 0;

    loop:
    while (true) {
      while (acc < p1)
        acc += list[upper++];

      while (acc > p1)
        acc -= list[lower++];

      if (acc == p1) {
        const arr = list.slice(lower, upper);
        p2 = Math.min(...arr) + Math.max(...arr);
        break loop;
      }
    }
    console.log(p2);
  }

  simulate(list, p1) {
    this.state = {
      list: list,
      target: p1,
      acc: 0,
      lower: 0,
      upper: 0,
      res: null,
    };

    // dom
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = 400;
    this.cvs.height = 400;
    document.querySelector('#output-window .window__body').appendChild(this.cvs);

    this.loop();
  }

  next() {
    const s = this.state;

    if (s.acc < s.target) {
      s.acc += s.list[s.upper++];
    } else if (s.acc > s.target) {
      s.acc -= s.list[s.lower++];
    }

    if (s.acc == s.target) {
      const arr = s.list.slice(s.lower, s.upper);
      return Math.min(...arr) + Math.max(...arr);
    }

    return null;
  }

  draw() {
    const min = this.state.lower - 5;
    const max = this.state.upper + 5;
    const range = max - min;
    const istart = Math.max(0, min);
    const xstep = 1 / (max - istart);
    let miny = 0;
    let maxy = 1;
    let prev = -1000;
    let j = -100;

    // set up
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.strokeStyle = this.ctx.fillStyle = '#fff';
    this.ctx.font = '10px monospace';

    for (let i=istart; i<max; i++) {
      const x = 10 + ((i - min) / range) * (this.cvs.width - 20);
      const v = this.state.list[i];
      miny = Math.min(v, miny);
      maxy = Math.max(v, maxy);
      const y = 10 + (this.cvs.height - 20) * (1 - (v - miny) / (maxy - miny));
      this.ctx.fillRect(x, y, 2, 2);

      if (i > istart) {
        const prev = this.state.list[i - 1];
        const next = this.state.list[i + 1];

        if (prev < v ^ next < v) {
          this.ctx.save();
          this.ctx.translate(x, y);
          this.ctx.rotate(Math.PI * 0.25);
          this.ctx.fillText(v, 0, 0);
          this.ctx.restore();
        }
      }
    }

    this.ctx.font = '18px monospace';
    const lines = [
      'ACC: ' + this.state.acc,
      'LWR: ' + this.state.lower,
      'UPR: ' + this.state.upper,
      'RES: ' + this.state.res,
    ];
    lines.forEach((line, i) => {
      const y = this.cvs.height - (lines.length - i) * 20;
      this.ctx.fillStyle = '#000';
      this.ctx.fillText(line, 21, y + 1);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(line, 20, y);
    });
  }

  loop() {
    if (this.state.res === null) {
      requestAnimationFrame(() => { this.loop(); });
    } else {
      console.log('P2', this.state.res);
    }
    this.state.res = this.next();
    this.draw();
  }
}

export default Day8;
