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

  },
  events: function () {
    $('form').submit(function () {
    event.preventDefault();
    if ($('input').val() !== '') {
      var input_value = $(this).val();
      var thingChatted = {
        chat: input_value
      }
      chatApp.createChat(thingChatted)
      $('#usermsg').append(`'.chatbox'${input_value}`);
    };
    $('input').val('');
    return false;
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
          chatApp.chats.push(data);
          // chatApp.createChat(); ////.createChat needs to be replaced with whatever we name the "get"chat function i.e. chatApp.getChat()
      },
      error: function(err) {
        console.error("not working", err);
      }
    })
  },
};
