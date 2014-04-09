
function queryDruid(druidQuery, callback) {
  request.post({
    url: config.Druid.url,
    body: JSON.stringify(druidQuery),
    headers: {
      "Content-Type": "application/json"
    }
  }, function(err, res, body) {
    callback(null, JSON.parse(body));
  });
}

module.exports = {
  queryDruid: queryDruid
};