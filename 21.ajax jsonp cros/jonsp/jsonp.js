~function () {
    //在jquery中
    this.jsonp = function (url, data, jsonp, callback) {
        var count = 1;
        //这个就是cb
        var cbName = jsonp + count++;
        var callbackName = "window.jsonp." + cbName;//这是全局的函数
        window.jsonp[cbName] = function (data) {
            try {
                callback(data)
            } finally {
                delete window.jsonp[cbName];
                script.parentNode.removeChild(script)
            }
        }
        var src = tools.padURL(url, data);
        src = tools.padURL(src, jsonp + "=" + callbackName);//这个名字是不可改变的原因是jsonp后面的跟的是全局的函数
        var script=document.createElement("script");
        script.src=src;
        script.type='text/javascript';
        script.async='async';
        document.documentElement.appendChild(script)
    }
    var tools = {
        padURL: function (url, par) {//uri格式 有可能拼对象,也有可能拼字符传
            var par = this.encodeURIstring(par);
            if (!par) {
                return url
            }
            return url + (/\?/.test(url) ? '&' : '?') + par
        },
        encodeURIstring: function (data) {
            if (!data) {
                return ''
            }
            if (typeof data === "string") {
                return data
            }
            var ary = [];
            for (var key in data) {
                if (!data.hasOwnProperty(key))continue;
                ary.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            }
            return ary.join('&')
        }
    }
}()