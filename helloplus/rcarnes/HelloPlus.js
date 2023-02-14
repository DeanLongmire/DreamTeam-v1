var http = require("http");
var url = require("url");
var fs = require("fs");
var prompt = require("prompt-sync")();

var port = prompt("What port would you like to host on? ");
var server = http.createServer(function(request, response){
    fs.readFile('index.html', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        return response.end();
    });
}).listen(port);
console.log("page running\nin your browser go to localhost:"+port);