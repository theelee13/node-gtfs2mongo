var gtfs = require('./gtfs2mongo.js');
gtfs.convert('data','mongodb://localhost:3001/meteor',function(err){
	if(err){
		console.log(err);
	}
	process.exit();
});
/*
	3001 is the default port for meteor, while mongo usually uses 27017.
	This module can also convert other forms of CSV into mongoDB databases.
	This example assumes a MongoDB database is already running at localhost:3001, with name meteor.
*/
