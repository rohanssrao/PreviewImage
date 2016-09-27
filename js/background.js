var extEnabled = true;

function sendMsg(enabled) {
  	chrome.tabs.getAllInWindow(null, function(tabs) {
    	for (var i = tabs.length - 1; i >= 0; i--) {
      		chrome.tabs.sendMessage(tabs[i].id, {enabled: enabled});
    	}
  	});
}

chrome.browserAction.onClicked.addListener(function() {
	extEnabled = !extEnabled;
	sendMsg(extEnabled);
	if (extEnabled) {
		chrome.browserAction.setIcon({
		    path: '../img/favicon-128.png'
		});
	} else {
		chrome.browserAction.setIcon({
		    path: '../img/favicon-128-bw.png'
		});
	}
});

chrome.contextMenus.create({
	title: 'Copy ( ͡° ͜ʖ ͡°)',
	contexts: ['editable'],
	onclick: function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {insert: '( ͡° ͜ʖ ͡°)'});
		});
	}
});

chrome.contextMenus.create({
	title: 'Copy ∞',
	contexts: ['editable'],
	onclick: function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {insert: '∞'});
		});
	}
});

chrome.contextMenus.create({
	title: 'Copy ♩ _ ♩',
	contexts: ['editable'],
	onclick: function() {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendMessage(tab.id, {insert: '♩ _ ♩'});
		});
	}
});