//面向对象的拖拽；  现在是对象的拖拽 但是拖拽的是元素
function Drag(ele) {
    this.ele = ele;
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.minL = 0;
    this.minT = 0;
    //必须加（）
    this.maxL =(document.documentElement.clientWidth || document.body.clientWidth)- this.ele.offsetWidth;
    this.maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight;
    this.curL = null;
    this.curT = null;
    //要绑定down这个方法；//面向对象中的this都要是实例，
    var that = this;
    this.DOWN = function (e) {//按道理来说现在这个this.down()匿名函数中的this是window大但是不是，原因是我们经过on这个方法已经将里this变成this.ele了  this.down()肯定是不行的所以要换成that。
        console.log(this);
        that.down(e);//this.down()//但是里面的this必须实例，所以 一会尝试这个；
      // that.down.call(that, e);
    };
    on(this.ele, "mousedown", this.DOWN);
    this.MOVE = function (e) {
        //that.move.call(that, e);
        that.move(e)
    };
    this.UP = function (e) {
       // that.up.call(that, e);
       that.up(e)
    }
}
Drag.prototype.down = function (e) {
    console.log(this);
    this.x = e.pageX;
    this.y = e.pageY;
    this.mx = this.ele.offsetLeft;
    this.my = this.ele.offsetTop;
    if (this.ele.setCapture) {
        this.ele.setCapture();
        on(this.ele, "mousemove", this.MOVE);
        on(this.ele, "mouseup", this.UP)
    } else {
        on(document, "mousemove", this.MOVE);
        on(document, "mouseup", this.UP)
    }
    e.preventDefault();

};
Drag.prototype.move = function (e) {
    this.curL = e.pageX - this.x + this.mx;
    this.curT = e.pageY - this.y + this.my;
    this.curL = this.curL < this.minL ? this.minL : (this.curL > this.maxL ? this.maxL : this.curL);
    this.curT = this.curT < this.minT ? this.minT : (this.curT > this.maxT ? this.maxT : this.curT);
    this.ele.style.left = this.curL + "px";
    this.ele.style.top = this.curT + "px";
};
Drag.prototype.up = function (e) {
    if (this.ele.releaseCapture) {
        this.ele.releaseCapture();
        off(this.ele,"mousemove",move);
        off(this.ele,"mouseup",up);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP)
    }
};




























