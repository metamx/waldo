
var async = require('async')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , request = require('request');

var app = express();
var env = app.get('env');

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/client'));

if (env === 'development') {
  app.use(express.errorHandler());
}

app.post('/search', function(req, res) {
  var druidQuery = searchQueryToDruidQuery(req.query);
  queryDruid(druidQuery, function(err, result) {
    var events = druidResultToEvents(result);
    res.send(200, {
      events: events
    })
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var queryDruid = function(query, callback) {
  request.post({
    url: 'http://10.70.151.88:8080/druid/v2/',
    body: JSON.stringify(query),
    headers: {
      "Content-Type": "application/json"
    }
  }, function(err, res, body) {
    callback(null, JSON.parse(body));
  });
};

var searchQueryToDruidQuery = function(searchQuery) {
  var filters = searchQueryToFilters(searchQuery);
  var druidQuery = {
    "queryType": "select",
    "dataSource": "dash_logs",
    "dimensions": [],
    "metrics": [],
    "granularity": "all",
    "intervals": [
      "2013-12-01/2013-12-20"
    ],
    "filter": {
      "type":"and",
      "fields": filters
    },
    "pagingSpec": { "pagingIdentifiers": {}, "threshold": 50 }
  };
  return druidQuery;
};

var searchQueryToFilters = function(searchQuery) {
  var filters = [];
  for (var key in searchQuery) {
    var val = searchQuery[key];
    filters.push({
      type: 'selector',
      dimension: key,
      value: val
    });
  }
  return filters;
};

var druidResultToEvents = function(druidResult) {
  console.log('type is: ' + typeof druidResult);
  flattenedEvents = [];
  druidResult.forEach(function(bucket) {
    bucketEvents = bucket.result.events;
    bucketEvents.forEach(function(event) {
      flattenedEvents.push(event.event);
    });
  });
  return flattenedEvents;
};
