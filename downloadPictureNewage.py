from bs4 import BeautifulSoup
import requests
from time import sleep

while True :
    try :
        search = raw_input()
        if search == 'Exit' :
            break
        url = 'http://training.ku.ac.th/01999013/student.php?i=' + str(search)
        req = requests.get(url)
        soup = BeautifulSoup(req.text)
        i = 0
        for x in soup.find_all('img'):
            #print x.get('src')
            link = x.get('src')
            with open("%s_%02d.jpg" % (search,i), 'w') as f:
                f.write(requests.get('http://training.ku.ac.th/01999013/'+link).content)
                print ('http://training.ku.ac.th/01999013/'+link)
                i += 1
    except :
        print "Bomb | " + str(search)
        i += 1

    sleep(1)
