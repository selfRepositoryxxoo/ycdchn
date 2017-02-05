
var oBox = document.getElementById("box");
var minL = 0,
    minT = 0,
    maxL = (document.documentElement.clientWidth || document.body.clientWidth) - oBox.offsetWidth,
    maxT = (document.documentElement.clientHeight || document.body.clientHeight) - oBox.offsetHeight;

on(oBox, "mousedown", down);
function down(e) {
    this["strX"] = e.pageX;
    this["strY"] = e.pageY;
    this["strL"] = this.offsetLeft;
    this["strT"] = this.offsetTop;
    if (this.setCapture) {
        this.setCapture();
        on(this, "mousemove", move);
        on(this, "mouseup", up);
        return
    }
    var _this = this;
    _this.MOVE = function (e) {
        move.call(_this, e)
    };
    _this.UP = function (e) {
        up.call(_this, e)
    };


    on(document, "mousemove", this.MOVE);
    on(document, "mouseup", this.UP);
    window.clearInterval(this.flyTimer);
    window.clearInterval(this.dropTimer);
}
function move(e) {
    var curL = e.pageX - this["strX"] + parseFloat(this["strL"]);
    var curT = e.pageY - this["strY"] + parseFloat(this["strT"]);
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    if (!this["prev"]) {
        this["prev"] = this.offsetLeft;
    } else {
        this["speedFly"] = this.offsetLeft - this["prev"];
        this["prev"] = this.offsetLeft;
    }
}
function up(ev) {
    off(document, "mousemove", this["MOVE"]);
    off(document, "mouseup", this["UP"]);
    fly.call(this);
    drop.call(this);
}


function fly() {
    var _this = this,
        speedFly = _this["speedFly"];
    _this.flyTimer = window.setInterval(function () {
        if (Math.abs(speedFly) < 0.5) {
            window.clearInterval(_this.flyTimer);
            return;
        }
        speedFly *= 0.98;
        var curL = _this.offsetLeft + speedFly;
        if (curL > maxL) {
            curL = maxL;
            speedFly *= -1;
        } else if (curL < minL) {
            curL = minL;
            speedFly *= -1;
        }
        _this.style.left = curL + "px";
    }, 10);
}

function drop() {
    var _this = this, speedDrop = 9.8, flag = 0;
    _this.dropTimer = window.setInterval(function () {
        if (flag > 1) {
            window.clearInterval(_this.dropTimer);
            return;
        }
        speedDrop += 10;
        speedDrop *= 0.98;
        var curT = _this.offsetTop + speedDrop;
        if (curT > maxT) {
            curT = maxT;
            speedDrop *= -1;
            flag++;
        } else {
            flag = 0;
        }
        _this.style.top = curT + "px";
    }, 10)
}





