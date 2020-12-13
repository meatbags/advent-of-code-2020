

class Day12 {
  constructor() {}

  solve(text, sample) {
    let d = text.trim().split('\r\n').map(v => {
      let res = v.trim();
      return res;
    });
    const degToRad = x => x * Math.PI / 180;

    // PART 1
    let x = 0;
    let y = 0;
    let dir = 0;

    d.forEach((e, i) => {
      var split = e.split('');
      var cmd = split[0];
      var len = parseInt(split.slice(1, split.length+1).join(''));

      if (cmd == 'R' || cmd == 'L') {
        dir += (cmd == 'L' ? 1 : -1) * len;
      } else {
        if (['N', 'S', 'E', 'W'].includes(cmd)) {
          x += (cmd == 'E' || cmd == 'W' ? len : 0) * (cmd == 'E' ? 1 : -1);
          y += (cmd == 'N' || cmd == 'S' ? len : 0) * (cmd == 'N' ? 1 : -1);
        } else if (cmd == 'F') {
          const s = cmd == 'F' ? 1 : -1;
          x += Math.cos(degToRad(dir)) * len * s;
          y += Math.sin(degToRad(dir)) * len * s;
        }
      }
    });
    console.log(Math.round(Math.abs(x) + Math.abs(y)));

    // PART 2
    x = 10;
    y = 1;
    let ship = {x: 0, y: 0};

    d.forEach((e, i) => {
      var split = e.split('');
      var cmd = split[0];
      var len = parseInt(split.slice(1, split.length+1).join(''));

      if (cmd == 'R' || cmd == 'L') {
        let dir = Math.atan2(y, x);
        const mag = Math.hypot(x, y);
        dir += degToRad((cmd == 'L' ? 1 : -1) * len);
        x = Math.cos(dir) * mag;
        y = Math.sin(dir) * mag;
      } else {
        if (['N', 'S', 'E', 'W'].includes(cmd)) {
          x += (cmd == 'E' || cmd == 'W' ? len : 0) * (cmd == 'E' ? 1 : -1);
          y += (cmd == 'N' || cmd == 'S' ? len : 0) * (cmd == 'N' ? 1 : -1);
        } else if (cmd == 'F') {
          ship.x += x * len;
          ship.y += y * len;
        }
      }
    });
    console.log(Math.round(Math.abs(ship.x) + Math.abs(ship.y)));

    // animation
    this.ship = {x: 0, y: 0};
    this.waypoint = {x: 10, y: 1};
    this.data = d;
    this.time = {};
    this.time.age = 0;
    this.time.step = 10;
    this.time.max = this.data.length * this.time.step;
    this.loop();
  }


  update() {
    this.time.age += 1;

    let index = Math.floor(this.time.age / this.time.step);
    let cmd = data[index];

    if (!cmd.flag) {
      cmd.flag = 1;

      const split = cmd.split('');
      const c = split[0];
      const n = parseInt(split.slice(1, split.length+1).join(''));

      // rotate waypoint
      if (c == 'R' || c == 'L') {
        const dir = Math.atan2(y, x) + degToRad((c == 'L' ? 1 : -1) * len);
        const mag = Math.hypot(x, y);
        this.waypoint.x = Math.cos(dir) * mag;
        this.waypoint.y = Math.sin(dir) * mag;
      } else {
        if (['N', 'S', 'E', 'W'].includes(c)) {
          this.waypoint.x += (c == 'E' || c == 'W' ? n : 0) * (c == 'E' ? 1 : -1);
          this.waypoint.y += (c == 'N' || c == 'S' ? n : 0) * (c == 'N' ? 1 : -1);
        } else if (c == 'F') {
          this.ship.x += this.waypoint.x * n;
          this.ship.y += this.waypoint.y * n;
        }
      }
    }

    return this.time.age >= this.time.max;
  }

  loop() {
    if (!this.done) {
      requestAnimatioFrame(() => {
        this.loop();
      });
    }
    this.done = this.update();
  }
}

export default Day12;
