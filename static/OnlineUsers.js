function OnlineUsers(){
  'use strict';
  var $users = $('<ul></ul>');
  $('#whoIsOnline').append($users);
  var $user = $('<li class="user"></li>');



  function addUser(user){
    console.log('addUser:', user);
    $user.clone().addClass(user).html(user).appendTo($users);
  }
  function addUsers(users){
    console.log('addUsers:', users);
    if(!users){ return; }
    $users.empty();
    users.forEach(addUser);
  }

  function removeUser(user){
    console.log('removeUser:', user);
    $users.find('li.'+user).remove();
  }


 return {
   addUser : addUser,
   addUsers : addUsers,
   removeUser: removeUser
 };

}
