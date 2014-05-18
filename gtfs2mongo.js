var Converter=require("csvtojson").core.Converter;
var MongoClient = require('mongodb').MongoClient;

/*
	Author: William Edward Lee. Intern@Cycore Systems; cycoresys.com. github: theelee13
*/

module.exports={
	convert:  function (loc,DBI,cName,callback){
		var csvConverter=new Converter();
		csvConverter.on("end_parsed",function(jsonObj){
			var data = jsonObj["csvRows"];
			MongoClient.connect(DBI, function(err, db) {
				if(err){
					return callback(err);
				}
				db.dropCollection(cName, function(err,res){
					if(err){
						console.log("WARNING: If creating a new collection, ignore the following error:")
						console.log(err);
					}
				});
				var collection = db.collection(cName);
				collection.insert(data, function (err,record){
					if(err){
						return callback(err);
					}
					db.close();
					return callback(null,record[0]._id);
				});
			});
		});
		csvConverter.from(loc);
	}
}
