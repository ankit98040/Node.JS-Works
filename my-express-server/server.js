const express = require("express");
const app = express();

app.get("/", function(request, response){
	response.send("<h1>hello guys</h1>");
});

app.get("/home/", function(req, res){
	res .send("<h1>hello guys welcome to home</h1>");
});

app.get("/contact/", function(req, res){
	res.send("Contact me at: 9804019155")

})

app.listen(3800, function(){
	console.log("server started on 3800");
});