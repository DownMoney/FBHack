var Rdio = require("node-rdio");
var rdio = new Rdio(["n2fymp33mct8fjzru9w3mudp", "Zp36XSeFnE"]);



var express = require('express');
var app = express();

app.get('/search/:q', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  rdio.call('search', {'types': 'Track', 'query': req.params.q}, function(err, data){
  	if (err)
  	console.log(err);
  	res.json(data);
  });
});

app.listen(3000);
