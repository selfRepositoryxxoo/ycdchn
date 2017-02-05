(function (global, undefined) {     //如果全局已经存在$http对象的话就直接返回，不执行任何代码。
    if (global.$http) {
        return
    }
    var http = global.$http = {};
    //判断类型
    function isType(str) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == '[object ' + str + ']';
        }
    }

    var isObject = isType("Object");
    var isFunction = isType("Function");
    var isNumber = isType("Number");
    var isString = isType("String");
    var isBoolean = isType('Boolean');
    var isArray = isType('Array');
    //检测参数中有没有`?`
    var hasSearch = function (url) {
        return /^.+\?[^?]*$/g.test(url)
    };
    //循环帮助函数
    var each = (function () {
        if ([].forEach)
            return function (arr, func) {
                [].forEach.call(arr, func);
            } else
            return function (arr, func) {
                for (var i = 0; i < arr.length; i++) {
                    func.call(arr, arr[i], i, arr);
                }
            }
    })();      //获取ajax对象,
    var getXHR = function () {
        for (var list = [function () {
            return new XMLHttpRequest
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }], temp = null, index = 0; index < list.length; index++) {
            try {
                temp = list[index]()
            } catch (ex) {
                continue
            }
            getXHR = list[index];
            break;
        }
        if (!temp) {
            throw new ReferenceError("browser is not supported")
        }
        return temp;
    };
    http.ajax = function (options) {
        // 如果options不是一个对象那么此方法后续将不执行。
        if (!isObject(options)) return;
        //默认参数对象
        var defaultOptions = {
            //添加到请求头`Accepts`中，用来说明这个Ajax接收什么MIME Type的数据。Array类型
            accepts: undefined,
            //是否为异步，默认为true。Boolean类型
            async: true,
            //在执行send()方法之前调用的函数。Function类型
            beforeSend: undefined,
            //是否缓存。Boolean类型
            cache: false,
            //不管成功或失败都会执行的函数。Function类型
            complete: function () {
            },
            //添加到请求头`Content-Type`中，标识此http是什么MiME Type，默认为`application/x-www-form-urlencoded; charset=UTF-8`。String类型
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            //宿主对象。Object类型
            context: undefined,
            //发送给服务器的数据。Object或者String类型
            data: undefined,
            //服务器返回的数据格式，可以为`xml|bolb|arraybuffer|html|script|json|text`。String类型
            dataType: 'text',
            //过滤服务器返回数据。Function类型
            dataFilter: undefined,
            //执行失败、parseError或者timeout执行的函数。Function类型
            //为什么一放开就报错； error: function (xhr, xhr.status, text) {},
             error: function () {
             },
            //自定义头信息。Object类型
            headers: {},
            // 重写服务器返回MIME Type。String类型
            mimeType: '',
            // URL认证密码。String类型
            password: '',
            /*undefined*/
            // 注册对应http状态码时执行的函数。Object类型
            statusCode: {},
            // Ajax成功时执行的函数。Function类型
            success: function (response) {
            },
            // 超时毫秒值，此值必须大于500毫秒，否则不生效。Number类型
            timeout: undefined,
            // 请求的http方法，可以为`get|post|head|put|delete`。String类型
            type: '',
            // 请求的URL，此URL的方案不可以为`file`。String类型
            url: '',
            // URL认证账号。String类型
            username: undefined,
            // 在send()执行前，通过此函数操作xhr对象。Function类型
            setXhrFields: function (xhr) {
            }
        };

//临时变量
        tempVal;
// 覆盖默认参数对象
        for (tempVal in defaultOptions) {
            if (options.hasOwnProperty(tempVal) && options[tempVal])
                defaultOptions[tempVal] = options[tempVal];
        }
        var xhr = getXHR(), _promise = new __promise();
        if (!/^(get|post|head|put|delete)$/img.test(defaultOptions.type)) {
            throw new ReferenceError('not supported this http method');
        }
        if (!/^(xml|bolb|arraybuffer|html|script|json|text)/img.test(defaultOptions.dataType)) {
            throw new TypeError('not supported ' + defaultOptions.dataType + ' data type');
        }
        if (!isString(defaultOptions.url)) {
            throw new TypeError('url must be a string')
        }
// 是否使用缓存，不使用则在URL后添加一个随机数
        if (defaultOptions.cache) {
            defaultOptions.url += (hasSearch(defaultOptions.url) ? '_=' : '?_=') + Math.random() * (1 << 24) | 0;
        }
// 将发送给服务器的数据从Object类型转为String类型
        if (defaultOptions.data) {
            if (isObject(defaultOptions.data)) {
                var arr = [];
                for (tempVal in defaultOptions.data) {
                    if (defaultOptions.data.hasOwnProperty(tempVal)) {
                        // 此处参见下文的表单操作
                        arr.push(encodeURIComponent(tempVal) + "=" + encodeURIComponent(defaultOptions.data[tempVal]));
                    }
                }
                defaultOptions.data = arr.join('&');
            }
// 当请求的http方法为get、head、delete中一个时直接拼接到URL后并且删除data。参见send()方法解释。
            if (/^(get|head|delete)$/img.test(defaultOptions.type)) {
                defaultOptions.url += (hasSearch(defaultOptions.url) ? '' : '?') + defaultOptions.data;
                delete  defaultOptions.data;
            }
        }
        defaultOptions.setXhrFields(xhr);
        xhr.open(defaultOptions.type, defaultOptions.url, defaultOptions.async, defaultOptions.username, defaultOptions.password);
        if (isArray(defaultOptions.accepts)) {
            each(defaultOptions.accepts, function (x) {
                xhr.setRequestHeader('Accepts', x);
            })
        }
        for (tempVal in defaultOptions.headers) {
            if (defaultOptions.headers.hasOwnProperty(tempVal))                 xhr.setRequestHeader(tempVal, defaultOptions.headers[tempVal]);
        }
        xhr.setRequestHeader("Content-Type", defaultOptions.contentType);
        if (defaultOptions.context) {
            // 绑定宿主对象
            defaultOptions.complete = defaultOptions.complete.bind(defaultOptions.context);
            defaultOptions.success = defaultOptions.success.bind(defaultOptions.context);
            defaultOptions.error = defaultOptions.error.bind(defaultOptions.context);
        }
//将success、error、complete方法包裹起来
        var _success = function (text) {
            defaultOptions.success(text);
            _promise._done(text);
            defaultOptions.complete(xhr);
            _promise._always();
        }, _error = function (text) {
            defaultOptions.error(xhr, xhr.status, text);
            _promise._fail(xhr, xhr.status, text);
            defaultOptions.complete(xhr);
            _promise._always();
        };
// 检测xhr对象是否有responseType，如果有则将dataType赋给它
        ('responseType' in xhr) && (xhr.responseType = defaultOptions.dataType);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (defaultOptions.mimeType) {
                    //重写MIME Type
                    xhr.overrideMimeType(defaultOptions.mimeType);
                }
                // 当http状态码为2xx时执行success，4xx或5xx时执行error
                if (/^2\d{2}$/.test(this.status)) {
                    var returnVal = undefined;
                    if (xhr.responseType) {
                        returnVal = this.response;
                    } else {                         //数据处理
                        switch (defaultOptions.dataType.toLowerCase()) {
                            case 'xml':
                                returnVal = this.responseXML;
                                break;
                            case 'html':
                                var frag = document.createDocumentFragment();
                                frag.innerHTML = this.responseText;
                                returnVal = frag;
                                break;
                            case 'script':
                                var scr = document.createElement("script");
                                scr.innerHTML = this.responseText;
                                returnVal = scr;
                                break;
                            case 'json':
                                if (global.JSON.parse) {
                                    try {
                                        returnVal = JSON.parse(this.responseText);
                                    } catch (ex) {
                                        _error(ex)
                                    }
                                } else {
                                    returnVal = eval('(' + this.responseText + ')');
                                }
                                break;
                            case 'arraybuffer':
                                throw new ReferenceError('not supported arraybuffer');
                            case 'blob':
                                throw new ReferenceError('not supported blob');
                            default:
                                returnVal = this.responseText;
                        }
                    }
                    _success(defaultOptions.dataFilter(returnVal) || returnVal);
                }
                if (/^(4|5)\d{2}$/.test(this.status)) {
                    _error();
                }
                // 根据http状态码执行statusCode中对应的函数
                (this.status.toString() in defaultOptions.statusCode) && defaultOptions.statusCode[this.status]();
            }
        };
        if (defaultOptions.beforeSend) {
            defaultOptions.beforeSend(xhr);
        }
        xhr.send(defaultOptions.data);
        xhr.onerror = _error;
