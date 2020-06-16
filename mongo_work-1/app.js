const MongoClient = require('mongodb').MongoClient;





//connection url
const url = ('mongodb://localhost:27017/myproject', {useUnifiedTopology: true});



//insert single doc
const InsertDocument = function(db, callback){

	//get collection
	const collection = db.collection('users');
	//insert documents
	collection.insert({
		name:'Ankit',
		email:'pramanik.85849@gmail.com'
	}, function(err, result){
		if (err){
			return console.dir(err);

		}
		console.log('inserted Document');
		console.log(result);
		callback(result);
	});
}

//MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, InsertDocument (db, function() {
   
//      if (err) throw err;
//    console.log("Database created!");
//    db.close();
//}));





const client = MongoClient(url, {useNewUrlParser: true,useUnifiedTopology: true});

MongoClient.connect(url, function(err, db){
	if (err){
		return console.dir(err);

		
	}
	console.log('connected to mongodb');

	InsertDocument(db, function(){
		db.close();
	});
});













const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017";

connect();
async function connect(){
	const client = new MongoClient();

	try{
		await client.connect();
		client.db("users"); 
		console.log('connected to database db');
	}
	catch (ex){
		console.error("something happened" +ex);
	}
	finally{
		client.close();
	}
}


