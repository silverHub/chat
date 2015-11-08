
$(function(){
  'use strict';

  var socket = io();  // connection to the server
  var messageBoard = MessageBoard();
  var $typeIn = $('#typeIn');
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
  socket.on('connectionWithNick', function(nick){
    messageBoard.addSystemMsg(nick, 'ENTER');
  });
  socket.on('disconnectionWithNick', function(nick){
    messageBoard.addSystemMsg(nick, 'LEAVE');
  });

  $(window).unload(function(){
    if(isNick()){
      socket.emit('disconnectionWithNick', getNick());
    }
  });

  socket.on('chat message', function(nick, msg){
    messageBoard.addUserMsg(nick,msg);
  });

  $typeIn.on('keydown',function keyDownHandler(){
    socket.emit('userTyping', nick);
  });

  $form.submit(function(e){
    e.preventDefault();
    socket.emit('chat message', nick, $typeIn.val());
    $typeIn.val('');
  });


  var timeoutId;
  socket.on('show.userTyping', function(nick){
    $userTypeingMsg.html(nick + ' is typing now...').show();

    if(timeoutId){  clearTimeout(timeoutId);  }
    timeoutId = setTimeout(function(){
      $userTypeingMsg.hide();
    },400);
  });

});
