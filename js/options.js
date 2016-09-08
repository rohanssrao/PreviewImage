chrome.storage.sync.get({
    maxWidth: 400,
    bgColor: '#34454E'
}, function(settings) {
    $('#maxWidth').val(settings.maxWidth);
    $('#bgColor').val(settings.bgColor);
});

$('#save').click(function() {
    var maxWidth = parseInt($('#maxWidth').val());
    var bgColor = $('#bgColor').val();
    chrome.storage.sync.set({
        maxWidth: maxWidth,
        bgColor: bgColor
    }, function() {
        $('#status').fadeIn(150).css('display', 'inline');
        setTimeout(function() {
            $('#status').fadeOut(150);
        }, 1250);
    });
});

$('#restore').click(function() {
    chrome.storage.sync.set({
        maxWidth: 400,
        bgColor: '#34454E'
    }, function() {
        $('#status').fadeIn(150).css('display', 'inline').text('Default options restored.');
        setTimeout(function() {
            $('#status').fadeOut(150);
        }, 1250);
    });
    $('#maxWidth').val(400);
    $('#bgColor').val('#34454E');
});