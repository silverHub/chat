var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

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
app.get('/', function(req, res){
  // validate nickname
  res.sendFile(__dirname + '/splash.html');
});

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

server.listen(port, function(){
  console.log('listening on *:', port);
});
