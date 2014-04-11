
var request = require('request');

var config = require('../../config');

function queryDruid(druidQuery, callback) {
  request.post({
    url: config.Druid.url,
    body: JSON.stringify(druidQuery),
    headers: {
      "Content-Type": "application/json"
    }
  }, function(err, res, body) {
    if (err) {
      callback(err);
    } else {
      callback(null, JSON.parse(body));
    }
  });
}

module.exports = {
  queryDruid: queryDruid
};
