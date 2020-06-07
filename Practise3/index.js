var http = require('http');
var host  = '127.0.0.1';
var port = '3000';

var fs = require('fs');

fs.readFile('./index.html', function(err, html){
	if (err){
		console.log(err);
		return;
	}

		var server = http.createServer(function(req,res){
		res.write(html);
		res.end('hey');
	});

	server.listen(port, host, function(){
		console.log("server running on port "+port);
	});
})

