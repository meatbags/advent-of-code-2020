/** Day 13 */

class Day13 {
  constructor() {}

  bigboi() {
    fetch('data/bigboi_13.txt')
      .then(res => res.text())
      .then(text => {
        this.solveBigBoi(text);
      });
  }

  solveBigBoi(text) {
    let now = performance.now();
    let data = text.trim().split('\r\n');
    let buses = data[1].split(',').map((id, i) => {
      return id !== 'x' ? {
        id: BigInt(parseInt(id)),
        i: BigInt(i)
      } : null;
    }).filter( obj => obj !== null );

    console.log(buses);
    let n = buses[0].id;
    let step = buses[0].id;

    for (let i=0; i<buses.length; i++) {
      const bus = buses[i];
      while ((n + bus.i) % bus.id != 0)
        n += step;
      step *= bus.id;
    }

    console.log(n);
    console.log(performance.now() - now + 'ms');
  }

  solve(text, sample) {
    let data = text.trim().split('\r\n');

    // parse data
    let timestamp = parseInt(data[0]);
    let buses = data[1].split(',').map((id, i) => {
      if (id !== 'x') {
        id = parseInt(id);
      }
      return { id, i };
    }).filter( obj => obj.id !== 'x' );

    // part 1
    let id = null;
    let mins = null;

    buses.forEach(bus => {
      let acc = bus.id;
      while (acc < timestamp)
        acc += bus.id;
      if (!mins || acc - timestamp < mins) {
        mins = acc - timestamp;
        id = bus.id;
      }
    });

    console.log(id * mins);

    // part 2
    let n = 1;
    let step = 1;

    for (let i=0; i<buses.length; i++) {
      let id = buses[i].id;
      let index = buses[i].i;
      while ((n + index) % id !== 0) {
        n += step;
      }
      step *= id;
    }

    console.log(n);
  }
}

export default Day13;
