
$(function(){
  'use strict';

  var socket = io();  // connection to the server
  var nick = getNick();
  OnlineUsers(socket);
  MessageBoard(socket, nick);
  TypingSignal(socket, nick);

  var $form = $('form');
  var $typeIn = $('#typeIn');
  var $removeAll = $('#removeAll');
  var $disconnectBtn = $('#disconnect');


  (function start(){
    $typeIn.focus();
    socket.emit('connectionWithNick', nick);
  })();

  // helper
  function getNick(){
    var array = location.pathname.split('/').reverse();
    return array[0];
  }

  // event handlers
  $form.submit(function(e){
    e.preventDefault();
    var msg = $typeIn.val().trim();
    if(msg){
      socket.emit('chat message', nick, msg);
      $typeIn.val('');
    }
  });

  $(window).unload(function(){
      socket.emit('disconnectionWithNick', nick);
  });

  $removeAll.on('click',function clickHandler(){
    socket.emit('removeUsers');
  });

  $disconnectBtn.on('click',function clickHandler(){
    socket.emit('disconnectionWithNick', nick);
    $typeIn.prop('disabled', true);
    socket.close();
  });

  //socket.on('test',function(p){console.log('test msg:',p);});

});
