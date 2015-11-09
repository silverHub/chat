var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};

app.use(express.static('static'));

// No anonim chat
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/nick/:nickname', function(req, res){
  // validate nickname
  if (!req.params.nickname){
    return 'Error: nickname missing';
  } else if(users.contains(req.params.nickname)){
    res.send('Sorry, required user name: ' +req.params.nickname+ ' is already taken.' );
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});


io.on('connection', function(socket){
  var emit = socket.broadcast.emit;
  io.on('connection', function(socket){
    socket.broadcast.emit('hi');
  });

  socket.on('connectionWithNick', function(nick){
	   io.emit('connectionWithNick', nick);
     users.push(nick);
  });

  socket.on('disconnectionWithNick', function(nick){
	   io.emit('disconnectionWithNick', nick);
     delete users[nick];
  });

  socket.on('userTyping', function(nick){
	   io.emit('show.userTyping', nick);
  });

  socket.on('chat message', function(nick, msg){
    io.emit('chat message', nick, msg);
  });

  socket.on('users', function(){
    io.emit('users', users);
  });

  socket.on('removeUsers', function(){
    users = [];
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
