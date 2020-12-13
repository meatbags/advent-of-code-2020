/** Day 11 */

class Day11 {
  constructor() {}

  solve(text, sample) {
    const rows = text.trim().split('\r\n');
    const w = rows[0].length;
    const h = rows.length;
    const map = [];

    // get map
    rows.forEach(row => {
      row.trim().split('').forEach(char => {
        map.push(char);
      });
    });

    // utils
    const isValid = (x, y) => (x >= 0 && y >= 0 && x < w && y < h);
    const getSeat = (arr, x, y) => (arr[y*w + x]);
    const statesEqual = (a, b) => (a.join('') == b.join(''));

    // search vectors
    const vectors = [
      [1, 0], [-1, 0], [0, 1], [0, -1],
      [-1, -1], [1, 1], [-1, 1], [1, -1]
    ];

    // part 1
    let state = map;

    while (true) {
      const nextState = state.map((seat, i) => {
        let x = i % w;
        let y = (i - x) / w;

        if (seat !== '.') {
          // count occupied seats at offsets
          let occupied = vectors.filter(v => {
            const sx = x + v[0];
            const sy = y + v[1];
            return isValid(sx, sy) && getSeat(state, sx, sy) == '#';
          }).length;

          // swap seats
          seat = seat == 'L'
            ? seat = occupied == 0 ? '#' : 'L'
            : occupied >= 4 ? 'L' : '#';
        }

        return seat;
      });

      if (statesEqual(state, nextState))
        break;
      state = nextState;
    }
    console.log(state.filter(seat => seat == '#').length);

    // part 2
    state = map;

    while (true) {
      const nextState = state.map((seat, i) => {
        let x = i % w;
        let y = (i - x) / w;

        if (seat !== '.') {
          // count occupied seats stepping along vectors
          let occupied = vectors.filter(v => {
            let sx = x;
            let sy = y;
            while (true) {
              sx += v[0];
              sy += v[1];
              if (isValid(sx, sy)) {
                const seat = getSeat(state, sx, sy);
                if (seat !== '.') {
                  return seat == '#';
                }
              } else {
                return false;
              }
            }
          }).length;

          // swap seats
          seat = seat == 'L'
            ? seat = occupied == 0 ? '#' : 'L'
            : occupied >= 5 ? 'L' : '#';
        }

        return seat;
      });

      if (statesEqual(state, nextState))
        break;

      state = nextState;
    }
    console.log(state.filter(seat => seat == '#').length);
  }
}

export default Day11;
