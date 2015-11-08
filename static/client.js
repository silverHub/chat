
var socket = io();  // connection to the server
var $messages = $('#messages');
var $typeIn =$('#typeIn');
var $userTypeingMsg = $('#userTypingMsg');
var $form = $('form');
var nick = getNick();

(function start(){
  $userTypeingMsg.hide();
  $typeIn.focus();
  if(isNick()){
    socket.emit('connectionWithNick', getNick());
  }
})();


// helper
function getNick(){
  var array = location.pathname.split('/').reverse();
  return array[0];
}
function isNick(){
  return !!getNick();
}


// event handlers
$(window).unload(function(){
  if(isNick()){
    socket.emit('disconnectionWithNick', getNick());
  }
});

$typeIn.on('keydown',function keyDownHandler(){
  socket.emit('userTyping', nick);
});

$form.submit(function(e){
  e.preventDefault();
  socket.emit('chat message', $typeIn.val());
  $typeIn.val('');
});

socket.on('chat message', function(msg){
  $messages.append($('<li>').text(msg));
});

var timeoutId;
socket.on('show.userTyping', function(nick){
  $userTypeingMsg.html(nick + ' is typing now...').show();

  if(timeoutId){
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function(){
    $userTypeingMsg.hide();
  },400);
});

socket.on('connectionWithNick', function(nick){
  $messages.append($('<li class="connection">').text( nick + ' just now connected...'));
});
