from bs4 import BeautifulSoup as bs
from geopy.geocoders import Nominatim
from lxml import html
import re 
import requests



def constructJSON(rawVenue):
	print(hi)

def getLatLon(streetAddress):
	#print(streetAddress)
	geolocator = Nominatim()
	location = geolocator.geocode(streetAddress);
	#print((location.latitude, location.longitude))
	return location


def createVenue(rawString):
	string = rawString
	#print(string)
	day = re.compile('(.*?)</h3>')
	day = day.search(string)
	print("Day is: " + day.group(1))
	
	perVenue = re.compile('<a title(.*?)<a', re.IGNORECASE | re.DOTALL)
	venueBlocksByDay = perVenue.findall(string)

	address = re.compile('="(.*?)"')
	url = re.compile('href="(.*?)"')
	name=re.compile('left25">(.*?)</a')
	timeOfDay=re.compile('</span>(.*?pm)<b')

	#print(venueBlocksByDay[0]);

	#address = re.compile('="(.*?)"')
	#addressOutput = address.search(venueBlocksByDay[0])
	##print(addressOutput.group(1))
	#address = addressOutput.group(1)
	#getLatLon(address)

	for i in venueBlocksByDay:
		addressOut, addressCoords, urlOut, nameOut, timeOfDayOut = '','','', '', ''
		print ("Block is: " + i)
		addressOut = address.search(i).group(1)
		print("Address is: " + addressOut)
		addressCoords = getLatLon(addressOut)
		print(addressCoords)
		print((addressCoords.latitude, addressCoords.longitude))
		#urlOut = url.search(string).group(1)
		#print(urlOut)
		nameOut = name.search(string).group(1)
		print(nameOut)
		#
		#timeOfDayOut = timeOfDay.search(string)
		#print(timeOfDayOut.group(1))
	

r = requests.get('http://www.geekswhodrink.com/')
queryValue = 'radius=20&zipcode=78701'

#r = requests.post('http://www.geekswhodrink.com/pages/venues?action=getVenuesByZip', data=queryValue)
r = requests.post('http://www.geekswhodrink.com/pages/venues?action=getVenuesByState&state=TX')
#print(r.status_code)

if r.status_code == 200:
	rawInput = r.text;	
	#print (rawInput);
	#rawInput='TabPanel1ioupoipuoij234kl;j;234sidebar'
	a = re.compile('TabPanel(.*?)sidebar', re.IGNORECASE | re.DOTALL)
	rawInput = a.findall(rawInput)

	#print(rawInput)

	rawInput=str(rawInput)
	#print(rawInput)

	b = re.compile('<h3>(.*?day.*?)</p', re.IGNORECASE | re.DOTALL)

	input = b.findall(rawInput)

	createVenue(input[1])

	for i in input:
		#print(i+"\n")
		createVenue(i)








