gtfs2mongo
==========

Pushes provided GTFS text/csv files into a collection of a specified MongoDB database.

Install
===
npm install gtfs2mongo

Concept
===

For handling scheduled data from a GTFS feed, MongoDB is perfect. The General Transit Feed Specification format uses Comma Separated Values (csv), which node can read using the csvtojson module. Then, using the native MongoDB module, the JSON can be recorded into a collection in a specified database. 

Info on GTFS: http://en.wikipedia.org/wiki/General_Transit_Feed_Specification

In order for the module to work, the GTFS data must be in a folder in the directory of the script running the module. The data files should have the following names:


agency.txt;

stops.txt;

routes.txt;

trips.txt;

stop_times.txt;

calendar.txt;

calendar_dates.txt;

fare_attributes.txt;

fare_rules.txt;

shapes.txt;

frequencies.txt;

transfers.txt;

feed_info.txt;

The module doesn't check to see if the files exist, it only reads what you specify through specific functions.

Function Overview
========

setURL (url):
  Sets global URL value 
  
URL MUST FOLLOW MONGODB PROTOCOL:   mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
read more here: http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html 
  
setGTFSFolder (destination):
  Declares folder for finding the CSV files. Default is './data'
  
getAgency():
  pulls from destination/agency.txt and stores collection under 'agency'
  
getCalendar():
  pulls from destination/calendar.txt and stores collection under 'calendar'
  
getCalendarDates():
  pulls from destination/calendar_dates.txt and stores collection under 'calendardates'
  
getRoutes():
  pulls from destination/routes.txt and stores collection under 'routes'
  
getShapes():
  pulls from destination/shapes.txt and stores collection under 'shapes'
  
getStopTimes():
  pulls from destination/stop_times.txt and stores collection under 'stoptimes'

getStops():
  pulls from destination/stops.txt and stores collection under 'stops'

getTrips():
  pulls from destination/trips.txt and stores collection under 'trips'

getFareRules():
  pulls from destination/fare_rules.txt and stores collection under 'farerules'

getFareAttributes():
  pulls from destination/fare_attributes.txt and stores collection under 'fareattributes'

getFrequency():
  pulls from destination/frequencies.txt and stores collection under 'frequencies'
  
getTransfers():
  pulls from destination/transfers.txt and stores collection under 'transfers'

getFeedInfo():
  pulls from destination/feed_info.txt and stores collection under 'feedinfo'
  
  
getData
=====
Cannot be explicitly called. Called by the above functions where location and collectionName are
defined distinctly in their call. getData does all of the work for reading/publishing to mongo.

getData (location, collectionName):
  read from csv file then connect to URL provided. Using name passed, delete any collection with 
  that name and create a new one with the JSON information.

Example Usage
========
var gtfs = require('gtfs2mongo');
gtfs.setGTFSFolder('./gtfsFiles'); //set from default to ./gtfsFiles
gtfs.setURL('mongodb://localhost:3001/meteor'); //Using Meteor, Mongodb usually on port 3001, not default 27017.
gtfs.getAgency();

Result in console:

Recorded _id: 5377900708f133671addcf09


Result on MongoDB: (results are from MARTA)

{ "agency_id" : "MARTA", "agency_name" : "Metropolitan Atlanta Rapid Transit Authority", "agency_url" : "http://www.itsmarta.com", "agency_timezone" : "America/New_York", "agency_lang" : "en", "agency_phone" : "", "_id" : ObjectId("5377900708f133671addcf09") }








