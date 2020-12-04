/* Day 4 */

class Day4 {
  constructor() {}

  solve(text) {
    const passports = text.split('\r\n\r\n');
    const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const optional = ['cid'];

    // part 1
    let p1 = 0;
    passports.forEach(p => {
      let valid = 1;
      required.forEach(key => {
        if (p.indexOf(key + ':') == -1) {
          valid = 0;
        }
      });
      p1 += valid;
    });
    console.log(p1);

    // part 2
    let p2 = 0;
    passports.forEach(p => {
      if (
        p.match(/byr:(19[2-9][0-9]|200[0-2])(\s|$)/) &&
        p.match(/iyr:(2020|201[0-9])(\s|$)/) &&
        p.match(/eyr:(2030|202[0-9])(\s|$)/) &&
        p.match(/hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)(\s|$)/) &&
        p.match(/hcl:#[0-9a-f]{6}(\s|$)/) &&
        p.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/) &&
        p.match(/pid:[0-9]{9}(\s|$)/)
      ) {
        p2 += 1;
      }
    });
    console.log(p2);
    return `p1: ${p1}\np2: ${p2}`
  }
}

export default Day4;
