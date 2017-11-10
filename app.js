// Required node packages for our application
var http = require("http");
var express = require('express');
var request = require('request');

var app = express();
var sessionMap = {};
app.use(express.static(__dirname));

// Main entry point of our app
app.get("/", function(req, res){
    res.redirect("/login.html");
});

app.get("/index", function(req, res){
    res.redirect("/index.html");
});

var httpServer = http.createServer(app);
httpServer.listen('3000');