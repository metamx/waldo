
var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');

var config = require('../config');
var Services = require('./services');

var app = express();
var env = app.get('env');

app.set('port', config.server.port);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../client')));

if (env === 'development') {
  app.use(express.errorHandler());
}

app.post('/search', function(req, res) {
  var searchQuery = url.parse(req.url).query;
  var druidQuery = Services.Search.searchQueryToDruidQuery(searchQuery);

  Services.Search.queryDruid(druidQuery, function(err, result) {
    if (err) return res.json(500, err);

    var events = Services.Search.druidResultToEvents(result);
    res.json(200, { events: events });
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
