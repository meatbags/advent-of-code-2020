# not my solution

# inputs
rows = []
for line in open('data/8.txt').readlines():
    c = line.split(' ')[0]
    i = int(line.split(' ')[1])
    rows.append((c, i))

def step(i, acc, rows, swap):
    cmd, n = rows[i]
    if swap and not cmd == "acc":
        cmd = "nop" if cmd == "jmp" else "jmp"
    i += n if cmd == "jmp" else 1
    acc += n if cmd == "acc" else 0
    return (i, acc)

def fast_gold():
    i = 0
    acc = 0
    seen = set()
    branch_seen = set()

    while i != len(rows):
        cmd, n = rows[i]
        seen.add(i)

        #branch on jmp/nop
        if cmd == "jmp" or cmd == "nop":
            b_ip, b_acc = step(i, acc, rows, True)

            while b_ip != len(rows):
                #stop branch if instruction has been seen
                if b_ip in seen or b_ip in branch_seen:
                    break
                branch_seen.add(b_ip)
                b_ip, b_acc = step(b_ip, b_acc, rows, False)

            if b_ip == len(rows):
                return b_acc

        i, acc = step(i, acc, rows, False)

print(fast_gold())
