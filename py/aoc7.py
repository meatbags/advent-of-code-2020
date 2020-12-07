# aoc7.py

myBag = 'shiny gold'
bags = {
    a.split(' bags')[0]: 0 if "no" in a else [{
            c[1] + ' ' + c[2] : int(c[0])
        } for c in [
            b.split(' ') for b in a.split('contain ')[1].split(', ')
        ]
    ] for a in open('data/7.txt').readlines()
}

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
