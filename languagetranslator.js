// Required node packages for our application
var http = require("http");
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var translationtext;
var app = express();
var sessionMap = {};
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded ({ extended: true}));
app.use(express.static(__dirname));

var language_translator = new LanguageTranslatorV2({
  username: '55964c59-cd74-4963-abdd-4b36a9eca912',
  password: 'cGBxOrDKleGg',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

function testFunction(input) {
  var translation;
  return new Promise(function (resolve, reject) {
    language_translator.translate({
    text: input, source : 'en', target: 'fr' },
    function (err, result) {
      if (err) {
        reject(err);
        console.log('error:', err);
      } else {
        translation = result.translations[0].translation;
        console.log(translation);
          // Scope issue
        resolve(translation);
      }
    });
  })
  
}

//var prompt = require('prompt-sync')();

app.post("/readMsg", function(req, res) {
  testFunction(req.body.message)
    .then(function (result) {
      console.log('sending result', result)
      translationtext = result;
      res.json(result);
    })
    .catch(function (err) {
      console.log("Error occured in /readMsg:" + err);
    })
});

app.get("/readMsg", function(req,res) {
  res.json(translationtext);
});
var httpServer = http.createServer(app);
httpServer.listen('3000');
