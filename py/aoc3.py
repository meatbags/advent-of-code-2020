# aoc3.py
from functools import reduce
f = open("data/3.txt", "r")
data = [str.replace('\n', '') for str in f.readlines()]
sleds = [[1,1,0], [3,1,0], [5,1,0], [7,1,0], [1,2,0]]
for i in range(len(data)):
    for j in sleds:
        x, y = j[0], j[1]
        if i % y == 0 and data[i][int(i / y) * x % 31] == '#':
            j[2] += 1
p1 = sleds[1][2]
p2 = reduce(lambda x, y: x*y, [x[2] for x in sleds])
print(p1, p2)
