/* Day 6 */

class Day6 {
  solve(text) {
    // part 1
    let p1 = 0;
    text.trim().split('\r\n\r\n').forEach(group => {
      group = group.replace(/[\n\r]/g, '');
      while (group.length) {
        group = group.replace(new RegExp(group[0], "g"), "");
        p1 += 1;
      }
    });
    console.log(p1);

    // part 2
    let p2 = 0;
    text.trim().split('\r\n\r\n').forEach(group => {
      let people = group.split('\r\n');
      people[0].split('').forEach(chr => {
        if (people.length == people.filter(r => r.indexOf(chr) !== -1).length) {
          p2 += 1;
        }
      });
    });
    console.log(p2);

    return [p1, p2];
  }
}

export default Day6;
