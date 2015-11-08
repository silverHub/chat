function OnlineUsers(){
  'use strict';
  var $users = $('<ul></ul>');
  $('#whoIsOnline').append($users);
  var $user = $('<li class="user"></li>');



  function addUser(user){
    $user.clone().addClass(user).html(user).appendTo($users);
  }
  function addUsers(users){
    if(!users){ return; }
    users.forEach(addUser);
  }

  function removeUser(user){
    $users.find('li.'+user).remove();
  }


 return {
   addUser : addUser,
   addUsers : addUsers,
   removeUser: removeUser
 };

}
