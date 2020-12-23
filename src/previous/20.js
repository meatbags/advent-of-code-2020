import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

/*
class Tile {
  constructor(data) {
    this.rows = data.split('\r\n');
    this.imageRows = this.rows.slice(1, this.rows.length);

    // props
    this.id = parseInt(this.rows[0].replace(/[^0-9]/g, ''));
    this.top = this.imageRows[0];
    this.right = this.imageRows.map(e => e[e.length - 1]).join('');
    this.bottom = this.reverse(this.imageRows[this.imageRows.length - 1]);
    this.left = this.reverse(this.imageRows.map(e => e[0]).join(''));
    this.sides = [this.top, this.right, this.bottom, this.left];
    this.sidesInverse = this.sides.map(side => { return this.reverse(side); });
    this.rot = 0;
    this.flipped = false;
    this.index = -1;

    // get tile as array
    this.tile = new Array(100);
    for (let y=0; y<10; y++) {
      for (let x=0; x<10; x++) {
        const row = this.imageRows[y];
        let index = y * 10 + x;
        this.tile[index] = row[x];
      }
    }

    // build image
    this.size = this.top.length;
    this.imageSize = 8;
    this.image = new Array(64);
    for (let y=1; y<9; y++) {
      for (let x=1; x<9; x++) {
        const row = this.imageRows[y];
        let index = (y - 1) * this.imageSize + (x - 1);
        this.image[index] = row[x];
      }
    }
  }

  propagateIndex(i) {
    this.index = i;
    const x = this.index % this.puzzleSize;
    const y = (this.index - x) / this.puzzleSize;

    // propagate right
    if (x < this.puzzleSize - 1) {
      const next = this.getMatchForSide(this.right);
      this.rotateFlipTileToMatch('right', next);
      next.propagateIndex(this.index + 1);
    }

    // propagate down
    if (y < this.puzzleSize - 1) {
      const next = this.getMatchForSide(this.bottom);
      this.rotateFlipTileToMatch('bottom', next);
      next.propagateIndex(this.index + this.puzzleSize);
    }
  }

  rotateFlipTileToMatch(side, tile) {
    let inv = null;
    if (side == 'left')
      inv = 'right';
    else if (side == 'bottom')
      inv = 'top';
    else if (side == 'right')
      inv = 'left';
    else
      inv = 'bottom';

    let rots = 0;

    while (this[side] != this.reverse(tile[inv])) {
      tile.rotate();
      rots += 1;
      if (rots == 4) {
        tile.flip();
      } else if (rots == 8) {
        break;
      }
    }


    if (rots == 8) {
      console.log('ERROR rotating tile');
      console.log(this, tile);
      console.log('LAST ATTEMPT', side, this[side], inv, tile[inv]);
    } else {
      // console.log('SUCCESS', side, this[side], inv, tile[inv]);
    }
  }

  profile(tiles) {
    this.ref = {tiles: tiles};
    this.puzzleSize = Math.sqrt(tiles.length);
    this.matchProfile = [0, 0, 0, 0];
    this.matches = tiles.filter(tile => {
      return tile.id !== this.id && this.isMatch(tile);
    });
    this.isCorner = this.matches.length == 2;
    this.isEdge = this.matches.length == 3;
    this.isCentre = this.matches.length == 4;
  }

  isMatch(tile) {
    let match = false;
    this.sides.forEach((side, i) => {
      if (tile.sidesInverse.includes(side) || tile.sides.includes(side)) {
        match = true;
        this.matchProfile[i] += 1;
      }
    });
    return match;
  }

  getMatchForSide(side) {
    return this.matches.find(tile => {
      return tile.sidesInverse.includes(side) || tile.sides.includes(side);
    });
  }

  print() {
    let out = '';
    for (let y=0; y<this.imageSize; y++) {
      for (let x=0; x<this.imageSize; x++) {
        let index = y * this.imageSize + x;
        out += this.image[index];
      }
      out += '\n';
    }
    console.log(out);
  }

  bakeTransform() {
    console.log(this.id, this.rot, this.flipped);
    this.bakedTile = transformImage(this.tile, this.rot, this.flipped);
    this.bakedImage = transformImage(this.image, this.rot, this.flipped);
  }

  getBakedTile() {
    return this.bakedTile;
  }

  getBakedImage() {
    return this.bakedImage;
  }

  rotate() {
    let top = this.top;
    let right = this.right;
    let bottom = this.bottom;
    let left = this.left;
    this.right = top;
    this.bottom = right;
    this.left = bottom;
    this.top = left;
    this.rot = (this.rot + 1) % 4;
  }

  flip() {
    this.flipped = this.flipped == false;
    this.top = this.reverse(this.top);
    this.right = this.reverse(this.right);
    this.bottom = this.reverse(this.bottom);
    this.left = this.reverse(this.left);
    let r = this.right;
    this.right = this.left;
    this.left = r;
  }

  reverse(str) {
    return str.split('').reverse().join('');
  }
}

const printImage = (arr) => {
  const size = Math.sqrt(arr.length);
  let print = '';
  for (let y=0; y<size; y++) {
    for (let x=0; x<size; x++) {
      print += arr[y*size + x];
    }
    print += '\n';
  }
  console.log(print);
}

const countSeaMonsters = image => {
  let monster = [
    ...("                  # ").split(''),
    ...("#    ##    ##    ###").split(''),
    ...(" #  #  #  #  #  #   ").split('')
  ].map((el, i) => {
    return el == ' ' ? null : {
      x: i % 20,
      y: (i - i % 20) / 20,
    };
  }).filter(el => el !== null);

  let w = 20;
  let h = 3;

  w = 5;
  h = 5;
  monster = [
    ...("# ###").split(''),
    ...("# #  ").split(''),
    ...("#####").split(''),
    ...("  # #").split(''),
    ...("### #").split(''),
  ].map((el, i) => {
    return el == ' ' ? null : {
      x: i % w,
      y: (i - i % w) / w,
    };
  }).filter(el => el !== null);

  const size = Math.sqrt(image.length);

  let count = 0;
  let output = [ ...image ];

  for (let x=0; x<size-w; x++) {
    for (let y=0; y<size-h; y++) {
      let found = true;

      for (let i=0; i<monster.length; i++) {
        const x2 = x + monster[i].x;
        const y2 = y + monster[i].y;
        const index = y2 * size + x2;
        if (image[index] !== '#') {
          found = false;
          break;
        }
      }

      if (found) {
        count += 1;

        // draw sea monster
        for (let i=0; i<monster.length; i++) {
          const x2 = x + monster[i].x;
          const y2 = y + monster[i].y;
          const index = y2 * size + x2;
          output[index] = "O";
        }
      }
    }
  }

  if (count > 0) {
    printImage(output);
    console.log('SEA MONSTERS:', count);
    let waves = 0;
    output.forEach(w => {
      waves += w == '#' ? 1 : 0;
    })
    console.log('WAVES:', waves);
  }

  return count;
};

const transformImage = (arr, rot, flip) => {
  const size = Math.sqrt(arr.length);
  const output = new Array(arr.length);
  for (let x=0; x<size; x++) {
    for (let y=0; y<size; y++) {
      const char = arr[y * size + x];
      let x_ = x;
      let y_ = y;
      let x2 = -1;
      let y2 = -1;

      // flip
      if (flip) {
        x_ = size - 1 - x_;
        // y_ = size - 1 - y_;
      }

      // rotate coords
      if (rot == 0) {
        x2 = x_;
        y2 = y_;
      } else if (rot == 1) {
        x2 = size - 1 - y_;
        y2 = x_;
      } else if (rot == 2) {
        x2 = size - 1 - x_;
        y2 = size - 1 - y_;
      } else if (rot == 3) {
        x2 = y_;
        y2 = size - 1 - x_;
      }

      output[y2 * size + x2] = char;
    }
  }
  return output;
}
*/

