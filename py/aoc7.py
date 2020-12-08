# aoc7.py

myBag = 'shiny gold'
bags = {}

# create bag map
for line in open('data/7.txt').readlines():
    key = line.split(' bags')[0]
    if "no" in line:
        bags[key] = 0
    else:
        bags[key] = []
        for i in line.split('contain ')[1].split(', '):
            parts = i.split(' ')
            k = parts[1] + ' ' + parts[2]
            v = int(parts[0])
            bags[key].append({ k: v })
print(bags)

# p1
def check(bag):
    if not bag:
        return 0
    for b in bag:
        k = list(b.keys())[0]
        if myBag == k or check(bags[k]):
            return 1
    return 0

p1 = sum([ check(bags[k]) for k in bags ])
print(p1)

# p2
def count(bag):
    if not bag:
        return 0
    acc = 0
    for b in bag:
        k = list(b.keys())[0]
        acc += b[k] + b[k] * count(bags[k])
    return acc

p2 = count(bags[myBag])
print(p2);
