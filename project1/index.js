var express  = require('express'); //web application server framework
var bodyparser = require('body-parser'); //middleware
//to extract body from the incoming request
var path = require('path'); //to work with simple file paths

//var pug = require('pug');

var app = express();

//middleware - a function which has access to the request and response objects

app.use(function(req, res, next){
	console.log('Time: ', Date.now());
	next();
});

//app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"));

app.get("/pug", function(req,res){
	res.render('index2',{
		title: 'Hello World from NODE.JS',
		showTitle:false,
		people:['Ankit', 'Ram', 'amit']
	});
})

app.get("/", function(req,res){
	res.send("hey guys welcome to home");
});

app.get('/about', function(req,res){
	
	//res.sendFile(__dirname + "/about.html");
	res.render('about')
})

app.get('/contact', function(req,res){
	
	//res.sendFile(__dirname + "/life.html");
	res.render('contacts');
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
//to work with utf-8 encoded data, set it to false

app.listen(3000);
console.log('Server started on port 3000');

module.exports = app;