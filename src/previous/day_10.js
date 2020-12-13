/** Day 10 */

class Day10 {
  solve(text, sample) {
    let lines = text.trim().split('\n').map(line => parseInt(line)).sort((a, b) => a - b);
    let jolts = [0, ...lines, lines[lines.length - 1] + 3];

    // p1
    let step1 = 0;
    let step3 = 0;
    for (let i=0; i<jolts.length; i++) {
      if (jolts[i+1] - jolts[i] == 1)
        step1++;
      else if (jolts[i+1] - jolts[i] == 3)
        step3++;
    }

    // part 2
    const nodes = jolts.map(n => ({jolts: n, conns: 0, in: 0, out: 0, to: []}));
    nodes[0].conns = 1;
    nodes[0].in = 1;
    for (let i=0; i<nodes.length; i++) {
      const node = nodes[i];
      for (let j=i+1; j<nodes.length; j++) {
        if (nodes[j].jolts - node.jolts > 3)
          break;
        nodes[j].conns = nodes[j].conns + node.conns;

        // for animation
        node.out += 1;
        nodes[j].in += 1;
        node.to.push(j);
      }
    }

    // animation settings
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.style.background = '#111';
    this.cvs.width = 600;
    this.cvs.height = 600;
    this.nodes = nodes;
    this.time = {};
    this.time.age = 0;
    this.time.scale = 6;
    this.time.max = this.nodes.length * this.time.scale;

    // add canvas to doc
    const target = document.querySelector('#output-window .window__body') ||
      document.querySelector('body');
    target.appendChild(this.cvs);

    // run animation
    this.loop();
  }

  getNodePosition(node, index) {
    const pad = 32;
    const rows = 8;
    const row = Math.floor(index * rows / this.nodes.length);
    const w = this.nodes.length / rows;
    let x = (index % w) / w;
    x = pad + (row % 2 == 0 ? x : 1 - x) * (this.cvs.width - pad * 2);
    let y = row / rows;
    if (node.in > 1) {
      const offy = 1 / (rows * 2);
      y += node.in == 2 ? offy : node.in >= 4 ? offy * 2 : offy;
    }
    y = pad + y * (this.cvs.height - pad * 2);
    return {x, y};
  }

  draw() {
    this.ctx.fillStyle = this.ctx.strokeStyle = '#fff';
    this.ctx.font = '12px monospace';
    this.ctx.lineWidth = 2;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

    // draw nodes up to current index
    let conns = 0;
    let lim = Math.floor(this.time.age / this.time.scale);
    let step = (this.time.age % this.time.scale + 1) / this.time.scale;
    this.ctx.beginPath();

    for (let i=0; i<lim; i++) {
      const node = this.nodes[i];
      const p = this.getNodePosition(node, i);
      this.ctx.fillRect(p.x-1, p.y-1, 2, 2);

      // draw connections
      node.to.forEach(j => {
        this.ctx.moveTo(p.x, p.y);
        const p2 = this.getNodePosition(this.nodes[j], j);

        // animate extending line
        if (i == lim - 1) {
          const x = p.x + (p2.x - p.x) * step;
          const y = p.y + (p2.y - p.y) * step;
          this.ctx.lineTo(x, y);

        // draw full line
        } else {
          this.ctx.lineTo(p2.x, p2.y);
        }
      });

      // indicate outward connections
      if (node.out > 1) {
        this.ctx.fillText(node.out, p.x, p.y - 5);
      }

      // get value of current node
      if (i == lim-1) {
        conns = node.conns;
      }
    }

    this.ctx.stroke();

    // print current connections
    this.ctx.font = '24px monospace';
    this.ctx.fillText('CONNS: ' + conns, 16, this.cvs.height - 16);
  }

  loop() {
    if (this.time.age < this.time.max) {
      requestAnimationFrame(() => {
        this.loop();
      });
    }
    this.draw();
    this.time.age++;
  }
}

export default Day10;
