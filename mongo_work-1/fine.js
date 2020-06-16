//npm install mongodb@2.2.36

const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
	if(err){
		return console.dir(err);
	}
	console.log('Connected to mongodb');

	/*
	InsertDocument(db, function(){
		db.close();
	});*/
	

	/*
	InsertDocuments(db, function(){
		db.close();
	});
	*/
	
	FindDocuments(db, function(){
		db.close();
	});
	
	/*
	QueryDocuments(db, function(){
		db.close();
	});
	*/
	/*
	UpdateDocuments(db, function(){
		db.close();
	});
	*/
/*
	RemoveDocument(db, function(){
		db.close();
	});
	*/
});

// Insert Single Doc
const InsertDocument = function(db, callback){

	//A callback is a function that is to be executed after another function has finished executing


	// Get Collection  CREATES DATABASE USERS IF NOT PRESENT
	const collection = db.collection('users');
	// Insert Docs
	collection.insert({
		name: 'Brad Traversy',
		email: 'brad@test.com'
	}, function(err, result){
		if(err){
			return console.dir(err);

			//The console.dir() method output the list of object properties of a specified object in the console to the user.
		}
		console.log('Inserted Document');
		console.log(result);
		callback(result);
	});
}

// Insert Multiple Docs
const InsertDocuments = function(db, callback){
	// Get Collection
	const collection = db.collection('users');
	collection.insertMany([
		{
			name:'John Doe',
			email: 'john@test.com'
		},
		{
			name:'Sam Smith',
			email: 'ssmith@test.com'
		},
		{
			name:'Jose Gomez',
			email: 'jgomez@test.com'
		}
	],
	function(err, result){
		if(err){
			return console.dir(err);
		}
		console.log('Inserted '+result.ops.length+' documents');
		callback(result);
	});
}

const FindDocuments = function(db, callback){
	const collection = db.collection('users');
	collection.find({}).toArray(function(err,docs){
	//Empty set of braces since i dont want to query anything
	if(err){
		return console.dir(err);
	}
	console.log('Found the following records');
	console.log(docs);
	callback(docs);
	});
}


const QueryDocuments = function(db, callback){
	const collection = db.collection('users');
	collection.find({'name':'John Doe'}).toArray(function(err,docs){
		if(err){
			return console.dir(err);
		}
		console.log('Found the followind record:  ');
		console.log(docs);
		callback(docs);
	});
}

const UpdateDocuments = function(db,callback){
	const collection = db.collection('users');
	collection.updateOne({name:'John Doe'},
		{$set: {email:'pramanik.ankit@gmai.com'}}, function(err, result){
			if (err){
				return console.dir(err);

			}
			console.log('updated Documents');
			callback();
		});
}

const RemoveDocument = function(db, callback){
	const collection = db.collection('users');
	collection.deleteOne({name:'John Doe'}, function(err, result){
		if (err){
			return console.dir(err);
		}
		console.log('Removed Documents');
		console.log(result);
		callback();
	});
}