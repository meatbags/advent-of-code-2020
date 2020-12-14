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
    //console.log(sample);
    //console.log(text);
    let target = sample;
     target = text;

    let d = target.trim().split('\n').map(row => {
      let cmd = row.split(" = ")[0];
      let addr = cmd !== "mask" ? BigInt(parseInt(row.split("[")[1].split("]")[0])) : null;
      let val = row.split(" = ")[1];
      return {
        cmd: cmd,
        addr: addr,
        val: cmd == "mask" ? val : BigInt(parseInt(val)),
        orig: row,
      }
    });
    console.log(d.length);
    console.log(d);

    let mem = {};
    let maskOR = 0;
    let maskAND = 0;
    let maskX = 0;
    let addresses = [];

    d.forEach(row => {
      // get mask
      if (row.cmd == 'mask') {
        const mOR = row.val.replace(/[X0]/g, '0');
        const mAND = row.val.replace(/[10]/g, '1').replace(/X/g, '0');
        maskOR = BigInt(parseInt(mOR, 2));
        maskAND = BigInt(parseInt(mAND, 2));

        // get limits
        const max = parseInt(row.val.replace(/[10]/g, '').replace(/X/g, '1'), 2);
        const indices = row.val.split('').map((e, i) => {
          return e == 'X' ? 35 - i : null;
        }).filter(e => e !== null);

        // calc addresses
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
        //console.log(addresses);
        console.log('X:', row.val, mAND, 'COMBOS:', max);

      // calc addresses
      } else {
        let addr = row.addr;
        addr = addr | maskOR;
        addr = addr & maskAND;

        console.log('ADDR:', row.addr, '|&', addr);
        addresses.forEach(a => {
          let k = addr + a;
          //console.log(' ', k);
          mem[k] = row.val;
        });
      }
    });

    let acc = BigInt(0);
    Object.keys(mem).forEach(key => {
      acc += mem[key];
    });
    console.log(mem);
    console.log(acc);

    /*
    let mem = {};
    let mask1 = 0;
    let mask0 = 0;

    d.forEach(row => {
      if (row.cmd == 'mask') {
        const m1 = row.val.replace(/[X0]/g, '0');
        const m0 = row.val.replace(/[X1]/g, '1');
        mask1 = BigInt(parseInt(m1, 2));
        mask0 = BigInt(parseInt(m0, 2));
        // console.log(m1, m0, mask1, mask0);
      } else {
        let val = row.val;
        val = val | mask1;
        val = val & mask0;
        mem[row.addr] = val;
      }
    });

    let acc = BigInt(0);
    Object.keys(mem).forEach(key => {
      acc += mem[key];
    });
    console.log(mem);
    console.log(acc);
    */
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
