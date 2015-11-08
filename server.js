var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('player connected', '');
  console.log('a user connected');

  socket.on('disconnect', function(){
	io.emit('player disconnected', '');
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
	console.log('message: ' + msg);
  });
  socket.broadcast.emit('hi');
});

io.emit('some event', { for: 'everyone' });

http.listen(3000, function(){
  console.log('listening on *:3000');
});