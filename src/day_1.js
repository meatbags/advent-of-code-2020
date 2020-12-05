/** Day 1 */

class Day1 {
  solve(txt) {
    const data = txt.trim().split('\n').map(str => parseInt(str));
    let p1 = null;
    let p2 = null;

    br:
    for (let i=0; i<data.length-1; i++) {
      for (let j=1; j<data.length; j++) {
        const sum = data[i] + data[j];
        if (sum > 2020)
          continue;
        if (sum == 2020) {
          p1 = data[i] * data[j];
          if (p1 && p2)
            break br;
        }
        if (p2)
          continue;
        for (let k=0; k<data.length; k++) {
          if (sum + data[k] !== 2020 || k == i || k == j)
            continue;
          p2 = data[i] * data[j] * data[k];
          if (p1 && p2)
            break br;
        }
      }
    }

    console.log(p1);
    console.log(p2);
    return [p1, p2];
  }
}

export default Day1;
