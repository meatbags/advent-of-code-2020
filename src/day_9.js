/* Day 8 */

class Day8 {
  solve(text) {
    // utils
    const removeNewline = s => s.replace(/[\n\r]/g, '');
    const nl = '\n';

    // parse
    let lines = text.trim().split(nl).map(n => parseInt(n));
    console.log('Length:', lines.length);
    console.log(lines);

    const sum2 = (list, target) => {
      for (let i=0; i<list.length-1; i++) {
        for (let j=1; j<list.length; j++) {
          if (list[i] + list[j] == target) {
            return true;
          }
        }
      }
      return false;
    }

    let p1 = 0;
    for (let i=25; i<lines.length; i++) {
      const target = lines[i];
      const arr = lines.slice(i-25, i);
      if (!this.sum2(arr, target)) {
        p1 = target;
        break;
      }
    }
    console.log('P1:', p1);

    // p2
    for (let i=0; i<lines.length; i++) {
      let acc = lines[i];
      for (let j=i+1; j<lines.length; j++) {
        acc += lines[j];
        if (acc == p1) {
          let arr = lines.slice(i, j+1);
          const min = Math.min(...arr);
          const max = Math.max(...arr);
          console.log(min, max, min + max);
          break;
        }
        if (acc > p1) {
          break;
        }
      }
    }
  }
}

export default Day8;
