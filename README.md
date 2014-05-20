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

Function Overview
========

convert( gtfsFolderLocation, DBI, callback(err))

gtfsFileLocation is the location of the folder housing the GTFS files. This is the name of the folder only, no /data or data/ will work.

DBI is the "url" of the database, which follows the syntax noted here: http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html

The callback provides error information only,

Example Usage
========

````
var gtfs = require('gtfs2mongo');
gtfs.convert('data','mongodb://localhost:3001/meteor',function (err){
  if(err) throw err;
});
process.exit();
````
