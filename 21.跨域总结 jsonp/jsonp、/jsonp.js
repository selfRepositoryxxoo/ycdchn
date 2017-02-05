~function () {
    this.jsonp = function (url, data, jsonp, callback) {
        var cbName = jsonp + count++;
        //创建一个全局的函数名
        var callbackname = 'window.jsonp.' + cbName;
        window.jsonp[cbName] = function (data) {
            try {
                callback(data)
            } finally {
                script.parentNode.removeChild(script);
                delete window.jsonp[cbName]
            }
        };

        var  src = tools.padURLString(url, jsonp + '=' + callbackname);
        src = tools.padURLString(src, data);
        var script=document.createElement("script");
        script.src=src;
        script.type='text/javascript';
        script.async='async';
        document.documentElement.appendChild(script)
    };
    var count = 0;
    var tools = {
        padURLString: function (url, par) {
           var  par = this.encodeToURIString(par);
            if (!par) {
                return url
            }
            return url + (/\?/g.test(url) ? '&' : '?') + par
        },
        encodeToURIString: function (data) {
            if (!data) {
                return '';
            }
            if (typeof data == 'string') {
                return data
            }
            var ary = [];
            for (var key in data) {
                if (!data.hasOwnProperty(key))continue;
                ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            return ary.join('&');
        }
    }
}()
