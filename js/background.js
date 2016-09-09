var extEnabled = true;

function sendMsg(enabled) {
	extEnabled = enabled;
  	chrome.tabs.getAllInWindow(null, function(tabs) {
    	for (var i = tabs.length - 1; i >= 0; i--) {
      		chrome.tabs.sendMessage(tabs[i].id, {enabled: enabled});
    	}
  	});
}

chrome.contextMenus.create({
	title: 'Copy ( ͡° ͜ʖ ͡°)',
	contexts: ['editable'],
	onclick: function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {insert: 'lenny'});
		});
	}
});

chrome.contextMenus.create({
	title: 'Copy ∞',
	contexts: ['editable'],
	onclick: function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {insert: 'infinity'});
		});
	}
});