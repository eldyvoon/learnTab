$(document).ready(function(){

getItem();

function randomize (arr) {
	return arr[Math.floor(Math.random() * arr.length)];
};

function get_url_domain(data) {
  var  a = document.createElement('a');
         a.href = data;
  return a.hostname;
}

function getItem(){

			chrome.storage.sync.get("LearnTab", function (obj) {
			    if(obj.LearnTab != undefined && obj.LearnTab.length != 0){
			    	$('#dlt, #info').show();
			    	var arrayItem = obj.LearnTab;

			    	var randomedArry = randomize(arrayItem);

			    	$('#container').text(randomedArry.content).hide().fadeIn();
			    	$('#info a').html('<a target="_blank" href="'+randomedArry.ref+'">'+get_url_domain(randomedArry.ref)+'</a>');
			    	$('#dlt').attr('rel',randomedArry.id);

			    }else{
			    	/*chrome.storage.sync.set({"LearnTab":[]});*/
			    	$('#container').text("You don\'t have any content in learnTab.").hide().fadeIn();
			    	$('#dlt, #info').hide();
			    }
			});

		}



			$('body').on('click','#dlt',function(){
				var selectedId = $(this).attr('rel');

				chrome.storage.sync.get("LearnTab", function (obj) {

					var LearnTabArr = $.grep(obj.LearnTab, function(e){ 
				     return e.id != selectedId; 
				     
					});

					window.location.reload();
				});

			});

});