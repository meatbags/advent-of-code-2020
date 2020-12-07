# aoc7.py

bags = {
    a.split(' bags')[0] : [{
        c[1] + ' ' + c[2] : int(c[0])
    } for c in [
        b.split(' ') for b in a.split('contain ')[1].split(', ')
    ]] if not "no" in a else False
    for a in open('data/7.txt').readlines()
}

print(bags)
