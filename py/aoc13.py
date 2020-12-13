f = open('data/13.txt').readlines()
time = int(f[0])
buses = [int(x) if x != 'x' else x for x in f[1].split(',')]

# part 1
res = 0
min = -1
for i, id in enumerate(buses):
    if id == 'x':
        continue
    dt = id - (time % id)
    if min == -1 or dt < min:
        min = dt
        res = id * i
print(res)

# part 2
t = 1
n = 1
add = 1
for i, id in enumerate(buses):
    if id != 'x':
        while (t + i) % id != 0:
            t += add
        add *= id
print(t)
