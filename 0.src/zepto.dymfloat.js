/*大姨吗新版底部浮层可关闭*/
(function ($) {
	$.fn.dayimawave = function (options) {
		var objs = $(this);
		var settings = {
				'background'  : '#000',
				'downloadbtn' : '立即使用',
				'url'  		  : 'http://dayima.us/s/currentandroid',
				'iconImg'	  : 'http://cdn.yoloho.com/marketing_html5/images/dymicon.png',
				'closeImg'	  : 'http://cdn.yoloho.com/marketing_html5/images/float_close.png',
				'wordImg'	  : 'http://cdn.yoloho.com/marketing_html5/images/float_word.png',
				'jianceid'    : 'test'
		};	//options浅覆盖settings
		$.extend(settings, options);
		
		var htmls       = '';
		var background  = settings.background;
		var slogan      = settings.slogan;
		var downloadbtn = settings.downloadbtn;
		var url      = settings.url;
		
		
		htmls +='<div class="float-bar" style="width: 100%;position: fixed;bottom: 0;z-index:9999;opacity: 0.75;background:' + background + '">';
		htmls +='<div class="close" style="height: 28.5px;width: 28.5px;float: left;">';
		htmls +='<img style="width: 100%;height: 100%;" src="'+settings.closeImg+'" alt=""/>';
		htmls +='</div>';
		htmls +='<div style="height: 43.5px;width: 43.5px;float: left;margin: 5px 0 5px 2.5px;">';
		htmls +='<img style="width: 100%;height: 100%;" src="'+settings.iconImg+'" alt=""/>';
		htmls +='</div>';
		htmls +='<div style="height: 40.5px;width: 134px;float: left;margin: 6px 0 6px 7px;">';
		htmls +='<img style="width: 100%;height: 100%;" src="'+settings.wordImg+'" alt=""/>';
		htmls +='</div>';
		htmls +='<div>';
		htmls +=		'<a target="_blank" id="'+settings.jianceid+'" href="' + url + '" style="float: right;margin: 8.5px 10px 8.5px 14px;border: 2px solid #ff5fa7;border-radius: 5px;color: #ff5fa7;font-size: 14px;padding: 8px;text-decoration: none;">';
		htmls +=downloadbtn;
		htmls +='</a></div>';
		htmls += '<div style="clear:both;"></div>';
	    htmls +='</div>';
		
		objs.append(htmls);
		
		$(".float-bar .close").click(function(){
			$(".float-bar").css("display","none");
		});
	}
})(Zepto);