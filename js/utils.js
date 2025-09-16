function is_weixin() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
function loadHtml() {
    var div = document.createElement('div');
    div.id = 'weixin-tip';
    div.innerHTML = '<p><img src="../img/live_weixin.png" alt="微信打开"/></p>';
    document.body.appendChild(div);
}
function initHtml() {
    var mobile = checkMobile()
    if (mobile == 'Android') {
        window.location.href = "Android.html"
    }
    else if (mobile == 'IOS') {
        window.location.href = "IOS.html"
    }
    else { window.location.href = "Android.html" }
}
function xuanfuclose() {
    $('.xuanfu').hide();
}
let browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1
        };
    }()
}
function clipboardSuccess(e) {
    alert('复制成功！');
}
function clipboardError(e) {
    console.log(e);
}
function reportClick(e) {
    $('#reportApp').modal('show');
}
function isSafari() {
    if (navigator.userAgent.indexOf("Safari") > -1) {
        return true;
    }
    return false;
}
function gridadCloseBtn() {
    $(".gridad").animate({ bottom: '9999px' })
}
function checkinfoClick() {
    $("#gridad").show()
}
function checkinfoClick() {
    $("#checkinfo").hide();
    $("#checkinfo1").show();
}

function FloatAd(selector) {
    var obj = $(selector);
    if (obj.find(".item").length == 0) return;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var dirX = -1.5;
    var dirY = -1;
    var delay = 30;
    obj.css({ left: windowWidth / 2 - obj.width() / 2 + "px", top: windowHeight / 2 - obj.height() / 2 + "px" });
    obj.show();
    var handler = setInterval(move, delay);
    obj.hover(function () {
        clearInterval(handler);
    }, function () {
        handler = setInterval(move, delay);
    });
    obj.find(".close").click(function () {
        close();
    });
    $(window).resize(function () {
        windowHeight = $(window).height();
        windowWidth = $(window).width();
    });
    function move() {
        var currentPos = obj.position();
        var nextPosX = currentPos.left + dirX;
        var nextPosY = currentPos.top + dirY;
        if (nextPosX >= windowWidth - obj.width()) {
            //close();
        }
        if (nextPosX <= 0 || nextPosX >= windowWidth - obj.width()) {
            dirX = dirX * -1;//改变方向
            nextPosX = currentPos.left + dirX;//为了不过界，重新获取下一个位置
        }
        if (nextPosY <= 0 || nextPosY >= windowHeight - obj.height() - 5) {
            dirY = dirY * -1;//改变方向
            nextPosY = currentPos.top + dirY;//为了不过界，重新获取下一个位置
        }
        obj.css({ left: nextPosX + "px", top: nextPosY + "px" });//移动到下一个位置
    }
    function close() {
        clearInterval(handler);
        obj.remove();
    }
}
window.addEventListener("load", () => {
    $('#checkinfo').click(checkinfoClick);
    var clipboard = new Clipboard('.btn');
    clipboard.on('success', clipboardSuccess);
    clipboard.on('error', clipboardError);
    $('#reportClick').click(reportClick);
    $('#gridad-close-btn').click(gridadCloseBtn)
    $('#checkinfo').click(checkinfoClick)
    if (is_weixin()) {
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            $('#weixin').show();
            $('#sx').show();
        } else {
            $('#weixin_an').show();
        }
    }
})
