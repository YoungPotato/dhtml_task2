const http = require('http');
const fs = require('fs');
const url = require('url');
const server = new http.Server();
server.listen(4200, '127.0.0.1');
server.on('request', function(req, res) {
    const urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    console.log(req.headers);
    if (urlParsed.pathname === '/img') {
        fs.readFile("img.jpg", function(err, data) {
            if (err) {
                console.error(err.message);
            } else {
                res.end(data);
            }
        });
    }
    if (urlParsed.pathname === '/otherimg') {
        fs.readFile("otherimg.jpg", function (err, data) {
            if(err) {
                console.error(err.message);
            } else {
                res.end(data);
            }
        });
    }
    if (urlParsed.pathname === '/content') {
        fs.readFile("content.txt", {encoding: 'utf-8'}, function(err, data) {
            if(err) {
                console.error(err.message);
            } else {
                const origins = ["http://localhost:3000", "http://127.0.0.1:3000"];
                for (let i = 0; i< origins.length; i++) {
                    if(req.headers.origin === origins[i]){
                        res.setHeader('Access-Control-Allow-Origin', origins[i]);
                    }
                }
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Allow-Headers",
                    "Origin,Content-Type, X-Auth-Token, Authorization");
                res.end(data);
            }
        });
    }
});