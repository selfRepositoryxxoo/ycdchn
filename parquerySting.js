function parquerySting(str) {
    var obj = {};


}

function queryURLParameter() {
    var obj = {},
        curURL = window.location.href,//->获取当前页面的URL地址
        reg = /([^?&=]+)=([^?&=]+)/g;
    curURL.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}


