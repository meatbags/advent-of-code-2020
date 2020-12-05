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

    console.log(p1);
    console.log(p2);

    return [p1, p2];
  }
}

export default Day5;
