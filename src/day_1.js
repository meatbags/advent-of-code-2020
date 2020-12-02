/** Day 1 */

class Day1 {
  solve(txt) {
    const data = txt.trim().split('\n').map(str => parseInt(str));
    let iter = 0;
    let p1 = null;
    let p2 = null;

    br:
    for (let i=0; i<data.length-1; i++) {
      iter++;
      for (let j=1; j<data.length; j++) {
        iter++;
        const sum = data[i] + data[j];
        if (sum > 2020)
          continue;
        if (sum == 2020) {
          console.log(data[i], data[j]);
          p1 = data[i] * data[j];
          if (p1 && p2)
            break br;
        }
        if (p2)
          continue;
        for (let k=0; k<data.length; k++) {
          iter++;
          if (sum + data[k] !== 2020 || k == i || k == j)
            continue;
          console.log(data[i], data[j], data[k]);
          p2 = data[i] * data[j] * data[k];
          if (p1 && p2)
            break br;
        }
      }
    }

    return 'p1: ' + p1 + '\n' + 'p2: ' + p2 + '\n' + 'iterations: ' + iter;
  }
}

export default Day1;
