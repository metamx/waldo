
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
