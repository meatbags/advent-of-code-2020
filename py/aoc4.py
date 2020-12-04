# aoc4.py

import re

exp = '(?=.*byr)(?=.*iyr)(?=.*eyr)(?=.*hgt)(?=.*hcl)(?=.*ecl)(?=.*pid)'
passports = [p.replace('\n','') for p in open('data/4.txt').read().split('\n\n')]
p1 = sum([ bool(re.search(exp, p)) for p in passports ])
p2 = sum([ bool(
        re.search('byr:(19[2-9]|200[0-2])')
) for p in passports])

print(p1)
print(p2)

#!/bin/sh
cat "$1" | tr '\n' '~' | sed -e 's/~~/ \n/g' -e 's/~/ /g' |
egrep 'byr:(19[2-9][0-9]|200[0-2]) ' |
egrep 'iyr:(2020|201[0-9]) ' |
egrep 'eyr:(2030|202[0-9]) ' |
egrep 'hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in) ' |
egrep 'hcl:#[0-9a-f]{6} ' |
egrep 'ecl:(amb|blu|brn|gry|grn|hzl|oth) ' |
egrep 'pid:[0-9]{9} ' |
wc -l

req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
data = (open('data/4.txt')).read().split('\n\n')
n = 0
for p in data:
    res = 1
    for r in req:
        if p.find(r) == -1:
            res = 0;
    n += res
print(n)
