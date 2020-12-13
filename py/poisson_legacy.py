def count():
    y = 20 #epoch time in seconds
    z = 30 #number of epochs


    f.close()

    print ("timeframe is ", y, "seconds, with ", z, "epochs")
    start = input("to start counting press 'Enter' ")

    for i in range (1, z + 1):
        x = 0
        t = datetime.now() + timedelta(seconds=20)

        while datetime.now() < t:
            if keyboard.is_pressed("p"):
                print ("you pressed p")
                break
            if keyboard.is_pressed(' '):
                time.sleep(0.3)
                x += 1

        print ("Epoch ", i, "Count", x, "time ", datetime.now().strftime('%M:%S'))

        f = open('poisson.txt','a')
        f.write(str(i) + ', ' + str(x) + ', ' + str(datetime.now().strftime('%d/%m/%Y %H:%M:%S')) + '\n')
        f.close()
