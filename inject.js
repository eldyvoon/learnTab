$(function () {
   $.get(chrome.extension.getURL('modal.html'), function(data) {
             $(data).appendTo('body');
             $("#mark").attr('src', chrome.extension.getURL("mark.png"));
         }); 

   chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

      if (msg.action == 'open_modal') {
        $('#success_msg_learnTab .modal-open-learnTab').click();
        $('#success_msg_learnTab .modal-open-learnTab').prop('disabled', true);

        setTimeout(function(){
            $('#success_msg_learnTab .modal-open-learnTab').prop('disabled', false);
            $('#success_msg_learnTab .modal-open-learnTab').click();
        },1200);
       
      }
    });

})
