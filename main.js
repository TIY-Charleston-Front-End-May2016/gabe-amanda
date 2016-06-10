$(document).ready(function() {
  chatApp.init();
})

/////this prompts the user to enter their name on page load. it store the data and uses it below on "form submit under events"
// var username = prompt("Please enter your username:");///////////NEW CODE//////
// if (username === null) {
//   prompt("Sorry you must enter a username. Please enter your username")
// }
// var time = new Date();

////////CODING JS HERE/////////////

var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/betweenmeandyou',
  chats: [],
  init: function() {
    chatApp.styling();
    chatApp.events();
  },
  styling: function () {

    chatApp.getChat();
    setInterval(function(){
      chatApp.getChat();
    },2000)
  },
events: function () {
//////THIS WORKS DON'T TOUCH IT/////////
    $('form').submit(function () {
      event.preventDefault();
      if ($('input').val() !== '') {
        var input_value = $(this).find('.messageval').val();
        var user_value = $(this).find('.usernameval').val();
        var thingChatted = {
          chat: input_value,
          username: user_value
          // username: username///// NEW CODE
        }
        chatApp.createChat(thingChatted)
        $('.chatbox').append(`<li>${user_value}   ${input_value}<a href="#"> x</a></li>`);
        $('.welcome').append(`Welcome, ${user_value}!`);


        $('#usermsg').val('');
  /////might be where set interval happens of 2 seconds
      };
    })
///////Click event for delete/////
    $('.chatbox').on('click', 'a', function (element) {
      console.log("WHAT THE HECK")
      event.preventDefault();
      var chatId = $(this).parent().data('id');/////showing as undefined in console. reason why deleteChat is not working
      console.log(chatId)
      console.log('this is the chatID',chatId)
      window.glob = $(this);
      $(this).parent().remove();
      chatApp.deleteChat(chatId);
    });





    $('#exit').on('click', function(element){
      console.log("WHAT THE HECK")
      event.preventDefault();
      var chatId = $(this).find('.chatbox').data('id');/////showing as undefined in console. reason why deleteChat is not working
      console.log(chatId)
      console.log('this is the chatID',chatId)
      window.glob = $(this);
      chatApp.deleteChat(chatId);
    })
},




  //////CODING AJAX HERE///////////////////
  //////Step 1: Getting chats to post in the chat window///////
  createChat: function(chatMessage) {
    $.ajax({
      url: chatApp.url,
      method: "POST",
      data: chatMessage,
      success: function(data) {
        console.log("works", data);
        $('.chatbox').html("");

          chatApp.chats.push(data);

          chatApp.chats.forEach(function(element,idx) {
            var chatStr = `<li data-id="${element._id}">${element.chat}<a href="#"> X</a></li>`
            $('.chatbox').append(chatStr)
          })
          // chatApp.getChat()
      },
      error: function(err) {
        console.error("not working", err);
      }
    })
  },
  getChat: function() {/////NEW CODE
    $.ajax({
      url: chatApp.url,
      method: "GET",
      success: function(data) {
        console.log("worked", data);
        $('li').html("");
        data.forEach(function(element,idx) {
          var chatStr = `<li data-id="${element._id}">${element.username}:  ${element.chat}<a href="#"> X</a></li>`
          $('.chatbox').append(chatStr)
          chatApp.chats.push(element);
        });
      },
      error: function(err) {
        console.error("ugh", err);
      }
    })
  },
  deleteChat: function(chatId) {
    var deleteChat = chatApp.url + "/" + chatId;
      $.ajax({
        url: deleteChat,
        method: "DELETE",
        success: function(data) {
        console.log("DELETED", data);


      },
      error: function(err) {
        console.error("ugh", err);
      }
    })
  },
};
