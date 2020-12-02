/** Day 2 */

class Day2 {
  solve(text) {
    let p1 = 0;
    let p2 = 0;
    
    const data = text.trim().split('\n');
    data.forEach(row => {
      const i = parseInt(row.split('-')[0]);
      const j = parseInt(row.split(' ')[0].split('-')[1]);
      const letter = row.split(' ')[1].replace(':', '');
      const password = row.split(': ')[1];

      // p1
      const n = (password.match(new RegExp(letter, 'g')) || []).length;
      if (n >= i && n <= j) {
        p1++;
      }

      // p2
      if ((password[i-1] == letter) ^ (password[j-1] == letter)) {
        p2++;
      }
    });

    console.log(p1, p2);
    return 'p1: ' + p1 + '\n' + 'p2: ' + p2;
  }
}

export default Day2;
