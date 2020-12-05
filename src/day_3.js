/* Day 3 */

class Day3 {
  solve(text) {
    const data = text.trim().split('\n');

    let t1 = 0;
    let t3 = 0;
    let t5 = 0;
    let t7 = 0;
    let t12 = 0;

    data.forEach((row, i) => {
      let i1 = (i * 1) % 31;
      let i3 = (i * 3) % 31;
      let i5 = (i * 5) % 31;
      let i7 = (i * 7) % 31;
      t1 += row[i1] == '#' ? 1 : 0;
      t3 += row[i3] == '#' ? 1 : 0;
      t5 += row[i5] == '#' ? 1 : 0;
      t7 += row[i7] == '#' ? 1 : 0;
      if (i % 2 == 0) {
        let i12 = (i / 2) % 31;
        t12 += row[i12] == '#' ? 1 : 0;
      }
    });

    const p1 = t3;
    const p2 = t1 * t3 * t5 * t7 * t12;
    console.log(p2, p2);

    return [p1, p2];
  }
}

export default Day3;
