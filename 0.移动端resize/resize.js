(function (doc, win) {
	// 分辨率Resolution适配
	var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
				var clientWidth = docEl.clientWidth;//这是获取浏览器的宽度
				if (!clientWidth) return;
				if(clientWidth>=1080){
					clientWidth=1080;
				}
				docEl.style.fontSize = 200 * (clientWidth / 1080) + 'px';//之前都是100px现在是200px 现在的设计稿是1080
			};
	// Abort if browser does not support addEventListener
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);//这是是否支持 旋转
	doc.addEventListener('DOMContentLoaded', recalc, false);
	// 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
	(function(){
		return;
		var dpr = scale =1;
		var isIPhone = win.navigator.appVersion.match(/iphone/gi);//检测所有手机版本的 pc的话不是这个
		var devicePixelRatio = win.devicePixelRatio;
		if (isIPhone) {
			// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
			if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			// 其他设备下，仍旧使用1倍的方案
			dpr = 1;
		}
		scale = 1 / dpr;
		//以下就是让我们看看到底要不要使用的是 firstElementChild 还是div
		var metaEl = "";
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		if (docEl.firstElementChild) {//这个也有兼容性问题看来的话
			docEl.firstElementChild.appendChild(metaEl);
		} else {//不兼容的话就利用div
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	})();
})(document, window);