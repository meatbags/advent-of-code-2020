<<<<<<< HEAD
f=open("data/13.txt")
time=int(f.readline())
buses=[int(x) if x!='x' else x for x in f.readline().split(',')]

# part 1
best=min(filter(lambda x: x!='x', buses),key=lambda b: b-time%b)
print(best*(best-time%best))

# part 2
res,prod=0,1
for i,b in filter(lambda x: x[1]!='x',enumerate(buses)):
    while (res+i)%b:
        res+=prod
    prod*=b

print(res)
=======
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
>>>>>>> 1d1bd6ff0fcd1de6dde3e96a5c585ab57a38760d
