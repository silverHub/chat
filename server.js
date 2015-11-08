var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/main.css', function(req, res){
  res.sendFile(__dirname + '/main.css');
});


app.get('/nick/:nickname', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

  socket.on('connectionWithNick', function(nick){
	   io.emit('chat message', nick+ ' just now connected...');
     users.push(nick);
  });

  socket.on('disconnectionWithNick', function(nick){
	   io.emit('chat message', nick+ ' has left the chat...');
     delete users[nick];
  });

  socket.on('userTyping', function(nick){
	   io.emit('show.userTyping', nick);
  });


  socket.on('disconnect', function(){
	   io.emit('player disconnected', '');

  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
