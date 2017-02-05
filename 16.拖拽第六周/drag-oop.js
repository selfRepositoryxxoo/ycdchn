/*以下是设计模式为对象*/
function EventEmitter() {
}
//想要实现链式写法就是在只要return的之基础上  this
EventEmitter.prototype.on = function (type, fn) {
    if (!this["aEmitter" + type]) {
        this["aEmitter" + type] = [];
    }
    var ary = this["aEmitter" + type];
    for (var i = 0; i < ary.length; i++) {
        if (ary[i] === fn)return this
    }
    ary.push(fn);
    return this;
   // console.log("ok");
};
EventEmitter.prototype.run = function (e, systemEvent) {
    var ary = this["aEmitter" + e.type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (typeof ary[i] === "function") {
                ary[i].call(this, systemEvent, e);
                continue
            }
            ary.splice(i, 1);
            i--;
        }
    }
};
EventEmitter.prototype.off = function (type, fn) {
    var ary = this["aEmitter" + type];
    if (ary) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i] === fn) {
                ary[i] = null;
                return this
            }
        }
    }
};
/*任何事件都可以借助上边的设计模式；*/
Drag.prototype = new EventEmitter;//这个必须写在上面否则的话  写在下面的，先往原型上添加方法，然后在写这个，drag原型上的方法想当于没用；
/*Drag.prototype.__proto__ = EventEmitter.prototype;*/

function Drag(ele) {
    this.ele = ele;
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    var _this = this;
    this.minL = 0;
    this.minT = 0;
    this.maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.ele.offsetWidth;
    this.maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight;
    this.DOWN = function (e) {
        _this.down(e)
    };
    this.MOVE = function (e) {
        _this.move(e)
    };
    this.UP = function (e) {
        _this.up(e)
    };
    //    this.on.call(this.ele, "mousedown", this.DOWN)
    //下面的这个on不是上面的那个on
    on(this.ele, "mousedown", this.DOWN)
}
Drag.prototype.down = function (e) {
    this.x = e.pageX;
    this.y = e.pageY;
    this.mx = this.ele.offsetLeft;
    this.my = this.ele.offsetTop;
    if (this.ele.setCapture) {
        this.ele.setCapture();
        on(this.ele, "mousemove", move);
        on(this.ele, "mouseup", up);
    } else {
        on(document, "mousemove", this.MOVE);
        on(document, "mouseup", this.UP)
    }
    e.preventDefault();
     //run.call(this.ele,{type:"dragstart"},e);//这是调用的方法不行 不是原型链上的
    this.run({type: "dragstart"}, e)
};
Drag.prototype.move = function (e) {
    this.curL = e.pageX - this.x + this.mx;
    this.curT = e.pageY - this.y + this.my;
    this.curL = this.curL < this.minL ? this.minL : (this.curL > this.maxL ? this.maxL : this.curL);
    this.curT = this.curT < this.minT ? this.minT : (this.curT > this.maxT ? this.maxT : this.curT);
    this.ele.style.left = this.curL + "px";
    this.ele.style.top = this.curT + "px";
    //run.call(this.ele,{type:"dragging"},e);
    this.run({type: "dragging"}, e)
};
Drag.prototype.up = function (e) {
    if (this.ele.releaseCapture) {
        this.ele.releaseCapture();
        off(this.ele, "mousemove", move);
        off(this.ele, "mouseup", up);
    } else {
        off(document, "mousemove", this.MOVE);
        off(document, "mouseup", this.UP);
    }
    //run.call(this.ele,{type:"draggend"},e);
    this.run({type: "draggend"}, e)
};

















