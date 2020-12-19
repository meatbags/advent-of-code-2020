import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/17.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
             //this.solve(this.sample);
            this.solve(this.text);
          });
      });
  }

  solve(text) {
    let data = text.trim().split('\n').map(row => row.trim());
    let state = [[[]]];
    data.forEach(row => {
      row.split('').forEach(e => { state[0][0].push(e == '.' ? 0 : 1); });
    })

    let size = data[0].length;
    console.log('SIZE', data.length);
    console.log(state);

    // boot up
    for (let i=0; i<6; i++) {
      state = this.stepP2(state, size);
      console.log(state);
      size += 2;
    }
    console.log(this.countP2(state));
  }

  countP2(state) {
    let acc = 0;
    state.forEach(w => {
      w.forEach(z => {
        z.forEach(cell => {
          acc += cell;
        })
      });
    });
    return acc;
  }

  stepP2(state, size) {
    const pad = 1;
    const xmax = size + pad * 2;
    const ymax = size + pad * 2;
    const zmax = state[0].length + pad * 2;
    const wmax = state.length + pad * 2;

    // create matrix
    let nextState = [];
    for (let i=0; i<wmax; i++) {
      const wState = [];
      for (let j=0; j<zmax; j++) {
        const zState = new Array(ymax * xmax);
        wState.push(zState);
      }
      nextState.push(wState);
    }

    console.log(nextState);

    // create vectors
    let vectors = [];
    for (let x=-1; x<=1; x++) {
      for (let y=-1; y<=1; y++) {
        for (let z=-1; z<=1; z++) {
          for (let w=-1; w<=1; w++) {
            if (!x && !y && !z && !w)
              continue;
            vectors.push([x, y, z, w]);
          }
        }
      }
    }

    // utils input
    const isValid = (x, y, z, w) => {
      return x >= 0 && x < size &&
        y >= 0 && y < size &&
        z >= 0 && z < state[0].length &&
        w >= 0 && w < state.length;
    }
    const getValue = (x, y, z, w) => {
      const index = y * size + x;
      return state[w][z][index];
    }

    // utils output
    const putValue = (x, y, z, w) => {
      nextState[w][z][y * xmax + x] = 1;
    }

    for (let x=0; x<xmax; x++) {
      for (let y=0; y<ymax; y++) {
        for (let z=0; z<zmax; z++) {
          for (let w=0; w<wmax; w++) {
            const sx = x - pad;
            const sy = y - pad;
            const sz = z - pad;
            const sw = w - pad;
            const value = isValid(sx, sy, sz, sw) ? getValue(sx, sy, sz, sw) : 0;

            let count = 0;
            vectors.forEach(v => {
              const sx2 = sx + v[0];
              const sy2 = sy + v[1];
              const sz2 = sz + v[2];
              const sw2 = sw + v[3];
              if (isValid(sx2, sy2, sz2, sw2)) {
                count += getValue(sx2, sy2, sz2, sw2) ? 1 : 0;
              }
            });

            if (value && (count == 2 || count == 3)) {
              putValue(x, y, z, w);
            } else if (!value && count == 3) {
              putValue(x, y, z, w);
            }
          }
        }
      }
    }

    return nextState;
  }


  stepP1(state, size) {
    const pad = 1;
    const xmax = size + pad * 2;
    const ymax = size + pad * 2;
    const zmax = state.length + pad * 2;

    // create matrix
    let nextState = [];
    for (let i=0; i<zmax; i++) {
      nextState.push(new Array(ymax * xmax))
    }

    console.log(nextState);

    // create vectors
    let vectors = [];
    for (let x=-1; x<=1; x++)
      for (let y=-1; y<=1; y++)
        for (let z=-1; z<=1; z++) {
          if (!x && !y && !z)
            continue;
          vectors.push([x, y, z]);
        }

    // utils input
    const isValid = (x, y, z) => {
      return x >= 0 && x < size &&
        y >= 0 && y < size &&
        z >= 0 && z < state.length;
    }
    const getValue = (x, y, z) => {
      const index = y * size + x;
      return state[z][index];
    }

    // utils output
    const putValue = (x, y, z) => {
      const index = y * xmax + x;
      nextState[z][index] = 1;
    }

    for (let x=0; x<xmax; x++) {
      for (let y=0; y<ymax; y++) {
        for (let z=0; z<zmax; z++) {
          const sx = x - pad;
          const sy = y - pad;
          const sz = z - pad;
          const value = isValid(sx, sy, sz) ? getValue(sx, sy, sz) : 0;
          let count = 0;

          vectors.forEach(v => {
            const sx2 = sx + v[0];
            const sy2 = sy + v[1];
            const sz2 = sz + v[2];
            if (isValid(sx2, sy2, sz2)) {
              count += getValue(sx2, sy2, sz2) ? 1 : 0;
            }
          });

          if (value && (count == 2 || count == 3)) {
            putValue(x, y, z);
          } else if (!value && (count == 3)) {
            putValue(x, y, z);
          }
        }
      }
    }

    return nextState;
  }

  countP1(state) {
    let acc = 0;
    state.forEach(arr => {
      arr.forEach(cell => {
        acc += cell;
      })
    });
    return acc;
  }

}

window.addEventListener('load', () => {
  const app = new App();
});
