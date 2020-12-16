import { splitNewline, splitDoubleNewline, splitComma } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/16.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            // this.solve(this.sample);
             this.solve(this.text);
          })
      });
  }

  solve(text) {
    let data = splitDoubleNewline(text);

    // parse
    let rules = splitNewline(data[0]);
    rules = rules.map(rule => {
      rule = rule.split(': ');
      let parts = rule[1].replace(/( or)|[a-z:]|(  )/g, '').split(/[ -]/);
      return {
        field: rule[0],
        a0: parseInt(parts[0]),
        a1: parseInt(parts[1]),
        b0: parseInt(parts[2]),
        b1: parseInt(parts[3]),
      };
    });
    let ticket = splitNewline(data[1]);
    ticket = ticket.slice(1, ticket.length).map(row => splitComma(row))[0];
    let nearby = splitNewline(data[2]);
    nearby = nearby.slice(1, nearby.length).map(row => splitComma(row));

    // rule utils
    const checkRule = (rule, n) => {
      return (n >= rule.a0 && n <= rule.a1) ||
        (n >= rule.b0 && n <= rule.b1);
    };
    const checkRules = n => rules.some(rule => checkRule(rule, n));
    const checkRuleColumn = (rule, col) => {
      return nearby.some(ticket => {
        return !checkRule(rule, ticket[col]);
      }) ==  false;
    };

    // PART 1
    let p1 = 0;
    nearby.forEach(ticket => {
      ticket.forEach(val => {
        p1 += !checkRules(val) ? val : 0;
      });
    });
    console.log(p1);

    // PART 2
    nearby = nearby.filter(ticket => {
      return !ticket.some(n => !checkRules(n));
    });

    // map fields to ticket columns
    let columns = nearby[0].length;
    let fields = new Array(columns);
    for (let col=0; col<columns; col++) {
      fields[col] = [];
      rules.forEach(rule => {
        if (checkRuleColumn(rule, col))
          fields[col].push(rule.field);
      });
    }
    
    // filter fields
    loop:
    while (1) {
      for (let i=0; i<fields.length; i++) {
        let f = fields[i];
        if (f.length == 1) {
          let label = f[0];
          fields.forEach((f2, j) => {
            if (i !== j && f2.indexOf(label) !== -1) {
              f2.splice(f2.indexOf(label), 1);
            }
          });
        }
      };
      if (fields.some(f => f.length > 1))
        continue loop;
      break;
    }

    // get result
    ticket = ticket.filter((n, i) => fields[i][0].indexOf('departure') !== -1);
    let p2 = ticket.reduce((a, b) => a * b);
    console.log(p2);
    }
}

window.addEventListener('load', () => {
  const app = new App();
});
