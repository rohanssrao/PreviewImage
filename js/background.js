var extEnabled = true;

function sendMsg(enabled) {
	extEnabled = enabled;
  	chrome.tabs.getAllInWindow(null, function(tabs) {
    	for (var i = tabs.length - 1; i >= 0; i--) {
      		chrome.tabs.sendMessage(tabs[i].id, {enabled: enabled});
    	}
  	});
}