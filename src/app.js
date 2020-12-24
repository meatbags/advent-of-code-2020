import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/24.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            // this.solve(this.sample);
            this.solve(this.text);
          });
      });
  }

  solve(text) {
    let rows = splitNewline(text);
    let groups = splitDoubleNewline(text);
    let grid = {};

    // PART 1
    const move = (x, y, dir) => {
      switch(dir) {
        case 'e': x += 1; break;
        case 'w': x -= 1; break;
        case 'nw':
          x += Math.abs(y % 2) == 0 ? 0 : -1;
          y -= 1;
          break;
        case 'ne':
          x += Math.abs(y % 2) == 0 ? 1 : 0;
          y -= 1;
          break;
        case 'sw':
          x += Math.abs(y % 2) == 0 ? 0 : -1;
          y += 1;
          break;
        case 'se':
          x += Math.abs(y % 2) == 0 ? 1 : 0;
          y += 1;
          break;
        default: break;
      }
      return {x, y};
    };

    rows.forEach(row => {
      let i = 0;
      let x = 0;
      let y = 0;

      while (true) {
        let dir = row[i] == 'e' || row[i] == 'w' ? row[i] : row[i] + row[i+1];
        let xy = move(x, y, dir);
        x = xy.x;
        y = xy.y;
        i += dir.length;
        if (i >= row.length)
          break;
      }

      // init tile or flip
      let key = `${x},${y}`;
      grid[key] = grid[key] === undefined || grid[key] !== 'B' ? 'B' : 'W';
    });

    let p1 = Object.keys(grid).filter(k => grid[k] == 'B').length;
    console.log('P1', p1);

    // P2
    const getNextGrid = grid => {
      let nextGrid = {};
      let dirs = ['e', 'w', 'nw', 'ne', 'se', 'sw'];

      // expand grid
      let keys = Object.keys(grid);
      keys.forEach(key => {
        let x = parseInt(key.split(',')[0]);
        let y = parseInt(key.split(',')[1]);
        dirs.forEach(dir => {
          let xy = move(x, y, dir);
          let k = `${xy.x},${xy.y}`;
          if (grid[k] === undefined)
            grid[k] = 'W';
        });
      });

      // get next grid state
      keys = Object.keys(grid);

      for (let i=0; i<keys.length; i++) {
        let key = keys[i];
        let x = parseInt(key.split(',')[0]);
        let y = parseInt(key.split(',')[1]);

        // count surrounding black tiles
        let count = dirs.filter(dir => {
          let xy = move(x, y, dir);
          let k = `${xy.x},${xy.y}`;
          return grid[k] !== undefined && grid[k] == 'B';
        }).length;

        // flip tile
        nextGrid[key] = grid[key] === 'B'
          ? (count == 0 || count > 2 ? 'W' : 'B')
          : (count == 2 ? 'B' : 'W');
      }
      return nextGrid;
    }

    for (let i=0; i<100; i++) {
      grid = getNextGrid(grid);
    }

    let p2 = Object.keys(grid).filter(k => grid[k] == 'B').length;
    console.log('P2', p2);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
