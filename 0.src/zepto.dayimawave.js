// +--------------------------------------------------------------------------------------------
// | zepto.dayimawave.js [ for tankang's html5 bottomwave ]
// +--------------------------------------------------------------------------------------------
// | Copyright (c) 2014-2006 http://www.miaoqian.com All rights reserved.
// +--------------------------------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +--------------------------------------------------------------------------------------------
// | Author: Yuanhao <tank@miaoqian.com><767247151@qq.com>
// +--------------------------------------------------------------------------------------------
// | 注明：	@param background  	透明背景颜色		默认 姨吗粉 #fb60a9
// +--------------------------------------------------------------------------------------------
// | 		@param slogan  	    大姨吗slogan   	默认	疼爱你的每个特殊时刻
// +--------------------------------------------------------------------------------------------
// | 		@param downloadbtn  下载按钮文案    	默认	立即下载
// +--------------------------------------------------------------------------------------------
(function ($) {
	$.fn.dayimawave = function (options) {
		var objs = $(this);
		var settings = {
				'background'  : '#fb60a9',
				'slogan'	  :	'',
				'downloadbtn' : '立即下载',
				'url'  		  : 'http://dayima.us/s/currentandroid',
				'iconImg'	  : 'http://cdn.yoloho.com/marketing_html5/images/dymicon.png'
		};	//options浅覆盖settings
		$.extend(settings, options);
		
		var htmls       = '';
		var background  = settings.background;
		var slogan      = settings.slogan;
		var downloadbtn = settings.downloadbtn;
		var url      = settings.url;
		
		
		htmls += '<div id="newbottom" style="width:100%;height: 60px;position: fixed;bottom: 0px;filter: alpha(opacity=50);opacity: 0.7;background:' + background + '">';
		htmls += 	'<div class="newbottom1" style="float: left;margin-top: 17px;margin-left: 3%;">';
		htmls +=		'<img src="'+settings.iconImg+'" style="width:30px">';
		htmls += 	'</div>';
		htmls += 	'<div class="newbottom2" style="float: left;margin-top: 17px;margin-left: 3%;color: #000;">';
		htmls += 		'<div class="newbottom2_1" style="font-size:16px;">大姨吗</div>';
		htmls += 		'<div class="newbottom2_2" style="margin-top: 2px;font-size: 12px;">' + slogan + '</div>';
		htmls += 	'</div>';
		htmls += 	'<div>';
		htmls +=		'<a href="' + url + '" class="update" style="float: right;margin-top: 19px;margin-right: 5%;padding: 0 10px;height: 26px;background-color: #ffffff;border-radius: 4px;box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.34);font-size: 14px;text-align: center;line-height: 28px;color: #000;text-decoration: none;">';
		htmls += 			downloadbtn;
		htmls +=		'</a>';
		htmls +=	'</div>';
		htmls += '</div>';
		
		objs.append(htmls);
	}
})(Zepto);