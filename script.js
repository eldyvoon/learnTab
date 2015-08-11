$(document).ready(function(){

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.getAllInWindow(null, function(tabs) {
	    for(var i = 0; i < tabs.length; i++) {
	        chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
	    }
	}); 
    }
});

	

	function saveItem(content,ref){
		chrome.storage.sync.get("LearnTab", function (obj) {
			    
			    if(obj.LearnTab == undefined){
			    	//first time
			    	var startingObj = {};
			    	startingObj.LearnTab = [];

			    	var buildObj = {"id":1,"content":content,"ref":ref};
			    	startingObj.LearnTab.push(buildObj);
			    	chrome.storage.sync.set(startingObj);
			    }else{

			    	var getMaxId = (Math.max.apply(Math, obj.LearnTab.map(function(o){ return o.id }))) + 1;
			    	if(getMaxId == NaN){getMaxId = 1};

			    	var buildObj = {"id":getMaxId,"content":content,"ref":ref};
			    	obj.LearnTab.push(buildObj);
			    	chrome.storage.sync.set(obj);
			    }
			   
			});

		
	}

	function clickHandler(data){
		
		saveItem(data.selectionText, data.pageUrl);

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {action: "open_modal"}, function(response) {}); //show successful saved msg
		});


	}


chrome.contextMenus.create({
  "title" : "Add to LearnTab",
  "type" : "normal",
  "contexts" : ["selection"],
  "onclick" : clickHandler
});


});
