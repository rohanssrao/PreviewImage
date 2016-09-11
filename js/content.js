if (window.location.href === 'http://example.com/') {
    $('body').text('');
    $('body').append(`
        <a style="position: fixed; top: 10px; left: 50vw; transform: translateX(-50%); font-size: 50px" href="https://rohanssrao.github.io/MaterializeCSS/parallaxsbackground.jpg">image broken</a>
        <a style="position: fixed; top: 235px; left: 50vw; transform: translateX(-50%); font-size: 50px" href="https://rohanssrao.github.io/MaterializeCSS/parallaxbackground.jpg?q=1&s=3">normal image</a>
        <input style="position: fixed; top: 335px; left: 50vw; transform: translateX(-50%); font-size: 20px;">
    `);
}

function copy(text) {
    var lastFocused = $(":focus");
    var temp = $('<input>').val(text).css({
        "opacity": "0",
        "z-index": "-99"
    }).appendTo('body').select();
    document.execCommand('copy');
    temp.remove();
    lastFocused.focus();
}

var enabled = true;
var maxWidth = 400;
var bgColor = '#34454E';
var imgId = 0;
var txtColor = 'white';

chrome.storage.sync.get({
    maxWidth: 400,
    bgColor: '#34454E'
}, function(settings) {
    maxWidth = settings.maxWidth;
    bgColor = settings.bgColor;
    var res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgColor);
    var rgb = [parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16)];
    var br = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
    if (br > 125) {
        txtColor = 'black';
    } else {
        txtColor = 'white';
    }
});

chrome.runtime.onMessage.addListener(function(req, sender, res) {
    if (req.enabled !== undefined) {
        enabled = req.enabled;
    }
    if (req.insert) {
        insert(req.insert);
    }
});

if (window.location !== window.parent.location) {
    setInterval(function() {
        $('a:not(:has(img))').each(addImg);
    }, 500)
}

$('head').append(`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <style>
        .previewImageImg {
            width: auto !important;
            height: auto !important;
            max-width: ${maxWidth}px !important;
            max-height: ${maxWidth}px !important;
            border-radius: 3px !important;
            object-fit: contain !important;
        }

        .previewImageDiv {
            text-align: center !important;
            margin: 0px !important;
            z-index: 99 !important;
            position: fixed !important;
            padding: 5px !important;
            max-width: ${maxWidth}px !important;
            width: auto !important;
            border-radius: 5px !important;
            background-color: ${bgColor} !important;
            box-shadow: 0px 7px 26px -1px rgba(0,0,0,0.75) !important;
        }

        @media screen and ( max-width: ${maxWidth + 50}px ){
            .previewImageImg, .previewImageDiv {
                max-width: 80vw !important;
            }
            .previewImageImg {
                max-height: 80vw !important;
            }
        }
    </style>`);

if(!jQuery) { $('body').append(`<script async src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"><\/script>`); }

$('a:not(:has(img))').each(addImg);

$('body').on('DOMNodeInserted', 'a:not(:has(img))', addImg);

function lesserOf(a, b) {
    if (a < b) {
        return a;
    } else if (b < a) {
        return b;
    } else {
        return false;
    }
}

function insert(type) {
    switch(type) {
        case 'lenny':
            copy('( ͡° ͜ʖ ͡°)');
            break;
        case 'infinity':
            copy('∞');
            break;
    }
}

function addImg() {
    let that = $(this);
    let hrefOrig = that.attr('href');
    let href = hrefOrig;
    let match = /((?:\?|\&)[^=]+\=[^&])+$/.exec(href);
    if (match) { href = href.replace(match[0], ''); }
    let match2 = /imgur\.com\/(\w{7})$/g.exec(href);
    if (match2) { href = 'https://i.imgur.com/' + match2[1] + '.png'; }

    if (href.match(/\.(jpe?g|png|gif|tiff)$/i)) {
        if (that.data('preview-added')) { return; }
        that.data('preview-added', true);
        var imgElem = $(`<img class="previewImageImg" src="${href}" id="imgId${imgId}">`);
        imgElem.on('load', function() {
            var imgElemCont = $(`<div class="previewImageDiv"><input style="
                    border-radius: 3px;
                    width: 99% !important;
                    font-family: Roboto, Arial !important;
                " value="${hrefOrig}" readonly></div>`);
            imgElemCont.prepend(imgElem).appendTo('body').hide();
            that.mousemove(function(e) {
                if (enabled) {
                    var x = e.clientX - (imgElemCont.width() / 2);
                    if (e.clientY < imgElemCont.height() + 25) {
                        var y = e.clientY + 25;
                        if (e.clientY + imgElemCont.height() + 25 > $(window).height()) {
                            imgElem[0].style.setProperty('max-height', $(window).height() - e.clientY - 75 + 'px', 'important');
                        } else {
                            // imgElem[0].style.setProperty('max-height');                                
                        }
                    } else {
                        var y = e.clientY - imgElemCont.height() - 25;
                    }
                    imgElemCont.css('top', y + 'px');
                    imgElemCont.css('left', x + 'px');
                }
            });
            that.mouseenter(function() {
                if (enabled) {
                    imgElemCont.stop().fadeIn({
                        duration: 300
                    });
                    imgElemCont.children().last().select();
                }
            });
            that.mouseleave(function() {
                if (enabled) {
                    imgElemCont.stop().fadeOut({
                        duration: 300
                    });
                }
            });
        });
        imgElem.on('error', function() {
            $('#' + imgId).remove();
            imgElem = $(`<div style="
                width: auto !important;
                margin: 0 !important;
                text-align: center !important;
                z-index: 99 !important;
                position: fixed !important;
                border-radius: 5px !important;
                background-color: ${bgColor} !important;
                box-shadow: 0px 7px 26px -1px rgba(0,0,0,0.75) !important;
                color: ${txtColor} !important;
                font-family: Roboto, Arial !important;
                padding: 5px 5px !important;
                ">Image link broken</div>`);
            that.mousemove(function(e) {
                if (enabled) {
                    var x = e.clientX - (imgElem.width() / 2);
                    if (e.clientY < imgElem.height() + 25) {
                        var y = e.clientY + 20;
                    } else {
                        var y = e.clientY - imgElem.height() - 30;
                    }
                    imgElem.css('top', y + 'px');
                    imgElem.css('left', x + 'px');
                }
            });
            that.mouseenter(function() {
                if (enabled) {
                    imgElem.appendTo('body').hide().stop().fadeIn({
                        duration: 300
                    });
                }
            });
            that.mouseleave(function() {
                if (enabled) {
                    imgElem.stop().fadeOut({
                        duration: 300
                    });
                }
            });
            if (enabled) {
                that.css('cursor', 'not-allowed');
            }
        });
    }
}
