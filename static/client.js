
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
    socket.emit('chat message', nick, $typeIn.val());
    $typeIn.val('');
  });

  $(window).unload(function(){
      console.log('window unload: disconnection');
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
