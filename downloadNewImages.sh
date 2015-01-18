#!bin/bash
python downloadPictureNewAge.py < womenNewAgeNisitID.txt >> NewLinks.txt
cat NewLinks.txt >> links.py
tail -1 links.py >> maxLengthImages.txt
vi links.py
