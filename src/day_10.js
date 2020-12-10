/** Day 10 */

class Day10 {
  constructor() {}

  solve(text) {
    // parse
    let lines = text.trim().split('\n').map(line => {
      return parseInt(line);
    }).sort((a, b) => a - b);
    let jolts = [0, ...lines, lines[lines.length - 1] + 3];

    // p1
    let step1 = 0;
    let step3 = 0;
    for (let i=0; i<jolts.length; i++) {
      if (jolts[i+1] - jolts[i] == 1) {
        step1++;
      } else if (jolts[i+1] - jolts[i] == 3) {
        step3++;
      }
    }
    console.log('P1:', step1 * step3);

    // part 2
    const nodes = jolts.map(n => ({jolts: n, conns: 0}));
    nodes[0].conns = 1;
    for (let i=0; i<nodes.length; i++) {
      const node = nodes[i];
      for (let j=i+1; j<nodes.length; j++) {
        if (nodes[j].jolts - node.jolts > 3)
          break;
        nodes[j].conns += node.conns;
      }
    }
    console.log('P2:', nodes[nodes.length-1].conns);

    return;
  }
}

export default Day10;
