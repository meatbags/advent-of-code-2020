/* Day 4 */

class Day4 {
  constructor() {}

  solve(text) {
    const passports = text.split('\r\n\r\n');
    const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const optional = ['cid'];

    // part 1
    const p1 = passports.filter(p =>
      p.match(/byr:/) &&
      p.match(/iyr:/) &&
      p.match(/eyr:/) &&
      p.match(/hgt:/) &&
      p.match(/hcl:/) &&
      p.match(/ecl:/) &&
      p.match(/pid:/)
    ).length;
    console.log(p1);

    // part 2
    const p2 = passports.filter(p =>
      p.match(/byr:(19[2-9][0-9]|200[0-2])(\s|$)/) &&
      p.match(/iyr:(2020|201[0-9])(\s|$)/) &&
      p.match(/eyr:(2030|202[0-9])(\s|$)/) &&
      p.match(/hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)(\s|$)/) &&
      p.match(/hcl:#[0-9a-f]{6}(\s|$)/) &&
      p.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/) &&
      p.match(/pid:[0-9]{9}(\s|$)/)
    ).length;
    console.log(p2);

    return `p1: ${p1}\np2: ${p2}`
  }
}

export default Day4;
