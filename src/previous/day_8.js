/* Day 8 */

class Day8 {
  solve(text) {
    // utils
    const removeNewline = s => s.replace(/[\n\r]/g, '');
    const nl = '\n';

    // parse
    let lines = text.trim().split(nl);
    let map = lines.map(line => ({
      cmd: line.split(' ')[0],
      n: parseInt(line.split(' ')[1].replace('+', ''))
    }));

    const p1 = this.part1(map);
    console.log('p1=', p1);
    this.part2(map);
  }

  part1(map) {
    let acc = 0;
    let i = 0;
    let visited = new Set();

    while (true) {
      if (visited.has(i)) {
        return acc;
      }
      visited.add(i);
      acc += map[i].cmd == 'acc' ? map[i].n : 0;
      i += map[i].cmd == 'jmp' ? map[i].n : 1;
    }
  }

  part2(map) {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = 1600;
    this.cvs.height = 600;
    document.querySelector('#output-window .window__body').appendChild(this.cvs);

    this.logs = {
      acc: [],
      i: [],
      min: {i: 0, acc: 1},
      max: {i: 0, acc: 1},
    };
    this.state = {
      i: 0,
      acc: 0,
      ops: 0,
      save: [],
      prev: null,
      visited: new Set(),
      map: map,
    };

    this.loop();
  }

  step() {
    if (this.state.i >= this.state.map.length) {
      return true;
    }

    // check branch end
    if (this.state.visited.has(this.state.i)) {
      if (this.state.prev) {
        const row = this.state.map[this.state.prev.i];
        row.cmd = row.cmd == 'nop' ? 'jmp' : 'nop';
      }
      let state = this.state.save.splice(0, 1)[0];
      this.state.map[state.i].cmd = this.state.map[state.i].cmd == 'nop' ? 'jmp' : 'nop';
      this.state.map[state.i].flag = 1;
      this.state.i = state.i;
      this.state.acc = state.acc;
      this.state.prev = state;
    }
    this.state.visited.add(this.state.i);

    // perform command, save state
    const next = this.state.map[this.state.i];
    this.state.acc += next.cmd == 'acc' ? next.n : 0;
    if (next.cmd !== 'acc' && !next.flag) {
      this.state.save.push({ acc: this.state.acc, i: this.state.i });
    }
    this.state.i += next.cmd == 'jmp' ? next.n : 1;
    this.state.ops++;

    return false;
  }

  draw() {
    // update refs
    this.logs.acc.push(this.state.acc);
    this.logs.i.push(this.state.i);
    this.logs.min.i = Math.min(this.logs.min.i, this.state.i);
    this.logs.max.i = Math.max(this.logs.max.i, this.state.i);
    this.logs.min.acc = Math.min(this.logs.min.acc, this.state.acc);
    this.logs.max.acc = Math.max(this.logs.max.acc, this.state.acc);

    // draw settings
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.fillStyle = this.ctx.strokeStyle = '#fff';
    this.ctx.font = '12px monospace';

    // draw index
    const start = {x: 32, y: 32};
    const stop = {x: this.cvs.width - 32, y: this.cvs.height / 2 - 32};
    const range = {x: stop.x - start.x, y: stop.y - start.y};
    let prev = -1;
    this.ctx.beginPath();
    this.logs.i.forEach((index, i) => {
      const y = (index - this.logs.min.i) / (this.logs.max.i - this.logs.min.i);
      const x = i / this.logs.i.length;
      const sx = start.x + range.x * x;
      const sy = start.y + range.y * y;
      this.ctx.lineTo(sx, sy);
      if (Math.abs(prev - index) !== 1) {
        this.ctx.fillText(index, sx, sy - 10);
      }
      prev = index;
    });
    this.ctx.strokeStyle = '#44F';
    this.ctx.stroke();

    start.y += this.cvs.height / 2;
    this.ctx.beginPath();
    prev = -1000;
    this.logs.acc.forEach((acc, i) => {
      const y = (acc - this.logs.min.acc) / (this.logs.max.acc - this.logs.min.acc);
      const x = i / this.logs.acc.length;
      const sx = start.x + range.x * x;
      const sy = start.y + range.y * y;
      this.ctx.lineTo(sx, sy);
      if (Math.abs(prev - acc) > 80) {
        this.ctx.fillText(acc, sx, sy - 10);
        prev = acc;
      }
    });
    this.ctx.strokeStyle = '#F44';
    this.ctx.stroke();

    // draw STATS
    this.ctx.font = '28px monospace';
    const stats = [
      'ACC: ' + this.state.acc,
      'PTR: ' + this.state.i,
      'ITER: ' + this.state.ops,
    ];
    stats.forEach((stat, i) => {
      this.ctx.fillStyle = i == 0 ? '#F44' : i == 1 ? '#44F' : '#fff';
      this.ctx.fillText(stat, 32 + i * 200, this.cvs.height - 32);
    });
  }

  loop() {
    if (!this.done) {
      requestAnimationFrame(_ => { this.loop(); });
    } else {
      console.log(this.state);
    }
    this.done = this.step();
    this.draw();
  }
}

export default Day8;
