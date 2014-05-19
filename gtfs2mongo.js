var parse = require('csv-parse');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var stream = require('stream');
/*
	Author: William Edward Lee. Intern@Cycore Systems; cycoresys.com. github: theelee13
*/

module.exports={
	convert:  function (loc,DBI,cName,upsertID,callback){
		var endFlag=false;
		var filestream = fs.createReadStream(loc);
		MongoClient.connect(DBI, function(err, db) {
			if(err){
				return callback(err);
			}
			var collection = db.collection(cName);
			var parser = parse({ columns:true});	//columns interprets first line as set of fields.
			parser.on('readable',function(){
				console.log('hi');
				record = parser.read()
				if(record===null){
					if(endFlag){
						console.log('endedFlag');
						db.close()
					}
					console.log('record==null');
					return callback(null);
				}
				if(record){
					put(record,upsertID,db,collection, function(err){
						if(err){
							db.close();
							console.log('fail to update');
							return callback(err);
						}
					});
					console.log('pre-emit');
				}
			});
			parser.on('error', function(err){
				return callback(err);
			});
			parser.on('end',function(){
				console.log('end received');
				endFlag=true;
			});
			filestream.pipe(parser);
		});
	}
}
put = function (rec,uID,database,collection,callback){
	collection.update({uID: rec[uID]},rec, function (err,record){
		if(!err){
		console.log('successfully written');
		}
		return callback(err);
	});
}
