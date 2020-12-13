/* Day 5 */

class Day5 {
  solve(text) {
    let data = text.trim().split('\r\n').map(row => {
      return parseInt(row.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2);
      // return (x >> 3) * 8 + (x & 7);
    }).sort((a, b) => a - b);

    // p1
    let p1 = data[data.length - 1];

    // p2
    let p2 = null;
    for (let i=0; i<data.length-1; i++) {
      if (data[i+1] - data[i] != 1) {
        p2 = data[i] + 1;
        break;
      }
    }

    this.p2 = p2;
    this.init(text);
  }

  init(text) {
    this.data = text.trim().split('\r\n').map(row => parseInt(row.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2));
    this.seats = this.data.map(x => ({row: x >> 3, column: x & 7}));
    this.mySeat = {row: this.p2 >> 3, column: this.p2 & 7};
    this.cvs = document.querySelector('canvas');
    this.cvs.width = 1800;
    this.cvs.height = 660;
    this.ctx = this.cvs.getContext('2d');
    this.index = 0;
    this.cvs.addEventListener('click', () => {
      this.index = 0;
      this.start();
    })
    this.start();
  }

  fillSeat(seat) {
    const x = seat.row;
    const y = seat.column;
    const stepx = 11;
    const stepy = 20;
    const offx = this.cvs.width / 2 - 64 * stepx;
    const offy = this.cvs.height / 2 - 4 * stepy;
    this.ctx.fillRect(x * stepx + offx, y * stepy + offy, stepx - 2, stepy - 1);
  }

  start() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    const stepx = 11;
    const stepy = 20;
    const offx = this.cvs.width / 2 - 64 * stepx;
    const offy = this.cvs.height / 2 - 4 * stepy;
    this.ctx.strokeStyle = '#fff';
    this.ctx.fillStyle = '#fff';
    for (let x=0; x<128; x++) {
      for (let y=0; y<8; y++) {
        this.ctx.strokeRect(offx + x * stepx, offy + y * stepy, stepx-2, stepy-1);
      }
    }
    this.ctx.beginPath();
    this.ctx.moveTo(offx, offy);
    this.ctx.lineTo(0, offy + 4 * stepy);
    this.ctx.lineTo(offx, offy + 8 * stepy);
    this.ctx.moveTo(offx + 128 * stepx, offy);
    this.ctx.lineTo(this.cvs.width - 40, offy - 100);
    this.ctx.lineTo(this.cvs.width, offy - 100);
    this.ctx.lineTo(offx + 128 * stepx, offy + 8 * stepy);
    this.ctx.moveTo(offx + 56 * stepx, offy);
    this.ctx.lineTo(offx + 56 * stepx + 100, 10);
    this.ctx.lineTo(offx + 56 * stepx + 140, 10);
    this.ctx.lineTo(offx + 56 * stepx + 140, offy);
    this.ctx.moveTo(offx + 56 * stepx, offy + 8 * stepy);
    this.ctx.lineTo(offx + 56 * stepx + 100, this.cvs.height - 12);
    this.ctx.lineTo(offx + 56 * stepx + 140, this.cvs.height - 12);
    this.ctx.lineTo(offx + 56 * stepx + 140, offy + 8 * stepy);
    this.ctx.stroke();
    this.loop();
  }

  loop() {
    if (this.index < this.seats.length) {
      setTimeout(() => { this.loop(); }, 16);
      this.ctx.fillStyle = '#f00';
      this.fillSeat(this.seats[this.index]);
      this.index += 1;
    } else {
      this.ctx.fillStyle = '#0f0';
      this.fillSeat(this.mySeat);
      this.ctx.font = 'bold 48px serif';
      this.ctx.fillText('Your seat ID: ' + this.p2, 100, 100);
    }
  }
}

export default Day5;
