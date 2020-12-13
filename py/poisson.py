import keyboard
import time
import datetime
from datetime import datetime
from datetime import timedelta

def writeToFile(timestamps, epochs, startTime, duration):
    path = 'poisson.txt';
    f = open(path, 'w')
    f.write('Epoch, Count, Time\n')

    for i in range(0, epochs):
        pressesThisEpoch = 0

        # find presses inside this epoch
        epochStart = startTime + timedelta(seconds=(duration * i))
        epochEnd = startTime + timedelta(seconds=(duration * (i + 1)))
        for t in timestamps:
            if t >= epochStart and t < epochEnd:
                pressesThisEpoch += 1

        # write to file
        line = str(i + 1) + ', ';
        line += str(pressesThisEpoch) + ', '
        line += epochStart.strftime('%Y-%m-%d %H:%M:%S')
        f.write(line + '\n')
        print(line)

    f.close()
    print('\nSaved to `' + path + '`\n')

def addTimestamp(timestamps):
    timestamps.append(datetime.now())

def start():
    epochs = 3
    duration = 1
    timestamps = []
    startTime = datetime.now()
    projectedEnd = startTime + timedelta(seconds=(duration * epochs))
    keyboard.add_hotkey(' ', addTimestamp, args=[timestamps])
    complete = False;

    print('')
    print('Press [SPACE] to increment counter')
    print('Press [P] to write to file and exit')

    while True:
        if not complete and datetime.now() > projectedEnd:
            complete = True
            print('\n' + str(epochs) + ' Epochs have elapsed, press [P] to create file and exit\n')
        # end program
        if keyboard.is_pressed("esc") or keyboard.is_pressed('p'):
            writeToFile(timestamps, epochs, startTime, duration);
            break;

    print('Done')

input('Press [ENTER] to start');
start()
