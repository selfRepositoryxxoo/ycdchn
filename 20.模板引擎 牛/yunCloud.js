/**
 * Created by zhangyatao on 15/9/23.
 */
!function (base) {
    "use strict";
    var global = global, self = this;
    if ("object" === typeof exports && "undefined" !== typeof module) {
        module.exports = base();
    } else if ("function" === typeof define && define.amd) {
        define([], base);
    } else {
        var platform;
        if ("undefined" !== typeof window) {
            platform = window;
        } else {
            platform = void 0 !== typeof global ? global : self;
        }
        platform.yunCloud = base();
    }
}(function () {
    "use strict";
    var decodeCharacterEntities = {
        "&lt;": "<",
        "&gt;": ">",
        "&nbsp;": " ",
        "&quot;": "\"",
        "&amp;": "&"
    };
    var encodeCharacterEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        " ": "&nbsp;",
        "\"": "&quot;"
    };
    var LimitableMap = function () {
        this.map = {};
    };
    LimitableMap.prototype.set = function (len, text, value) {
        return (this.map[len] || ( this.map[len] = {}))[text] = value;
    };
    LimitableMap.prototype.get = function (len) {
        //通过给map这个对象增加一个 .187（不确定的）的属性；
        return this.map[len] || {};
    };
    var util = {
        noop: function (x) {
            return x || '';
        },
        forIn: function (obj, callback) {
            for (var n in obj) {
                if (obj.hasOwnProperty(n)) {
                    callback.call(null, n, obj[n]);
                }
            }
        },
        extend: function (o, n) {
            this.forIn(o, function (key) {
                var val = n[key];
                o[key] = val === void 0 ? o[key] : val;
            });
        },
        trim: function (str) {
            if (''.trim) {
                return ('' + str).trim();
            }
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
    var regList = {
        matchReg: /^([\S\s]+?)(|\|([\S\s]+))$/,
        convert: /<%-([\S\s]+?)%>/g,
        val: /<%&([\S\s]+?)%>/g,
        origin: /<%=([\S\s]+?)%>/g,
        expression: /<%([\s\S]+?)%>/g
    };
    var globalSetting = {
        loose: true,
        cache: true,
        strip: true
    };
    var RenderAdapter = function () {
        this.cacheList = new LimitableMap();
        this.event = {};
    };
    RenderAdapter.prototype = {
        constructor: RenderAdapter,
        render: function (str) {
            var that = this;
            var parasitic = '';
            if (globalSetting.loose) {
                parasitic = 'data.';
            }
            var tpl = '';
            if (globalSetting.strip) {
                tpl = str.replace(/\s/g, ' ');
            } else {
                tpl = str.replace(/\n/g, '\\n');
                tpl = tpl.replace(/\r/g, '\\r');
                tpl = tpl.replace(/\f/g, '\\f');
                tpl = tpl.replace(/\t/g, '\\t');
                tpl = tpl.replace(/\v/g, '\\v');
            }
            tpl = tpl.replace(/\'/g, '\\\'');
            if (regList.convert.test(str)) {
                tpl = tpl.replace(regList.convert, function (match, code) {
                    return '\' + transfer("encode",' + parasitic + code + '||\"\") + \'';
                });
            }
            if (regList.val.test(str)) {
                tpl = tpl.replace(regList.val, function (match, code) {
                    return '\'+ ' + code + '+\'';
                });
            }
            if (regList.origin.test(str)) {
                tpl = tpl.replace(regList.origin, function (match, code) {
                    code = parasitic + code;
                    if (/\|/.test(code = util.trim(code))) {
                        var funcName = code.match(regList.matchReg);
                        return '\'+ (' + (that.event[util.trim(funcName[3])] || util.noop).toString() + ')(' + funcName[1] + ') +\'';
                    }
                    return '\'+(' + code + '||\"\")+\'';
                });
            }
            if (regList.expression.test(str)) {
                tpl = tpl.replace(regList.expression, function (match, code) {
                    return '\');\n' + code + '\ntpl.push(\'';
                });
            }
            tpl = tpl.replace(/'\n/g, '\'').replace(/\n\'/gm, '\'').replace(/\\(?!f|n|r|t|v)/g, '\\\\');
            tpl = 'tpl.push(\'' + tpl + '\');';
            tpl = tpl.replace(/tpl\.push\((''|'[\\n\s]+)'\);/g, '');
            var argu = '';
            if (globalSetting.loose) {
                tpl = 'var tpl=[];' + tpl + '\nreturn tpl.join(\'\');';
                argu = 'data';
            } else {
                tpl = 'var tpl=[];\nwith(obj||{}){\n' + tpl + '\n}\nreturn tpl.join(\'\');';
                argu = 'obj';
            }

            return new Function(argu, 'transfer', tpl);
        },
        storageCache: function (temp) {
            //现在是temp是字符串
            var that = this;
            //temp.length一个数字  我们要往html上面的那个整体的字符串；
            //执行这个get方法返回的的是  this.map.187['字符串']；属性值；奥知道了
            //这个是给map这个对象上增加一个属性名为187的属性值；也就是把需要把往页面中添加的字符串存起来；
            var renderTpl = this.cacheList.get(temp.length)[temp];
            if (renderTpl) {
                //如果存在直接返回；
                return renderTpl;
            }
            renderTpl = this.render(temp);
            return this.cacheList.set(temp.length, temp, function (obj) {
                return renderTpl(obj, that.transfer);
            });
        },
        transfer: function (type, str) {
            var transferCallback = function (key, value) {
                str = str.replace(new RegExp(key, 'g'), value);
            };
            if (type === 'encode') {
                util.forIn(encodeCharacterEntities, transferCallback);
            } else {
                util.forIn(decodeCharacterEntities, transferCallback);
            }
            return str;
        }
    };
    RenderAdapter.obtain = new RenderAdapter();
    //RenderAdapter.obtain 是一个实例；实例可以调用 所属类的方法；
    var manger = {
        template: function (temp) {
            if (globalSetting.cache) {//这个是cache 是true
                console.log(temp);
                return RenderAdapter.obtain.storageCache(temp);
            }
            return function (obj) {
                return RenderAdapter.obtain.render(temp)(obj, RenderAdapter.obtain.transfer);
            };
        }
    };
    /**
     * 编译模版
     * @param {string} str 模版字符串
     * @param {Object} data 模版数据
     * @returns {*}
     */
        //这种惰性写法没法执行 输出也没用； 他本质上已经不是函数了 只是一个赋值的变量了；
    var yunCloud = function (str, data) {
        if (arguments.length === 1) {
            return manger.template(str);
        }
        console.log(str);
        return manger.template(str)(data);
    };
    /**
     * 注册过滤器
     * @param {string} funcName 过滤器名称
     * @param {Function} callback 回调函数
     */
    yunCloud.register = function (funcName, callback) {
        //这个注册的意思就是我们把linkFilter注册自己的属性上；//这和上面的所有的方法都一个性质；
        RenderAdapter.obtain.event[funcName] = callback;
    };
    /**
     * 解除过滤器
     * @param {string} funcName 过滤器名称
     */
    yunCloud.unRegister = function (funcName) {
        delete RenderAdapter.obtain.event[funcName];
    };
    /**
     * 设置
     * @param {Object} settings
     */
    yunCloud.set = function (settings) {
        util.extend(globalSetting, settings);
    };
    return yunCloud;
});