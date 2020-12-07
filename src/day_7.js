/* Day 7 */

class Day7 {
  solve(text) {
    const nl = '\n';
    const removeNewline = s => s.replace(/[\n\r]/g, '');
    //let data = text.trim().split(nl + nl);
    let data = text.trim().split(nl).map(d => d.trim());
    let map = {};
    let nullBags = 0;
    data.forEach(txt => {
      let c = txt.split('bags contain')[0].trim();
      let inner = txt.split('contain')[1];
      if (inner.indexOf('no other') !== -1) {
        map[c] = null;
        nullBags += 1;
      } else {
        map[c] = inner.trim().split(',').map(c => {
          c = c.trim();
          let parts = c.split(' ');
          return {
            key: parts[1] + ' ' + parts[2],
            n: parseInt(parts[0]),
          };
        });
      }
    });
    console.log(map);
    console.log('BAGS:', data.length, 'NULL:', nullBags);

    // can bag hold mine?
    const canHold = key => {
      const arr = map[key];
      if (arr == null || key == 'shiny gold') {
        return false;
      } else if (arr.map(bag => bag.key).includes('shiny gold')) {
        return true;
      } else {
        for (let i=0; i<arr.length; i++) {
          if (canHold(arr[i])) {
            return true;
          }
        }
      }
      return false;
    }

    // part 1
    let p1 = 0;
    Object.keys(map).forEach(key => {
      const res = canHold(key);
      if (res) {
        p1 += 1;
      }
    });
    console.log(p1);

    // part 2
    const countInside = key => {
      const arr = map[key];
      if (arr === null) {
        return 0;
      }
      let acc = 0;
      arr.forEach(bag => {
        acc += bag.n + bag.n * countInside(bag.key);
      });
      return acc;
    }
    let p2 = countInside('shiny gold');
    console.log(p2);

    return [p1, p2];
  }
}

export default Day7;
