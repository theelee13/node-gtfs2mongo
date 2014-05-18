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

Function Overview
========

convert( gtfsFileLocation, DBI, collectionName, callback(err,obID))

gtfsFileLocation is the location of the .txt file (in reference to current directory) to pull GTFS data from.

DBI is the "url" of the database, which follows the syntax noted here: http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html

The collectionName is whatever you want to name the collection. 

callback stores (upon successful operation) the objectID field value into obID.

Example Usage
========
var gtfs = require('gtfs2mongo');
gtfs.convert('./data/agency.txt','mongodb://localhost:3001/meteor','agency',function (err,obID){
  if(err) throw err;
  console.log(obID);
});


Result in console:

5377900708f133671addcf09

Result on MongoDB: (results are from MARTA)

{ "agency_id" : "MARTA", "agency_name" : "Metropolitan Atlanta Rapid Transit Authority", "agency_url" : "http://www.itsmarta.com", "agency_timezone" : "America/New_York", "agency_lang" : "en", "agency_phone" : "", "_id" : ObjectId("5377900708f133671addcf09") }








