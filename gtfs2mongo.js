var Converter=require("csvtojson").core.Converter;
var MongoClient = require('mongodb').MongoClient;
var url;					//global. Must be set with setURL.	
var dest='./data';	//dest is the folder's location (containing the GTFS data) in reference to the calling method. Default is './data'

/*
	Author: William Edward Lee. Intern@Cycore Systems; cycoresys.com. github: theelee13
*/

module.exports={
	//call this before calling any method (besides convert)
	setURL: function (turl){
		url=turl;
	},

	setGTFSFolder: function (ndest){
		dest=ndest;
	},

	getAgency: function (){
		getData(dest+'/agency.txt','agency');
	},

	getCalendar: function (){
		getData(dest+'/calendar.txt','calendar');
	},

	getCalendarDates: function (){
		getData(dest+'/calendar_dates.txt','calendardates');
	},

	getRoutes: function (){
		getData(dest+'/routes.txt','routes');
	},

	getShapes: function (){
		getData(dest+'/shapes.txt','shapes');	
	},

	getStopTimes: function (){
		getData(dest+'/stop_times.txt','stoptimes'); 
	},

	getStops: function (){
		getData(dest+'/stops.txt','stops');
	},

	getTrips: function (){
		getData(dest+'/trips.txt','trips');
	}
}

/*
   getData is the heart of the library, as it performs all functionality.
It works by converting the destination provided csv file to a JSON, and then
connecting to a MongoDB database (specified in URL), where it will delete
the named collection and create a new collection with its name and the JSON data.

*/

getData = function (loc,cName){
	var csvConverter=new Converter();
	csvConverter.on("end_parsed",function(jsonObj){
		var getstoptimeData = jsonObj["csvRows"];
		MongoClient.connect(url, function(err, db) {
			if(err) throw err;
			console.log('hi');
			db.dropCollection(cName, function(err,res){
				if(err) throw err;
			});
			var collection = db.collection(cName);
			collection.insert(getstoptimeData, function(err,record){
				if(err) throw err;
				console.log('Recorded _id: '+record[0]._id);	//provide the ObjectID variable to console.
				db.close();
			});
		});
	});
	csvConverter.from(loc);
};
