# aoc5.py

import re

seats = [
    int(re.sub('[FL]', '0', re.sub('[BR]', '1', row)), 2)
        for row in open('data/5.txt').read().strip().split('\n')
]

# ?
