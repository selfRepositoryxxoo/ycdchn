// +--------------------------------------------------------------------------------------------
// | zepto.countdown.js [ for Sucry's html5 pageSlides ] 
// +--------------------------------------------------------------------------------------------
// | Copyright (c) 2014-2006 http://www.dayima.com All rights reserved.
// +--------------------------------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +--------------------------------------------------------------------------------------------
// | Author: Sucry <sqboytan@126.com><tankang@dayima.com>
// +--------------------------------------------------------------------------------------------
// | 注明：	@param seconds  	倒计时的时间		默认 60倒计时
// +--------------------------------------------------------------------------------------------
// | 		@param endinfo  	结束之后的文案, 	默认	再次获取
// +--------------------------------------------------------------------------------------------
// | 		@param lockClass  	class锁住的标识, 	默认	再次获取
// +--------------------------------------------------------------------------------------------
(function ($) {
	$.fn.countdown = function (options) {
		var objs = $(this);
		var settings = {
				'seconds' 		: 	60,
				'endinfo'		:	'再次获取',
				'lockClass'		:	'tjs_count_over'
		};	//继承options
		$.extend(settings, options);
		var seconds = settings.seconds;
		objs.addClass(settings.lockClass);
		var trunOn = setInc();
		function setInc(){
			if(seconds==0){
				objs.html(settings.endinfo);
				objs.removeClass(settings.lockClass);
			}else{
				
				objs.html(seconds+"后"+settings.endinfo);
				--seconds;
				var setInt = setTimeout(function(){
					setInc()
				},1000);
			}
		}
	}
})(Zepto);