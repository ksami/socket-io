var express = require("express")
var app = require("express")()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("a user connection");
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat-message-send', function(msg) {
    io.emit('chat-message-receive', msg);
  })
})

http.listen(3000, function() {
  console.log("listening on *.3000");
});