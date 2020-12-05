# aoc4.py

import re

exp = '(?=.*byr)(?=.*iyr)(?=.*eyr)(?=.*hgt)(?=.*hcl)(?=.*ecl)(?=.*pid)'
passports = [
    p.replace('\n','') for p in open('data/4.txt').read().split('\n\n')
]
p1 = sum([
    bool(re.search(exp, p)) for p in passports
])

print(p1)
