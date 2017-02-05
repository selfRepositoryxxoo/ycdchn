//这里声明undefined就是为了兼容版本的IE，因为在低IE中undefined不是关键字 undefined是可以重写的
~function (global, undefined) {
    //防止重复加载；
    if (global.$http) {
        return
    }
//如果window里面没有$http 就往window声明一个$http
    var _h = global.$http = {};
    //默认参数列表  描述aJax的行为
    var defaultOptions = {
        type: "get",//http method
        url: '',//request url
        data: {},//send data//如果是对象的话转化为Uri的格式{a:1}
        dataType: "text",//data type xml
        cache: false,//走不走缓存
        async: true,//异步
        username: undefined,//
        password: void 0,
        success: function () {
        },
        error: function () {
        },
        timeout: 0,//超时，
        headers: {},//自定义头部信息
        context: global,//默认的是window
        mimeType: ""

    };
    //增加一个ajax的方法核心
    _h.ajax = function (settings) {
        //判断输入的参数是不是一个对象，如果不是就抛出一个错误
        if (!myUtil.isObject(settings)) {
            throw new Error("参数必须是一个对象");
        }
        //把用户输入的参数对象覆盖到默认的对象上
        settings = myUtil.extend(defaultOptions, settings);
        //ajax第一个不活去ajax的实例
        var xhr = myUtil.getXHR();
        //声明一个Verify验证对象的实例，以后要用这个实例来验证参数；
        var verify = Verify(settings);
        //第一个是验证http method 是否合法  第二个是验证dataType是否合法
        verify.validate({
            name: "验证http method",
            key: "type",
            errMsg: "http method不正确",
            validateRule: function (type) {
                return /^(get|post|head|delete|put)$/img.test(type)
            }
        }).validate({
            name: "验证dataType",
            key: "dataType",
            errMsg: "dataType不正确",
            validateRule: function (dataType) {
                return /^(text|json)$/img.test(dataType)
            }
        }).start();//推进去，然后验证
        //如果data是一个对象，把data转化成uri的格式
        if (myUtil.isObject(settings.data)) {
            settings.data = myUtil.encodeObject2URI(settings.data);
        }
        //如果不走缓存  就往url后面就加一个随机数；
        if (settings.cache === false) {
            settings.url = myUtil.hasSearch(settings.url, "_=" + ~~(Math.random() * 0xffffff))
        }
        //强制转化为boolean类型
        settings.async = !!settings.async;
        //IE中没有这timeout   绑定success 和error中的this指向
        settings.success = myUtil.bind(settings.success, settings.context);
        settings.error = myUtil.bind(settings.error, settings.context);
        //判断超时 最少是500ms  地版本没有timeout
        if (settings.timeout > 500) {
            //标准的
            if ("timeout" in xhr) {
                //超时毫秒数
                xhr.timeout = settings.timeout;
                //超时的时候触发的函数 内置的
                xhr.ontimeout = settings.error
            } else {
                setTimeout(function () {
                    if (xhr.readyState !== 4) {
                        //强制终止ajax请求  内值的
                        xhr.abort();
                        // settings.error.call(settings.context)
                        settings.error()
                    }
                }, settings.timeout)
            }
        }
        //如果是get的话 绑定在   就把data拼接url后面，并且把data清空如果是get系把data拼接在后面 规定
        //&&settings.data如果没有这个就会出现一个（&）
        if (/(get|delete|head)/img.test(settings.type)&&settings.data) {
            settings.url = myUtil.hasSearch(settings.url, settings.data);
            settings.data = void 0;
        }

//ajax第二部，调用open这个方法，并把参数传进去
        xhr.open(settings.type, settings.url, settings.async, settings.username, settings.password)
        //重写mimeype 因为低版本浏览器不支持overrideMimeType
        //所有需要先判断一下在执行
        if (myUtil.isString(settings.mimeType )&& xhr.overrideMimeType) {
            //overrideMimeTypeIE不兼容
            xhr.overrideMimeType(settings.mimeType)//重写mimeType
        }
        //重写头部
        if (myUtil.isObject(settings.headers)) {
            for (var key in settings.headers) {
                if (!settings.headers.hasOwnProperty(key))continue;
                xhr.setRequestHeader(key, settings.headers[key]);
            }
        }

        //ajax操作第三部， 注册完成onreadystatechange
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var resText = xhr.responseText
                //如果浏览器返回2开头的就算成功
                if (/2\d{2}/.test(xhr.status)) {
                    //responseText响应主体  有两种格式 一个是json字符串  转化为json的对象
                    if (settings.dataType.toLowerCase() === "json") {
                        try {
                            resText = myUtil.JSONParse(xhr.responseText);
                        } catch (e) {
                            //为什么要加catch  假如服务器返回的是不合法的json对象，这时候转换就会报错，所以要使用 try catch 包住，并且调用error方法
                            return settings.error(e)
                        }
                    }
                    //执行成功函数
                    settings.success(resText)
                }
                //如果4或者5开头的就算失败。 直接执行error方法
                if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    settings.error(xhr.status, xhr.getAllResponseHeaders())//头部新

                }
            }
        };
        //get 已经没有东西了  post就有东西了   发送请求，并且把参数放到请求主体里面
        //因为在上面  get系类已经 把data清空了  现在直接传data是没有事的
        xhr.send(settings.data)
    };
    //帮助函数；
    //;shim是前端翻译  处理低版本的浏览器的
    var myUtil = {
        //获取Xhr的对象的四中方式  得到浏览器最合适的xhr的对象
        getXHR: function () {
            var xhrList = [function () {
                return new XMLHttpRequest()
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }, function () {
                return new ActiveXObject("MsXML2.XMLHTTP")
            }, function () {
                return new ActiveXObject("MsXML3.XMLHTTP")
            }, xhr = null];
            //每次拿出第一个给xhr一直到xhr=null就不行了
            while (xhr = xhrList.shift()) {//把第一个函数赋值给xhr
                //因为XMLHttpRequest()IE中没有 所以使用try catch
                try {
                    xhr();//IE报错，就做catch 还报错就继续，拿到浏览器做合适的获取xhr的对象
                    break;
                } catch (e) {
                    xhr = null;//xhr已经赋值了，但是不适合，清空，但是下次循环不是照样赋值新址
                    continue
                }
                //
                // myUtil.getXHR = xhr;//这个是把自己覆盖
            }
            if (xhr === null) {
                throw new Error("不支持ajax功能");
            } else {
                myUtil.getXHR = xhr;//这个是把自己覆盖
            }
            /*for (var i = 0, l = xhrList.length; i < l; i++) {
             try {
             xhrList[i]();
             break
             } catch (e) {
             continue
             }
             }
             if (i < l) {
             myUtil.getXHR=xhrList[i];
             }else{
             throw new Error("不支持ajax")
             }*/
            myUtil.each(xhrList, function (item, index, list) {

            })
        },
        //低版本不兼容  明天看一次；
        //处理循环的方法
        each: ~function () {//只需要判断一次，不需要再判断，因为执行完each他的值肯定是一个函数
            if ([].forEach) {
                return function (list, callBack, context) {
                    //高级浏览器是支持forEach方法的
                    //forEach支持两个参数，浏览器会自动的往回调函数传三个参数（item index list），上下文
                    [].forEach.call(list, callBack, context);
                    //list.forEach(function(){},context)//应该是这样的
                }
            }
            return function (list, callBack, context) {
                //
                for (var i = 0; i < list.length; i++) {
                    callBack.call(context, list[i], i, list)
                }
            }
        }(),
        //把第二个对象覆盖到第一个对象上头（不改变新对对象） 并且返回一个新对象
        extend: function (_old, _new) {
            //把新对象覆盖改
            var o = {};
            for (var key in  _old) {
                if (!_old.hasOwnProperty(key))continue;//是原型链的就直接跳过去
                o[key] = _new[key] || _old[key]
            }
            return o
        },
        //吧一个对象转化为URI格式
        encodeObject2URI: function (data) {
            var ary = [];
            for (var key in data) {
                if (!data.hasOwnProperty(key))continue;
                ary.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            }
            return ary.join("&");
        },

        //&是分隔符 有？就加& ,没有？就加？  判断的输入的字符串有没有？如果有问号就拼接一个& 没有直接的话就直接拼接一个？
        hasSearch: function (url, data) {
            return url + (/\?/.test(url) ? "&" : "?") + data
        },
        //绑定一个函数的this的指向
        bind: (function () {
            if (Function.prototype.bind) {
                return function (fn, context) {//这一层好像就是为了参数
                    return fn.bind(context)
                }
            }
            return function (fn, context) {
                return function () {
                    fn.apply(context, arguments)
                }
            }
        })(),
        //把一串字符串转化为对象
        JSONParse: (function () {
            if (global.JSON) {
                return function (data) {
                    return JSON.parse(data)
                }
            }
            return function (data) {//eval也是可以的
                return (new Function("return " + data))()//方法体直接执行
            }
        })()
    };
    //判断了类型  利用闭包生成判断类型的函数
    var isType = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == "[object " + type + "]"
        }
    };
    //循环string object function array  给myUtils动态添加判断数据类型的方法
    myUtil.each(["String", "Object", "Function", "Array"], function (item) {
        myUtil["is" + item] = isType(item)
    });
    //验证对象
    var Verify = function (settings) {
        //如果this 是window 返回一个对象
        if (!(this instanceof Verify)) {
            return new Verify(settings);//直接执行Verify()里面的this是window window不是Verify的实例，所以直接返回一个实例，
        }
        this.obj = settings;
        this.stateList = [];
    };
    Verify.prototype = {
        //把验证规则存起来
        validate: function (option) {
            this.stateList.push(option);
            return
        },
        //开始执行验证规则  不符合规则的抛出错误
        start: function () {
            myUtil.each(this.stateList, function (item) {
                if (!item.validateRule(this[item.key])) {
                    throw new Error("[" + item.name + "]" + item.errMsg)
                }
            }, this.obj)

        }
    }
}(window);
