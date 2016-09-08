var background = chrome.extension.getBackgroundPage();

if (background.extEnabled) {
	$('#enabled').text('Enabled');
	$('#extEnabled').prop('checked', true);
} else {
	$('#enabled').text('Disabled');
	$('#extEnabled').prop('checked', false);
}

$('#extEnabled').click(function() {
	if (this.checked) {
		$('#enabled').text('Enabled');
		background.sendMsg(true);
		background.extEnabled = true;
	} else {
		$('#enabled').text('Disabled');
		background.sendMsg(false);
		background.extEnabled = false;
	}
})