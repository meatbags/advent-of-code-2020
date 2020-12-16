import * as Util from './util/aoc_utils';

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
    let data = Util.splitDoubleNewline(text);

    // parse
    let rules = Util.splitNewline(data[0]);
    rules = rules.map(rule => {
      let a = rule.split(': ')[1].split(' or ')[0];
      let b = rule.split(': ')[1].split(' or ')[1];
      return {
        field: rule.split(':')[0],
        a: {min: parseInt(a.split('-')[0]), max: parseInt(a.split('-')[1])},
        b: {min: parseInt(b.split('-')[0]), max: parseInt(b.split('-')[1])}
      };
    });
    let ticket = Util.splitNewline(data[1]);
    ticket = ticket.slice(1, ticket.length).map(row => Util.splitComma(row))[0];
    let nearby = Util.splitNewline(data[2]);
    nearby = nearby.slice(1, nearby.length).map(row => Util.splitComma(row));

    // utils
    const checkRule = (rule, n) => {
      return n >= rule.a.min && n <= rule.a.max ||
      n >= rule.b.min && n <= rule.b.max;
    }
    const checkRules = n => {
      for (let j=0; j<rules.length; j++)
        if (checkRule(rules[j], n))
          return true;
      return false;
    }
    const checkRuleAll = (rule, i) => {
      for (let j=0; j<nearby.length; j++)
        if (!checkRule(rule, nearby[j][i]))
          return false;
      return true;
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
    // filter invalid  tickets
    nearby = nearby.filter(ticket => {
      let ok = true;
      ticket.forEach((n, i) => {
        ok = ok && checkRules(n);
      });
      return ok;
    });

    // get potential fields
    let size = nearby[0].length;
    let fields = new Array(size);

    for (let i=0; i<size; i++) {
      fields[i] = [];
      for (let j=0; j<rules.length; j++) {
        let rule = rules[j];
        let res = checkRuleAll(rule, i);
        if (res) {
          fields[i].push(rule.field);
        }
      }
    }

    // filter fields
    loop:
    while (true) {
      for (let i=0; i<size; i++) {
        if (fields[i].length == 1) {
          let name = fields[i][0];
          for (let j=0; j<size; j++) {
            if (j == i)
              continue;
            let index = fields[j].indexOf(name);
            if (index !== -1)
              fields[j].splice(index, 1);
          }
        }
      }

      for (let i=0; i<size; i++)
        if (fields[i].length > 1)
          continue loop;
      break;
    }

    // get result
    ticket = ticket.filter((n, i) => fields[i][0].indexOf('departure') !== -1);
    console.log(ticket.reduce((a, b) => a * b));
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
