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
