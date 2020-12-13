/** Day 13 */

class Day13 {
  constructor() {}

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

      // find time which satisfies: time + i % id == 0
      while ((n + index) % id !== 0) {
        n += step;
      }

      // multiply step by id
      step *= id;
    }

    console.log(n);
  }
}

export default Day13;
