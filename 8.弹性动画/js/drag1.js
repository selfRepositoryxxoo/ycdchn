/*var oBox = document.getElementById("div1"),
    minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;*/
function down(e) {
    this["strX"] = e.pageX;
    this["strY"] = e.pageY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;
    if (this.setCapture) {
        this.setCapture();
        on(this, "mousemove", move);
        on(this, "mouseup", up);
    } else {
        var _this = this;
        _this.MOVE = function (e) {
            move.call(_this, e)
        };
        _this.UP = function (e) {
            up.call(_this, e)
        };
        /*this.MOVE = move.bind(this);//es5中原生的方法
         this.UP = up.bind(this);*/

        on(document, "mousemove", this.MOVE);
        on(document, "mouseup", this.UP);
    }
    e.preventDefault();
    selfRun.call(this, "selfdragstart", e);

}
function move(e) {
    var curL = e.pageX - this["strX"] + this["strL"];
    var curT = e.pageY - this["strY"] + this["strT"];
    var minL = 0,
        minT = 0,
        maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth,
        maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
    curL = curL <= minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT <= minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";
    selfRun.call(this, "selfdragging", e);
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        off(this, "mousemove", move);
        off(this, "mouseup", up);
    } else {
        off(document, "mousemove", this.MOVE);
        off(document, "mouseup", this.UP);
    }
    selfRun.call(this, "selfdragend", e)

}
function clearEffect() {
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);
}
function getSpeed(e) {
    if (!this["prev"]) {
        this["prev"] = this.offsetLeft;
        return
    }
    this["speedFly"] = this.offsetLeft - this["prev"];
    this["prev"] = this.offsetLeft
}
function fly() {
    var _this = this, speedFly = _this["speedFly"];
    var  maxL = (document.documentElement.clientWidth || document.body.clientWidth) - _this.offsetWidth;
    _this.flyTimer = window.setInterval(function () {
        speedFly *= 0.98;
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this.flyTimer);
            speedFly=null;
        }
        var curL = _this.offsetLeft + speedFly;
        if (curL >= maxL) {
            speedFly *= -1;
            curL = maxL
        } else if (curL <= 0) {
            speedFly *= -1;
            curL = 0
        }
        _this.style.left = curL + "px";
        console.log(_this.style.left)
    }, 10)
}


function drop() {
    var _this = this, speedDrop = 9, flag = 0;
    var  maxT = (document.documentElement.clientHeight || document.body.clientHeight) - _this.offsetHeight;
    _this.dropTimer = window.setInterval(function () {
        if (flag > 1) {
            window.clearInterval(_this.dropTimer);
            return;
        }
        speedDrop += 10;
        speedDrop *= .98;
        var curT = _this.offsetTop + speedDrop;
        if (curT > maxT) {
            curT = maxT;
            speedDrop *= -1;
            flag++;
        } else {
            flag = 0;
        }
        _this.style.top = curT + "px"
    }, 10)

}
//在新的动画执行之前，就要把原来的动画效果清除到
