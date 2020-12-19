import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/19.txt')
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
    let sections = text.trim().split('\r\n\r\n');
    let rules = {};
    sections[0].split('\r\n').forEach(row => {
      const key = row.split(":")[0];
      const val = row.split(": ")[1].split(/[ ]/g).map(e => {
        return !isNaN(e) ? parseFloat(e) : e.replace(/"/g, '');
      });
      rules[key] = val;
    });
    let data = sections[1].split('\r\n');

    // regex builder
    const getRegex = rule => {
      // char found
      if (isNaN(rule[0]))
        return rule[0];

      // build regex recursively
      let res = '';
      rule.forEach(i => {
        if (i == '|')
          res += i;
        else {
          const nextRule = rules[i];
          if (nextRule.loop !== undefined) {
            if (++nextRule.loop <= 5)
              res += getRegex(nextRule);
          } else {
            res += getRegex(nextRule);
          }
        }
      });
      return `(${res})`;
    };

    // Part 1
    let p1 = 0;
    let re1 = new RegExp(getRegex(rules[0]), 'g');
    data.forEach(row => {
      if (!row.replace(re1, ''))
        p1 += 1;
    });

    // Part 2
    rules[8] = [42, '|', 42, 8];
    rules[11] = [42, 31, '|', 42, 11, 31];
    rules[8].loop = 0;
    rules[11].loop = 0;

    let p2 = 0;
    let re2 = new RegExp(getRegex(rules[0]), 'g');
    data.forEach(row => {
      if (!row.replace(re2, ''))
        p2 += 1;
    });

    console.log(p1, p2);
  }

  p1() {
    //   let data = splitNewline(text);
      let sections = splitDoubleNewline(text);
      let rulesRows = splitNewline(sections[0]);
      let data = splitNewline(sections[1]);
      let rules = {};


      rulesRows.forEach(row => {
        const key = row.split(":")[0];
        const val = row.split(": ")[1].split(/[ ]/g).map(e => {
          return !isNaN(e) ? parseFloat(e) : e.replace(/"/g, '');
        });
        rules[key] = val;
      });

      let getCount = rule => {
        if (rule[0] == "a" || rule[0] == "b") {
          return 1;
        } else {
          let count = 0;
          for (let i=0; i<rule.length; i++) {
            let index = rule[i];
            if (index == "|") {
              break;
            } else {
              count += getCount(rules[index]);
            }
          }
          return count;
        }
      }

      let getRegex = rule => {
        if (rule[0] == "a" || rule[0] == "b") {
          return rule[0];
        } else {
          let res = "";
          for (let i=0; i<rule.length; i++) {
            let index = rule[i];
            if (index == "|")
              res += index;
            else
              res += getRegex(rules[index]);
          }
          return '(' + res + ')';
        }
      };

      console.log(rules);

      let exp = getRegex(rules[0]);//.split('|');
      let count = getCount(rules[0]);

      console.log(exp);
      console.log(count);
      const re = new RegExp(exp, 'g');

      let p1 = 0;
      data.forEach(row => {
        if (row.search(re) !== -1 && row.length == count) {
          p1 += 1;
        }
      });

      console.log(p1);
      return p1;
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
