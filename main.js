$(document).ready(function() {
  chatApp.init();
})

////////CODING JS HERE/////////////

var chatApp = {
  url: 'http://tiny-tiny.herokuapp.com/collections/betweenmeandyou',
  chats: [],
  init: function() {
    chatApp.styling();
    chatApp.events();
  },
  styling: function () {
    // chatApp.getChats
  },
events: function () {
//////THIS WORKS DON'T TOUCH IT/////////
    $('form').submit(function () {
    event.preventDefault();
    if ($('input').val() !== '') {
      var input_value = $(this).find('input').val();
      var thingChatted = {
        chat: input_value,
      }
      chatApp.createChat(thingChatted)
      $('.chatbox').append(`<li>${input_value}</li>`);
    };
    $('#usermsg').val('');
    return false;
    })
    $('#exit').on('click', function(){
    $('li').hide();
    })
},







  //////CODING AJAX HERE///////////////////
  //////Step 1: Getting chats to post in the chat window///////
  //////THIS WORKS DON'T TOUCH IT///////////
  createChat: function(chatMessage) {
    $.ajax({
      url: chatApp.url,
      method: "POST",
      data: chatMessage,
      success: function(data) {
        console.log("works", data);
          chatApp.chats.push(data);
          // chatApp.createChat(); ////.createChat needs to be replaced with whatever we name the "get"chat function i.e. chatApp.getChat()
      },
      error: function(err) {
        console.error("not working", err);
      }
    })
  },
//   getChat: function() {
//   $.ajax({
//     url: chatApp.url,
//     method: "GET",
//     success: function(data) {
//       console.log("worked", data);
//       $('ul').html("");
//       data.forEach(function(element,idx) {
//         var toDoStr = `<li data-id="${element._id}">${element.todo}<a href=""> ✓</a></li>`
//         $('ul').append(toDoStr)
//         chatApp.chats.push(element);
//       });
//     },
//     error: function(err) {
//       console.error("ugh", err);
//     }
//   })
// },
};
