function OnlineUsers(socket){
  'use strict';
  var $users = $('<ul></ul>');
  var $disconnectBtn = $('#disconnect');
  $('#whoIsOnline').append($users);
  var $user = $('<li class="user"></li>');

  socket.on('users', function(users){
    addUsers(users);
  });

  socket.on('disconnectionWithNick', function(user){
    console.log('remove user:', user);
    removeUser(user);
  });

  $disconnectBtn.on('click',function clickHandler(){
    $('#whoIsOnline').hide();
  });

  function addUser(user){
    $user.clone().addClass(user).html(user).appendTo($users);
  }

  function addUsers(users){
    if(!users){ return; }
    $users.empty();
    console.log(users);
    users.forEach(addUser);
  }

  function removeUser(user){
    $users.find('li.'+user).remove();
  }


 // return {
 //   addUser : addUser,
 //   addUsers : addUsers,
 //   removeUser: removeUser
 // };

}
