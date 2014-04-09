
var request = require('request');

var config = require('../../config');
var Adapters = require('../adapters');

function searchQueryToDruidQuery(searchQuery) {
  searchQuery = searchQuery.replace(/&/g,'');

  var filter = searchQueryToFilter(searchQuery);
  var druidQuery = {
    "queryType": "select",
    "dataSource": config.Druid.data_source,
    "dimensions": [],
    "metrics": [],
    "granularity": "all",
    "intervals": [
      "2013-12-01/2013-12-20"
    ],
    "filter": filter,
    "pagingSpec": { "pagingIdentifiers": {}, "threshold": 50 }
  };
  return druidQuery;
}

function searchQueryToFilter(searchQuery) {
  var andParts = searchQuery.split('$$');
  if (andParts.length > 1) {
    return {
      type: 'and',
      fields: iterParts(andParts)
    };
  }

  var orParts = searchQuery.split('||');
  if (orParts.length > 1) {
    return {
      type: 'or',
      fields: iterParts(orParts)
    };
  }

  return makeSelectorFilter(searchQuery);
};

function makeSelectorFilter(searchQuery) {
  var selectorParts = searchQuery.split('=');

  return {
    type: 'selector',
    dimension: selectorParts[0],
    value: selectorParts[1]
  };
}

function iterParts(searchQueries) {
  var filters = [];

  searchQueries.forEach(function(searchQuery) {
    filters.push(searchQueryToFilter(searchQuery));
  });
  return filters;
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
