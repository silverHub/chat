
$(function(){
  'use strict';

  var socket = io();  // connection to the server
  var messageBoard = MessageBoard();
  var onlineUsers = OnlineUsers();
  var $typeIn = $('#typeIn');
  var $removeAll = $('#removeAll');
  var $userTypeingMsg = $('#userTypingMsg');
  var $form = $('form');
  var nick = getNick();

  (function start(){
    $userTypeingMsg.hide();
    $typeIn.focus();
    if(nick){
      socket.emit('connectionWithNick', nick);
    }
    socket.emit('users');
  })();


  // helper
  function getNick(){
    var array = location.pathname.split('/').reverse();
    return array[0];
  }

  // event handlers

  socket.on('users', function(users){
    onlineUsers.addUsers(users);
  });
  socket.on('connectionWithNick', function(nick){
    messageBoard.addSystemMsg(nick, 'ENTER');
    //onlineUsers.addUser(nick);
  });
  socket.on('disconnectionWithNick', function(nick){
    messageBoard.addSystemMsg(nick, 'LEAVE');
    onlineUsers.removeUser(nick);
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
  $removeAll.on('click',function clickHandler(){
    socket.emit('removeUsers');
    socket.emit('users');
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
