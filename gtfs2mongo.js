var parse = require('csv-parse');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
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
			parser.on('data',function(record){
				parser.pause();
				put(record,upsertID,db,collection,function(err){
					if(err){
						db.close();
						return callback(err);
					}
					if(endFlag){
						return callback(db.close());
					}
					parser.resume();
				});
			});
			parser.on('error', function(err){
				return callback(err);
			});
			parser.on('end',function(){
				endFlag=true;
			});
			filestream.pipe(parser);
		});
	}
}
put = function (rec,match,database,collection,callback){
	collection.update(match,rec,{upsert:true}, function (err,record){
		return callback(err);
	});
}
