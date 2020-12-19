import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/18.txt')
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

    const alienBEDMAS = equation => {
      let parts = equation.split(' ');
      if (parts.length < 3) {
        return eval(equation);
      }
      let val = eval(parts[0]);
      for (let i=0; i<parts.length-1; i+=2) {
        const op = parts[i+1];
        const term = parts[i+2];
        val = eval(`${val}${op}${term}`);
      }
      return val;
    }

    const consolidateAddition = eq => {
      while (eq.indexOf('+') !== -1) {
        let parts = eq.split(' ');
        for (let i=0; i<parts.length-1; i+=2) {
          if (parts[i+1] == '+') {
            parts[i] = eval(`${parts[i]}+${parts[i+2]}`);
            parts.splice(i+1, 2);
            i -= 1;
          }
        }
        eq = parts.join(' ');
      }
      return eq;
    };

    const computeValue = (row, callback) => {
      while (true) {
        let parts = row.split('(').map((part, index) => {
          if (part.indexOf(')') !== -1) {
            let inner = part.split(')');
            return callback(inner[0]) + inner.slice(1, inner.length).join(')');
          }
          return '(' + part;
        });
        row = parts.join('');
        if (row.search(/\)/g) == -1) {
          row = row.replace(/\(/g, '');
          break;
        }
      }
      return callback(row);
    };

    // part 1
    let p1 = 0;
    data.forEach(row => {
      p1 += computeValue(row, x => alienBEDMAS(x));
    });
    console.log(p1);

    // part 2
    let p2 = 0;
    data.forEach(row => {
      p2 += computeValue(row, x => alienBEDMAS(consolidateAddition(x)));
    });
    console.log(p2);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
