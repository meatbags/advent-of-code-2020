import { splitNewline, splitDoubleNewline, splitComma, toNumbers } from './util/aoc_utils';

class App {
  constructor() {
    fetch('data/21.txt')
      .then(res => res.text())
      .then(text => {
        this.text = text;
        fetch('data/sample.txt')
          .then(res => res.text())
          .then(text => {
            this.sample = text;
            this.solve(this.sample);
            this.solve(this.text);
          });
      });
  }

  solve(text) {
    let rows = text.trim().split('\n');
    let ingredient = {};
    let allergen = {};
    let result = [];

    rows.forEach(row => {
      const split = row.split(' (contains ');
      let allergens = split[1].replace(')', '').split(', ').map(e => e.trim());
      let ingredients = split[0].split(' ').map(e => e.trim());

      // add ingredients to result allergen
      allergens.forEach((item, i) => {
        if (!allergen[item]) {
          allergen[item] = { rows: [] };
        }
        allergen[item].rows.push(ingredients);
      });

      // record ingredients
      ingredients.forEach((item, i) => {
        if (!ingredient[item]) {
          ingredient[item] = {
            name: item,
            allergens: [],
            not: [],
            count: 0,
          };
        }
        ingredient[item].count += 1;
      });
    });

    // count
    let ingredients = Object.keys(ingredient);
    let allergens = Object.keys(allergen);
    let numIngredients = ingredients.length;
    let numAllergens = allergens.length;
    console.log("INGREDIENTS:", numIngredients, "ALLERGENS:", numAllergens);

    // check allergens against ingredients
    for (const a in allergen) {
      const obj = allergen[a];
      for (const item in ingredient) {
        let ok = true;
        for (let i=0; i<obj.rows.length; i++) {
          if (!obj.rows[i].includes(item)) {
            ok = false;
            break;
          }
        }
        if (!ok) {
          ingredient[item].not.push(a);
        }
      }
    }

    // p1
    let p1 = 0;
    for (const item in ingredient) {
      const obj = ingredient[item];
      if (obj.not.length == numAllergens) {
        p1 += obj.count;
        ingredients.splice(ingredients.indexOf(item), 1);
      } else {
        result.push(ingredient[item]);
      }
    }
    console.log(p1);

    // p2
    result.forEach(p => {
      // add extra allergens
      allergens.forEach(a => {
        if (!p.not.includes(a) && !p.allergens.includes(a)) {
          p.allergens.push(a);
        }
      });
      // remove NOT allergens
      p.not.forEach(name => {
        let index = p.allergens.indexOf(name);
        if (index !== -1) {
          p.allergens.splice(index, 1);
        }
      });
    });

    let i = 0;
    while (true) {
      result.forEach((p, i) => {
        if (p.allergens.length == 1) {
          let name = p.allergens[0];
          result.forEach((p2, j) => {
            if (i !== j) {
              let index = p2.allergens.indexOf(name);
              if (index !== -1) {
                p2.allergens.splice(index, 1);
              }
            }
          });
        }
      });

      if (result.filter(p => p.allergens.length !== 1).length == 0) {
        break;
      }
    }

    const p2 = result.sort((a, b) => {
      const aName = a.allergens[0];
      const bName = b.allergens[0];
      return aName > bName ? 1 : aName < bName ? -1 : 0;
    }).map(p => p.name).join(',');
    console.log(p2);
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
