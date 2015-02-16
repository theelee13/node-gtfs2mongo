var parse = require('csv-parse');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
/*
	Author: William Edward Lee. Intern@Cycore Systems; cycoresys.com. github: theelee13
*/
var count = 0;
module.exports={
	convert: function(loc,DBI,callback){
		for(var i = 0;i<13;i++){
			var fileLoc = './'+loc+'/'+fileMap[i]["fName"];
			if(fs.existsSync(fileLoc)){
				console.log(fileLoc+' found. Reading from file.');
				count++;
				core(fileLoc,DBI,i,callback);
			}
			else{
				console.log(fileLoc+' not found. Aborting read operation.');
			}
		}
	}
}
var put = function (rec,match,collection,callback){
	collection.update(match,rec,{upsert:true}, function (err,record){
		return callback(err);
	});
}

var matchFromArray = function (record,i){
	matchObject = {}
	for(var j =0;j<fileMap[i]["uID"].length;j++){
		var ident1 = fileMap[i]["uID"][j];
		matchObject[ident1]=record[ident1]
	}
	return matchObject;
}

var core = function (fileLoc,DBI,i,callback){
	var filestream = fs.createReadStream(fileLoc);
	MongoClient.connect(DBI, function(err, db) {
		console.log('Connected to '+DBI+' for file '+fileLoc);
		if(err){
			return callback(err);
		}
		var collection = db.collection(fileMap[i]["cName"]);
		var parser = parse({ columns:true});	//columns interprets first line as set of fields.
		parser.on('data',function(record){
			parser.pause();
			match=matchFromArray(record,i);
			put(record,match,collection,function(err){
				if(err){
					db.close();
					return callback(err);
				}
				if(count===0){
					console.log('Done with all files, closing connection. Last read: '+fileLoc);
					return callback(db.close());
				}
				parser.resume();
			});
		});
		parser.on('error', function(err){
			return callback(err);
		});
		parser.on('end',function(){
			console.log('Upsert successful for file '+ fileLoc);
			count--;
		});
		filestream.pipe(parser);
	});
}
var fileMap = [
	{'fName':'agency.txt','cName':'agency','uID':['agency_name']},
	{'fName':'calendar.txt','cName':'calendar','uID':['service_id']},
	{'fName':'calendar_dates.txt','cName':'calendar_dates','uID':['service_id']},
	{'fName':'stops.txt','cName':'stops','uID':['stop_id']},
	{'fName':'routes.txt','cName':'routes','uID':['route_id']},
	{'fName':'trips.txt','cName':'trips','uID':['trip_id']},
	{'fName':'stop_times.txt','cName':'stop_times','uID':['trip_id','stop_id']},
	{'fName':'fare_attributes.txt','cName':'fare_attributes','uID':['fare_id']},
	{'fName':'fare_rules.txt','cName':'fare_rules','uID':['fare_id']},
	{'fName':'shapes.txt','cName':'shapes','uID':['shape_id','shape_pt_sequence']},
	{'fName':'frequencies.txt','cName':'frequencies','uID':['trip_id']},
	{'fName':'transfers.txt','cName':'transfers','uID':['from_stop_id']},
	{'fName':'feed_info.txt','cName':'feed_info','uID':['feed_publisher_name']}
]
