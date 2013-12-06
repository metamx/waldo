
var express = require('express')
  , http = require('http')
  , path = require('path');

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
  console.log('qs: ' + JSON.stringify(req.query, null, 2));
  var druidQuery = searchQueryToDruidQuery(req.query);
  console.log('druidQuery: ' + JSON.stringify(druidQuery, null, 2))
  var events = druidResultToEvents(mockDruidResult);
  res.send(200, {
    events: events
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var searchQueryToDruidQuery = function(searchQuery) {
  var filters = searchQueryToFilters(searchQuery);
  var druidQuery = {
    "queryType": "select",
    "dataSource": "dash_logs",
    "dimensions": [],
    "metrics": [],
    "granularity": "all",
    "intervals": [
      "2013-12-06T01/2013-12-06T23"
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
  flattenedEvents = [];
  druidResult.forEach(function(bucket) {
    bucketEvents = bucket.result.events;
    bucketEvents.forEach(function(event) {
      flattenedEvents.push(event.event);
    });
  });
  return flattenedEvents;
};

var mockDruidResult = [{
  "timestamp" : "2013-01-01T07:00:00.000Z",
  "result" : {
    "pagingIdentifiers" : {
      "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9" : 4
    },
    "events" : [ {
      "segmentId" : "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9",
      "offset" : 0,
      "event" : {
        "timestamp" : "2013-01-01T07:00:00.000Z",
        "namespace" : "article",
        "added" : 22.0
      }
    }, {
      "segmentId" : "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9",
      "offset" : 1,
      "event" : {
        "timestamp" : "2013-01-01T07:00:00.000Z",
        "namespace" : "article",
        "added" : 5.0
      }
    }, {
      "segmentId" : "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9",
      "offset" : 2,
      "event" : {
        "timestamp" : "2013-01-01T07:00:00.000Z",
        "namespace" : "article",
        "added" : 5.0
      }
    }, {
      "segmentId" : "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9",
      "offset" : 3,
      "event" : {
        "timestamp" : "2013-01-01T07:00:00.000Z",
        "namespace" : "article",
        "added" : 4.0
      }
    }, {
      "segmentId" : "wikipedia_editstream_2012-12-29T00:00:00.000Z_2013-01-10T08:00:00.000Z_2013-01-10T08:13:47.830Z_v9",
      "offset" : 4,
      "event" : {
        "timestamp" : "2013-01-01T07:00:00.000Z",
        "namespace" : "article",
        "added" : 4.0
      }
    } ]
  }
}];
