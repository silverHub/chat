function MessageBoard(){
  'use strict';
  var $messages = $('#messages').empty();
  var $msg = $('<li class="msg"></li>');
  var $systemMsg = $('<li class="systemMsg"></li>');
  var systemMsgMap = {
    'ENTER' : ' just now connected...',
    'LEAVE' : ' has left the chat...'
  };



  function addUserMsg(nick, msg){
     var text = nick ? nick + ':' + msg : msg;
     $messages.append($msg.clone().html(text));
  }

  function addSystemMsg(nick, msgId){
    var msg = nick ? nick + ':' + systemMsgMap[msgId] : systemMsgMap[msgId];
    $messages.append($systemMsg.clone().html(msg));
  }





 return {
   addUserMsg : addUserMsg,
   addSystemMsg: addSystemMsg
 }

}
