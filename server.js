var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

Array.prototype.remove = function(element){
  var index = this.indexOf(element);
  if(index > -1){
    this.splice(index,1);
  }
};



function broadcastUsers(){
  io.emit('users', users);
}

app.use(express.static('static'));

// No anonim chat
app.get('/nick/:nickname', function(req, res){
  // validate nickname
  if (!req.params.nickname){
    return 'Error: nickname missing';
  } else if(users.indexOf(req.params.nickname) > -1){
    res.send('Sorry, required user name: ' +req.params.nickname+ ' is already taken.' );
  } else {
    res.sendFile(__dirname + '/index.html');
  }
});


io.on('connection', function(socket){

  socket.on('connectionWithNick', function(nick){
	   socket.broadcast.emit('connectionWithNick', nick);
     users.push(nick);
     broadcastUsers();
  });

  socket.on('disconnectionWithNick', function(nick){
    if(users.indexOf(nick) > -1){
      users.remove(nick);
      socket.broadcast.emit('disconnectionWithNick', nick);
    }
  });

  socket.on('userTyping', function(nick){
	   socket.broadcast.emit('show.userTyping', nick);
  });

  socket.on('chat message', function(nick, msg){
    socket.broadcast.emit('chat message', nick, msg);
  });

  socket.on('removeUsers', function(){
    users = [];
    broadcastUsers();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
