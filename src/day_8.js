/* Day 8 */

class Day8 {
  solve(text) {
    // utils
    const removeNewline = s => s.replace(/[\n\r]/g, '');
    const nl = '\n';

    // parse
    let lines = text.trim().split(nl);
    let map = lines.map(line => ({
      cmd: line.split(' ')[0],
      n: parseInt(line.split(' ')[1].replace('+', ''))
    }));

    // part 1
    let acc = 0;
    let i = 0;
    let ops = 0;
    let visited = [];
    let done = false;

    while (!done) {
      if (map[i].cmd == 'acc') {
        acc += map[i].n;
        i += 1;
      } else if (map[i].cmd == 'jmp') {
        i += map[i].n;
      } else {
        i += 1;
      }

      if (visited.includes(i)) {
        done = true;
      }
      visited.push(i);
    }
    console.log('p1 =', acc);

    // part 2
    const save = [];
    let state = null;
    acc = 0;
    i = 0;
    visited = [];

    while (i < map.length) {
      // check reset required
      if (visited.includes(i)) {
        // revert last state (failed)
        if (state) {
          map[state.i].cmd = map[state.i].cmd == 'nop' ? 'jmp' : 'nop';
          save.splice(0, 1);
        }

        // get save state
        state = save[0];
        map[state.i].cmd = map[state.i].cmd == 'nop' ? 'jmp' : 'nop';
        map[state.i].flag = 1;

        // reset acc, visited, index
        i = state.i;
        acc = state.acc;
        visited = visited.slice(0, state.visited);
      } else {
        visited.push(i);
      }

      // ignore acc
      if (map[i].cmd == 'acc') {
        acc += map[i].n;
        i += 1;
      } else {
        // save state
        if (!map[i].flag) {
          save.push({ acc: acc, i: i, visited: visited.length });
        }

        // increment
        i += map[i].cmd == 'jmp' ? map[i].n : 1;
      }
    }

    console.log('p2 =', acc);
  }
}

export default Day8;
