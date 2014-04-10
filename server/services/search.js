
var config = require('../../config');
var Adapters = require('../adapters');

function searchQueryToDruidQuery(searchQuery) {
  var intervalEnd = new Date();
  var intervalStart = new Date(intervalEnd - 300 * 60 * 1000);
  intervalEnd = intervalEnd.toISOString();
  intervalStart = intervalStart.toISOString();

  var filter = searchQueryToFilter(searchQuery);
  var druidQuery = {
    "queryType": "select",
    "dataSource": config.Druid.data_source,
    "dimensions": [],
    "metrics": [],
    "granularity": "all",
    "intervals": [
      intervalStart + '/' + intervalEnd
    ],
    "filter": filter,
    "pagingSpec": { "pagingIdentifiers": {}, "threshold": 50 }
  };
  return druidQuery;
}

function searchQueryToFilter(searchQuery) {
  var filter = {
    type: 'selector',
    dimension: 'service',
    value: 'druid/metrics/bard'
  };

  if (!searchQuery) return filter;

  var andParts = searchQuery.split(/\s*\$\s*/);
  return {
    type: 'and',
    fields: andParts.map(searchTermToDruidFilter)
  };
}

function searchTermToDruidFilter(searchTerm) {
  var selectorParts = searchTerm.split('=');

  return {
    type: 'selector',
    dimension: selectorParts[0],
    value: selectorParts[1]
  };
}

function queryDruid(druidQuery, callback) {
  Adapters.Druid.queryDruid(druidQuery, callback);
}

function druidResultToEvents(druidResult) {
  flattenedEvents = [];
  druidResult.forEach(function(bucket) {
    bucketEvents = bucket.result.events;
    bucketEvents.forEach(function(event) {
      flattenedEvents.push(event.event);
    });
  });
  return flattenedEvents;
};

module.exports = {
  searchQueryToDruidQuery: searchQueryToDruidQuery,
  queryDruid: queryDruid,
  druidResultToEvents: druidResultToEvents
};
