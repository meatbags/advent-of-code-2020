import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/23.txt')
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
    let originalCups = text.trim().split('').map(e => parseInt(e));
    let cups = [ ...originalCups ].map(e => ({value: e}));
    let currentIndex = 0;
    let currentCup = cups[0];
    let min = Math.min( ...cups.map(cup => cup.value) );
    let max = Math.max( ...cups.map(cup => cup.value) );

    // make linked list
    const createLinkedList = () => {
      for (let i=0; i<cups.length; i++) {
        // next cup clockwise
        let cup = cups[i];
        cup.next = i == cups.length - 1 ? cups[0] : cups[i + 1];

        // cache previous cup location
        if (i < originalCups.length + 1) {
          let v = cup.value - 1;
          v = v < min ? max : v;
          let index = cups.findIndex(cup => cup.value == v);
          cup.prev = cups[index];
        } else {
          cup.prev = cups[i - 1];
        }
      }
    };

    // game function
    const nextMove = () => {
      // get next three cup values
      let a = currentCup.next;
      let b = a.next;
      let c = b.next;
      let nextCup = c.next;

      // find destination
      let dest = currentCup.prev;
      while (
        dest.value == a.value ||
        dest.value == b.value ||
        dest.value == c.value
      ) {
        dest = dest.prev;
      }

      // reposition cups
      c.next = dest.next;
      dest.next = a;
      currentCup.next = nextCup;
      currentCup = nextCup;
    };

    // PART 1
    createLinkedList();

    for (let i=0; i<100; i++) {
      nextMove();
    }

    let p1 = '';
    cup = cups[0];
    while (p1.length < cups.length) {
      p1 += cup.value;
      cup = cup.next;
    }
    p1 = `${p1.split('1')[1]}${p1.split('1')[0]}`;
    console.log(p1);

    // PART 2
    // reset
    cups = [ ...originalCups ].map(e => ({value: e}));
    currentCup = cups[0];
    while (max < 1000000) {
      max += 1;
      cups.push({ value: max });
    }

    // make linked list
    createLinkedList();

    // play game
    for (let i=0; i<10000000; i++) {
      nextMove();
    }

    let cup = cups.find(cup => cup.value == 1);
    let p2 = cup.next.value * cup.next.next.value;
    console.log(p2);
    }
}

window.addEventListener('load', () => {
  const app = new App();
});
