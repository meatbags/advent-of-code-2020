from math import *

lines = open("data/12.txt").readlines()
x = 0
y = 0
wx = 10
wy = 1
d = {"N": (0, 1), "S": (0, -1), "E": (1, 0), "W": (-1, 0)}

for line in lines:
    key = line[0]
    n = float(line[1:])

    if key == "L" or key == "R":
        theta = atan2(wy, wx)
        mag = hypot(wx, wy)
        sign = -1 if key == "R" else 1
        rot = n * pi / 180 * sign
        wx = mag * cos(theta + rot)
        wy = mag * sin(theta + rot)

    elif key in d:
        wx += n * d[key][0]
        wy += n * d[key][1]

    else:
        x += n * wx
        y += n * wy

print(x, y)
print(round(abs(x) + abs(y)))
