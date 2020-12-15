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
    let now = performance.now();
    let p1 = this.compute(data, 2020);
    let t1 = performance.now() - now;
    let p2 = this.compute(data, 30000000);
    let t2 = performance.now() - now - t1;
    console.log(p1, t1);
    console.log(p2, t2);
  }

  compute(numbers, lim) {
    // map starting numbers
    let map = new Array(lim);
    numbers.forEach((n, i) => { map[n] = i+1; });

    // set index
    let res = numbers[numbers.length - 1];
    let i = numbers.length;

    while (i < lim) {
      let tmp = map[res];
      map[res] = i;
      res = tmp ? i - tmp : 0;
      i++;
    }

    return res;
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
