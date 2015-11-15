function TypingSignal(socket, nick){
  'use strict';

  var $userTypeingMsg = $('#userTypingMsg').hide();
  var $typeIn = $('#typeIn');
  var timeoutId;


  $typeIn.on('keydown',function keyDownHandler(){
    socket.emit('userTyping', nick);
  });

  socket.on('show.userTyping', function(nick){
    $userTypeingMsg.html(nick + ' is typing now...').show();

    if(timeoutId){  clearTimeout(timeoutId);  }
    timeoutId = setTimeout(function(){
      $userTypeingMsg.hide();
      clearTimeout(timeoutId);
    },400);

  });

}
