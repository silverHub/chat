function MessageBoard(socket, nick){
  'use strict';

  var $form = $('form');
  var $typeIn = $('#typeIn');
  var $disconnectBtn = $('#disconnect');
  var $messages = $('#messages').empty();
  var $msg = $('<li class="msg"></li>');
  var $systemMsg = $('<li class="systemMsg"></li>');
  var systemMsgMap = {
    'ENTERED' : ' just now connected...',
    'LEFT' : ' has left the chat...',
  };
  addSystemMsg('You entered in the chat...');

  socket.on('connectionWithNick', function(nick){
    addSystemMsgWithNick(nick, 'ENTERED');
  });

  socket.on('disconnectionWithNick', function(nick){
    addSystemMsgWithNick(nick, 'LEFT');
  });

  $disconnectBtn.on('click',function clickHandler(){
    addSystemMsg('You left the chat...');
  });

  socket.on('chat message', function(nick, msg){
    addUserMsg(nick,msg);
  });

  $form.submit(function(e){
    var msg = $typeIn.val().trim();
    if(msg){
      addUserMsg(nick,msg);
    }
  });

  function addUserMsg(nick, msg){
     var text = nick ? nick + ':' + msg : msg;
     $messages.append($msg.clone().html(text));
  }

  function addSystemMsgWithNick(nick, msgId){
      var msg = nick ? nick + ':' + systemMsgMap[msgId] : systemMsgMap[msgId];
      $messages.append($systemMsg.clone().html(msg));
  }

  function addSystemMsg(msg){
      $messages.append($systemMsg.clone().html(msg));
  }

 // return {
 //   addUserMsg : addUserMsg,
 //   addSystemMsg: addSystemMsg,
 //   addSystemMsgWithNick: addSystemMsgWithNick
 // }

}
