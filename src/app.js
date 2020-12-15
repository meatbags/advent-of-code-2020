class App {
  constructor() {
    fetch('data/15.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            this.solve(this.sample, this.text);
          })
      });
  }

  solve(sample, text) {
    let data = text.trim().split(',').map(n => parseInt(n));

    // part 1
    this.compute(data, 2020);

    // part 2
    this.compute(data, 30000000);
  }

  compute(n, lim) {
    let map1 = new Array(lim);
    let map2 = new Array(lim);
    let prev = n[n.length - 1];
    let next = null;

    // set maps
    const speak = (num, i) => {
      if (map1[num] === undefined) {
        map1[num] = i;
      } else {
        map2[num] = map1[num];
        map1[num] = i;
      }
    };

    // map starting numbers
    n.forEach((n, i) => { speak(n, i); });

    // iterate
    for (let i=n.length; i<lim; i++) {
      next = map2[prev] === undefined ? 0 : map1[prev] - map2[prev];
      speak(next, i);
      prev = next;
    }

    console.log(next);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
