class App {
  constructor() {
    fetch('data/13.txt')
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
    console.log(sample);
    console.log(text);
    let target = sample;
    target = text;
    let d = target.trim().split('\n').map(row => row.trim());
    console.log(d.length);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
