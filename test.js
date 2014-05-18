var gtfs = require('./gtfs2mongo.js');
gtfs.convert('./data/agency.txt','mongodb://localhost:3001/meteor','agency',function (err,obID){
	if(err) throw err;
	console.log(obID);
});
/*
	3001 is the default port for meteor, while mongo usually uses 27017.
	This module can also convert other forms of CSV into mongoDB databases.
*/