class App {
  constructor() {
    fetch('data/20.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            this.solve(this.sample);
            // this.solve(this.text);
          });
      });
  }

  solve(text) {
    // print result
    const print = tile => {
      let size = Math.sqrt(tile.data.length);
      let output = tile.data.map((e, i) => (i%size == 0 ? '\n' : '') + e).join('');
      console.log(output);
    };

    // find sea monster
    let snek = ("                  # #    ##    ##    ### #  #  #  #  #  #").split('');
    snek = snek.map((e, i) => e == ' ' ? 0 : [i%20, (i-i%20)/3]).filter(e => e);
    const findSeaMonsters = img => {
      const size = Math.sqrt(img.length);
      let count = 0;
      for (let x=0; x<size-20; x++) {
        for (let y=0; y<size-3; y++) {
          count += snek.every(e => {
            let i = (y + e[1]) * size + (x + e[0]);
            return img[i] == '#';
          }) ? 1 : 0;
        }
      }
      console.log(count);
    };

    // transform
    const transform = (tile, op) => {
      let size = Math.sqrt(tile.data.length);
      let data = new Array(tile.data.length);
      tile.data.forEach((e, i) => {
        let x = i % size;
        let y = (i - x) / size;
        let j = op == 'rotate' ? x*size + size-y-1 : y*size + size-x-1;
        data[j] = e;
      });
      tile.data = data;
      tile.edges = getEdges(data);
    };
    const flip = t => { transform(t, 'flip'); };
    const rotate = t => { transform(t, 'rotate'); };
    const matchRight = (t, v) => { transformUntil(t, t => getL(t) == v); };
    const matchBottom = (t, v) => { transformUntil(t, t => getT(t) == v); };
    const transformUntil = (t, callback) => {
      let i = 0;
      while (!callback(t)) {
        rotate(t);
        if (++i % 4 == 0)
          flip(t);
      }
    };

    // tile matching
    const reverse = str => str.split('').reverse().join('');
    const getT = arr => arr.slice(0, 10).join('');
    const getR = arr => arr.filter((e, i) => i % 10 == 9).join('');
    const getB = arr => arr.slice(90, 100).reverse().join('');
    const getL = arr => arr.filter((e, i) => i % 10 == 0).reverse().join('');
    const getEdges = arr => [getT(arr), getR(arr), getB(arr), getL(arr)];
    const getMatches = (t, tiles) => tiles.filter(t2 => {
      let edges = [ ...t2.edges, ...t2.edges.map(e => reverse(e)) ];
      return t2.id !== t.id && t.edges.some(e => edges.includes(e));
    });
    const matchEdge = (edge, tiles) => tiles.find(t => {
      let edges = [ ...t.edges, ...t.edges.map(e => reverse(e)) ];
      return edges.includes(edge);
    });

    // init tiles
    let tiles = text.trim().split('\r\n\r\n').map(block => {
      let id = parseInt(block.replace(/[^0-9]/g, ''));
      let data = block.replace(/[^#\.]/g, '').split('');
      let edges = getEdges(data);
      return {id, data, edges};
    });
    tiles.forEach(t => { t.matches = getMatches(t, tiles); });

    // part 1 -- find corners
    let corners = tiles.filter(t => t.matches.length == 2);
    let p1 = corners[0].id * corners[1].id * corners[2].id * corners[3].id;
    console.log(p1);

    console.log(tiles);

    // part 2 -- find sea dragons
    let topLeft = corners.find(t => !matchEdge(t.edges[0], t.matches) && !matchEdge(t.edges[3], t.matches));
    let size = Math.sqrt(tiles.length);
    let propagateIndex = (t, index) => {
      t.index = index;
      const x = index % size;
      const y = (index - x) / size;

      // propagate right
      if (x < this.puzzleSize - 1) {
        const next = this.getMatchForSide(this.right);
        this.rotateFlipTileToMatch('right', next);
        next.propagateIndex(this.index + 1);
      }

      // propagate down
      if (y < this.puzzleSize - 1) {
        const next = this.getMatchForSide(this.bottom);
        this.rotateFlipTileToMatch('bottom', next);
        next.propagateIndex(this.index + this.puzzleSize);
      }
    };
    propagateIndex(topLeft, 0);


    /*
    let tiles = text.trim().split('\r\n\r\n');
    tiles = tiles.map(tile => new Tile(tile));
    tiles.forEach((tile) => {
      tile.profile(tiles);
    });

    // p1
    const corners = tiles.filter(tile => tile.isCorner);
    let p1 = corners[0].id * corners[1].id * corners[2].id * corners[3].id;
    console.log(p1);

    // p2 ???
    let topLeft = corners.find(tile => {
      return tile.isCorner && tile.matchProfile[0] == 0 && tile.matchProfile[3] == 0;
    });
    topLeft.propagateIndex(0);
    console.log(topLeft.id);

    // get puzzle array
    tiles.sort((a, b) => (a.index - b.index));
    tiles.forEach(tile => { tile.bakeTransform(); });

    // get size
    const size = Math.sqrt(tiles.length);

    // display tiles
    let tiledImage = new Array(tiles.length * 121);
    for (let i=0; i<tiledImage.length; i++) {
      tiledImage[i] = ' ';
    }
    for (let y=0; y<size; y++) {
      for (let x=0; x<size; x++) {
        const index = y * size + x;
        const baked = tiles[index].getBakedTile();
        baked.forEach((el, i) => {
          let px = x * 11 + i % 10;
          let py = y * 11 + (i - (i % 10)) / 10;
          tiledImage[py * (size * 11) + px] = el;
        });
      }
    }
    printImage(tiledImage);

    // create puzzle image
    const puzzle = new Array(tiles.length * 64);
    for (let y=0; y<size; y++) {
      for (let x=0; x<size; x++) {
        const index = y * size + x;
        const baked = tiles[index].getBakedImage();
        baked.forEach((el, i) => {
          let px = x*8 + i%8;
          let py = y*8 + (i - (i%8)) / 8;
          puzzle[py * (size * 8) + px] = el;
        });
      }
    }
    // printImage(puzzle);

    for (let rot=0; rot<4; rot++) {
      for (let flipped=0; flipped<2; flipped++) {
        let im = transformImage(puzzle, rot, flipped==1)
        countSeaMonsters(im);
      }
    }
    */

    //console.log(puzzle);
    //console.log(size);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
