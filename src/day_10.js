/** Day 10 */

class Day10 {
  constructor() {}

  solve(text) {
    let lines = text.trim().split('\n').map(line => {
      return parseInt(line);
    });

    let l = lines.sort((a, b) => a - b);
    console.log(lines);

    let a = 1;
    let b = 1;
    for (let i=0; i<l.length-1; i++) {
      if (l[i+1] - l[i] == 1) {
        a += 1;
      }
      if (l[i+1] - l[i] == 3) {
        b += 1;
      }
    }

    console.log(a, b, a * b);

    // part 1
    let p1 = 0;

    // part 2
    let p2 = 0;
    l = [0, ...l, l[l.length-1] + 3];
    let arr = [];
    let acc = 1;
    let diff = [1];

    const getPaths = i => {
      if (i == l.length - 1) {
        return 1;
      } else {
        let acc = 0;
        let conn = [];
        let j = i + 1;
        while (j < l.length) {
          if (l[j] - l[i] > 3)
            break;
          conn.push(j);
          j++;
        }
        conn.forEach(j => {
          acc += getPaths(j);
        });
        return acc;
      }
    };

    console.log(getPaths(0));

    /*
    for (let i=0; i<l.length-1; i++) {
      let conn = 0;
      let li = l[i];
      let d = diff[diff.length - 1];

      for (let j=i+1; j<l.length; j++) {
        let lj = l[j];
        if (lj - li > 3) {
          break;
        }
        acc += d;
      }

      diff.push(l[i+1] - l[i]);
      arr.push(conn);
      //acc += conn;
    }

    console.log('NUMBERS');
    console.log(l);
    console.log('DIFFS');
    console.log(diff);
    console.log('CONNS');
    console.log(arr);

    console.log(acc);
    */
  }
}

export default Day10;
