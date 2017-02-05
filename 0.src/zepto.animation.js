(function () {
	var aniTime = function ($obj) {
		this.ele = $obj;
	};

	aniTime.prototype.animateName = function (typeName) {
		this.ele.addClass(typeName);
		return this;
	}
	aniTime.prototype.durate = function (num) {
		this.ele.css("animation-duration", num + 's');
		return this;
	}

	aniTime.prototype.delay = function (num) {
		this.ele.css("animation-delay", num + "s");
		return this;
	}

	aniTime.prototype.counts = function (num) {
		if (num == 'infinite') {
			this.ele.css("animation-iteration-count", 'infinite');
		} else {
			this.ele.css("animation-iteration-count", num + 's');
		}
		return this;
	}

	aniTime.prototype.done = function (func) {
		this.ele.one('webkitAnimationEnd', function () {
			func();
		});
		return this;
	}
	$.fn.animations = function () {
		var $obj = $(this);
		if (!$obj.data("ani")) {
			$obj.data("ani", new aniTime($obj));
		}
		var reobj = $obj.data("ani");
		return reobj;
	}
})(Zepto);