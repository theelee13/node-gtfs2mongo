gtfs2mongo
==========

Pushes provided GTFS text/csv files into a collection of a specified MongoDB database.

Install
===
npm install gtfs2mongo

Concept
===

For handling scheduled data from a GTFS feed, MongoDB is perfect. The General Transit Feed Specification format uses Comma Separated Values (csv), which node can read using the csv-parse module. Then, using the native MongoDB module, the JSON can be recorded into a collection in a specified database. 

Info on GTFS: http://en.wikipedia.org/wiki/General_Transit_Feed_Specification

Function Overview
========

convert( gtfsFolderLocation, DBI, callback(err))

gtfsFileLocation is the location of the folder housing the GTFS files. This is the name of the folder only, no /data or data/ will work.

DBI is the "url" of the database, which follows the syntax noted here: http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html

The callback provides error information only.

Upon startup, the function first checks for all GTFS files (do NOT alter their names, they are standardized), and only creates Mongo connections for those found. So, if I have all files but only want routes.txt, my data folder would look like this:

````
$cd gtfsData
$ls
  routes.txt*
````

Once connected, an upsert process begins for each document, specified by an ID unique to each file. In future versions, an optional parameter *may* allow for the alteration of this ID. A collection is updated/inserted on the database with a name similar to that of the input file. agency.txt creates a collection agency, routes.txt : routes. 

Example Usage
========

````
var gtfs = require('gtfs2mongo');
gtfs.convert('data','mongodb://localhost:3001/meteor',function (err){
  if(err) throw err;
});
process.exit();
````

Please note that both shapes and fare_rules may *not* properly complete the upsert operation. Support for this file will be included in a future update. If necessary, include the ability to upsert by two separate fields.
