/* Day 8 */

class Day8 {
  solve(text) {
    // parse
    let list = text.trim().split('\r\n').map(n => parseInt(n));

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
}

export default Day8;
