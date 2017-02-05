~function () {
    this.jsonp = function (url, data, jsonpcallback, callback) {
        var cbName = jsonpcallback + count++
        var callbackName = "window.jsonp." + cbName;
        window.jsonp[cbName] = function (data) {
            try {
                callback(data)
            } finally {
                delete window.jsonp[cbName]
                script.parentNode.removeChild(script)
            }
        };
        var src = tools.padURL(url, data)
        src = tools.padURL(src, jsonpcallback + "=" + callbackName);
        var script=document.createElement("script");
        script.src=src;
        script.type='text/javascript';
        script.async='async';// 这个是异步加载的。就是不堵塞 不是serTimeout那种形式
        document.documentElement.appendChild(script)
    }
    var count = 1;
    var tools = {
        padURL: function (url, par) {
             par = this.encodeURIstring(par);
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
                if (!data.hasOwnProperty(key))continue
                ary.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            }
            return ary.join('&')
        }
    }


}()