// 超时设置，此方法有兼容性。所以执行前先做特性判断
        if (isNumber(defaultOptions.timeout) && defaultOptions.timeout > 500) {
            if ('timeout' in xhr) {
                xhr.timeout = defaultOptions.timeout;
                xhr.ontimeout = defaultOptions.error;
            } else {
                setTimeout(function () {
                    if (xhr.readyState != 4) {
                        _error();
                    }
                }, defaultOptions.timeout);
            }
        }
//返回链式注册对象
// return _promise;     };
// 利用ajax方法生产get、post方法
        each(['get', 'post'], function (x) {
            http[x] = function (url, data, func, datatype) {
                if (arguments.length != 4)                 throw new TypeError('lacking arguments');
                return http.ajax({url: url, data: data, success: func, dataType: datatype, type: x})
            }
        });
// 利用ajax生产getScript方法
        http.getScript = function (url, data, func) {
            return http.ajax({url: url, type: 'get', data: data, success: func, dataType: 'script'})
        };
//链式调用对象
        function __promise() {
            // 设置默认函数
            this._done = this._fail = this._always = function () {
            };
        }

// 这三个方法执行完之后都必须将自己返回，否则无法链式注册
        __promise.prototype.done = function (func) {
            this._done = func;
            return this;
        };
        __promise.prototype.fail = function (func) {
            this._fail = func;
            return this;
        };
        __promise.prototype.always = function (func) {
            this._always = func;
            return this;
        };      //
// AMD, CommonJs, then globals
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return http;
            });
        } else if (typeof exports === 'object') {
            module.exports = http;
        } else {
            global.$http = global.$http || http;
        }
    }
})(window);
