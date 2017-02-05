function on(ele, type, fn) {
    //自定义事件
    if (/^self/.test(type)) {
        if (!ele["aSelf" + type]) {
            ele["aSelf" + type] = [];
        }
        var ary = ele["aSelf" + type];
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn)return
        }
        ary.push(fn);
        return
    }
    //标准的绑定事件
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
        return
    }
    //IE中处理绑定内置事件 以下是放到自定义的事件池中 ；需要有个run在内置的事件池
    if (!ele["myEvent" + type]) {
        ele["myEvent" + type] = [];
        ele.attachEvent("on" + type, function () {
            run.call(ele)
        });
    }
    var ary = ele["myEvent" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn)return
    }
    ary.push(fn)
}
function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
        return
    }
    if (/^self/.test(type)) {
        var ary = ele["aSelf" + type];
        if (ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] == fn) {
                    ary[i] = null;
                    return
                }
            }
        }
        return
    }
    var ary = ele["myEvent" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;//这个地方为什么不能使用splice的原因是   在run运行的时候在执行off，数组本身发生变化，off运行完后，再次回到run，数组发生变化，但是run中的i值没有变；
                return
            }
        }
    }
}
//第一种写法 主要为IE中为了运行自定义事件池程序
function run() {
    //请问传不传e有什么区别 之前那个匿名函数不传是不行的，因为他执行的时候回到上一个作用域找
    //不传的话是window下面的e不需要穿
    //传的话可以写车e=e||window.e实际上这个google肯定不会用；所以直接写下面那个就行；
    var e = window.event;
    var type = e.type;
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
        e.preventDefault = function () {
            e.returnValue = false
        }
    }
    var ary = this["myEvent" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] === "function") {
                ary[i].call(this, e);
                continue
            }
            ary.splice(i, 1);
            i--;
        }
    }
}
/*function run(e) {
    e = e || window.event
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
        e.stopPropagation = function () {
            e.cancelBubble = true;
        }
        e.preventDefault = function () {
            e.returnValue = false
        }
    }
}*/
/*selfRun.call({});*/
//必须让每个最终执行时候里面的this变成ele
function selfRun(option, e) {//这个e是系统的事件
    var ary = this["aSelf" + option.type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] === "function") {
                ary[i].call(this, e, option)
            }
        }
    }
}