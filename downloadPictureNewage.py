from bs4 import BeautifulSoup
import requests
from time import sleep
from links import linksPicture

exitProgram = False
listDownloadLinks = linksPicture()
listMaxImages = []
while not exitProgram :
    try :
        search = raw_input()
        if search == 'Exit' :
            exitProgram = True
            break
        url = 'http://training.ku.ac.th/01999013/student.php?i=' + str(search)
        req = requests.get(url)
        soup = BeautifulSoup(req.text)
        i = 0
        maxLengthImages = len(soup.find_all('img'))
        listMaxImages.append(maxLengthImages)

        for i in range(0, maxLengthImages):
            if i != 0 :
                imagesNumber = maxLengthImages - i
            else :
                imagesNumber = i
            link = soup.find_all('img')[imagesNumber].get('src')
            if listDownloadLinks.count(link) == 0 :
                print '\'' + link + '\'' + ','
                with open("%s_%02d.jpg" % (search,imagesNumber), 'w') as f:
                    #f.write(requests.get('http://training.ku.ac.th/01999013/'+link).content)
                    #print ('http://training.ku.ac.th/01999013/'+link)
                    sleep(1)
    except :
        print "Bomb | " + str(search)

print '=' * 50

output = ''
for x in listMaxImages :
    output += str(x) + ','

print '[' + output[:-1] + ']'
