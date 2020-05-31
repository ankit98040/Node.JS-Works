var http = require('http');
var fs = require("fs");

var host = '127.0.0.1';
var port = '3000';

fs.readFile('./lifeofwild.html', function(err, html){
	if(err){
		console.log("error");
		return;
	}
	var server = http.createServer(function(req, res){
	res.startusCode = 200;
	// for html file
	res.setHeader('Content-type', 'text/html');
	
	
	//for text (wont display html file)
	//res.setHeader('Content-type', 'text/plain');
	//res.end('Hello');
});

server.listen(port, host, function(){
	console.log("server running on port " +port);
});

});



