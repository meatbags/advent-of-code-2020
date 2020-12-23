import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/22.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            this.solve(this.sample);
            this.solve(this.text);
          });
      });
  }

  solve(text) {
    let rows = text.trim().split('SPLIT');
    let p1 = rows[0].trim().split('\n');
    let p2 = rows[1].trim().split('\n');
    p1 = p1.slice(0, p1.length).map(e => parseInt(e));
    p2 = p2.slice(0, p2.length).map(e => parseInt(e));
    console.log(p1);
    console.log(p2);

    // calc score
    const getScore = list => {
      let score = 0;
      for (let i=0; i<list.length; i++) {
        let v = list[i];
        score += v * (list.length - i);
      }
      return score;
    }

    // game loop
    const playGame = (p1, p2) => {
      let scores = [];
      let winner = null;
      let round = 1;

      while (true) {
        let res = null;
        // console.log('ROUND:', round++);
        // console.log("P1 DECK:", p1);
        // console.log("P2 DECK:", p2);
        let a = p1.splice(0, 1)[0];
        let b = p2.splice(0, 1)[0];
        let subgame = false;
        // console.log("P1:", a);
        // console.log("P2:", b);

        // play game recursively
        if (a <= p1.length && b <= p2.length) {
          // console.log('=== NEW SUBGAME ===');
          const copy1 = [ ...p1.slice(0, a) ];
          const copy2 = [ ...p2.slice(0, b) ];
          res = playGame(copy1, copy2);
          subgame = true;

        // normal rules
        } else {
          if (a > b) {
            res = 1;
          } else {
            res = 2;
          }
        }

        // add cards
        if (res == 1) {
          // console.log('P1 WINS', subgame);
          if (!subgame) {
            p1.push(Math.max(a, b));
            p1.push(Math.min(a, b));
          } else {
            p1.push(a);

            p1.push(b);
          }
        } else {
          // console.log('P2 WINS', subgame);
          if (!subgame) {
            p2.push(Math.max(a, b));
            p2.push(Math.min(a, b));
          } else {
            p2.push(b);
            p2.push(a);
          }
        }

        // prevent looping
        let score1 = getScore(p1);
        let score2 = getScore(p2);
        if (scores.find(e => e[0] == score1 && e[1] == score2)) {
          // console.log('SAME SCORES FOUND');
          winner = 1;
          break;
        }
        scores.push([score1, score2]);

        // check winner
        if (p1.length == 0 || p2.length == 0) {
          winner = p1.length > 0 ? 1 : 2;
          break;
        }
      }

      return winner;
    };

    // p2
    const winner = playGame(p1, p2);
    console.log('WINNER:', winner);
    console.log(p1, p2);
    let deck = winner == 1 ? p1 : p2;
    console.log(getScore(deck));
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
