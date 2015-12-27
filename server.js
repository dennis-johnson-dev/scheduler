var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  reload: true
}));

app.use(express.static('./'));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user has connected');
  socket.on('yo', function(msg) {
    console.log('received yo');
    io.emit('yo received');
  });
});

http.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
