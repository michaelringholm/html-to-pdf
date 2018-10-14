var express = require('express');
var app = express();
var fs = require("fs");

var _logger = console;
var _pdfCallbackCalled = false;
var base64PDF = {};

app.get('/listUsers', function (req, res) {
  var users = new Array();
	var user = {name:"Michael"};
	users.push(user);
  _logger.log( users );
  res.end(JSON.stringify(users));
});

app.get('/about', function (req, res) {	
    res.end(JSON.stringify({message:"HTML to PDF service v1.0.0.001"}));
});

app.get('/', function (req, res) {	
  res.end(JSON.stringify({message:"Welcome to the HTML to PDF service v1.0.0.001"}));
});

function pdfBufferCreatedCallback(err, buffer) {
  try {
    //_logger.log('This is a buffer:', Buffer.isBuffer(buffer));
    _base64PDF = Buffer.from(buffer).toString('base64');
    //_logger.log('Base64PDF=' + base64PDF);
    _pdfCallbackCalled = true;
    //res.end(JSON.stringify({base64PDF:base64PDF}));
  }
  catch(ex) {
    //res.end(JSON.stringify({error:ex}));
  }
};

function syncResponse(res) {
  if(!_pdfCallbackCalled) {
    _logger.log("Waiting for 200 ms...");
    setTimeout(syncResponse, 200, res);
  }
  else {
    _pdfCallbackCalled = false;
    res.end(JSON.stringify({base64PDF:_base64PDF}));
  }
};

app.get('/createPDF', function (req, res) {	  
  var fs = require('fs');
  var pdfFactorty = require('html-pdf');
  var html = fs.readFileSync('./daily-report.html', 'utf8');
  var options = { format: 'A4' };
  
  var pdf = pdfFactorty.create(html, options);
  _logger.log('pdf object created.');
  //pdf.toFile('./daily-report.pdf', createFile);
  pdf.toBuffer(pdfBufferCreatedCallback);
  syncResponse(res);
});

var server = app.listen(8081, function () {
  var host = "10.0.0.5"; //server.address().address;
  var port = server.address().port;
  _logger.log("HTML to PDF service listening at http://%s:%s", host, port);
});

