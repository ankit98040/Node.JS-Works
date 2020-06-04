var express = require("express");
var bodyparser = require("body-parser");
//var pug = require("pug");
var ejs = require("ejs");

var path = require("path");

var app = express();

app.use(function(req, res, next){
	console.log("time", Date.now());
	next();
});

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/')));

app.get("/", function(req, res){
	res.render('index',{
		title: "hey guys. hows you ?",
		showtitle:false
	});
});

app.listen(3000);
console.log("server started on 3000");

module.exports = app;