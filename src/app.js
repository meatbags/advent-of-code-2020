class App {
  constructor() {
    fetch('data/14.txt')
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
    let d = text.trim().split('\n').map(row => {
      let cmd = row.split(" = ")[0];
      let addr = cmd !== "mask" ? BigInt(parseInt(row.split("[")[1].split("]")[0])) : null;
      let val = row.split(" = ")[1];
      return { cmd, addr, val: cmd == "mask" ? val : BigInt(parseInt(val)) };
    });

    // PART 1
    let mem = {};
    let maskOR = 0;
    let maskAND = 0;

    d.forEach(row => {
      if (row.cmd == 'mask') {
        maskOR = BigInt(parseInt(row.val.replace(/[X0]/g, '0'), 2));
        maskAND = BigInt(parseInt(row.val.replace(/[X1]/g, '1'), 2));
      } else {
        let val = row.val;
        val = val | maskOR;
        val = val & maskAND;
        mem[row.addr] = val;
      }
    });

    let res = BigInt(0);
    Object.keys(mem).forEach(key => { res += mem[key]; });
    console.log(res);

    // PART 2
    mem = {};
    maskOR = 0;
    maskAND = 0;
    let addresses = [];

    d.forEach(row => {
      // get mask
      if (row.cmd == 'mask') {
        maskOR = BigInt(parseInt(row.val.replace(/[X0]/g, '0'), 2));
        maskAND = BigInt(parseInt(row.val.replace(/[10]/g, '1').replace(/X/g, '0'), 2));

        // get limits
        const max = parseInt(row.val.replace(/[10]/g, '').replace(/X/g, '1'), 2);
        const indices = row.val.split('').map((e, i) => {
          return e == 'X' ? 35 - i : null;
        }).filter(e => e !== null);

        // calculate addresses
        addresses = [];
        for (let i=0; i<=max; i++) {
          let j = i;
          let addr = BigInt(0);
          indices.forEach(index => {
            if (j & 1)
              addr += BigInt(Math.pow(2, index));
            j >>= 1
          });
          addresses.push(addr);
        }

      } else {
        let addr = row.addr | maskOR & maskAND;
        addresses.forEach(a => { mem[addr + a] = row.val; });
      }
    });

    res = BigInt(0);
    Object.keys(mem).forEach(key => { res += mem[key]; });
    console.log(res);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
