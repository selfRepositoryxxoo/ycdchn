/*大姨吗新版底部浮层可关闭*/
(function ($) {
    $.fn.dayimawave = function (options) {
        var objs = $(this);
        var settings = {
            'background': '#000',
            'downloadbtn': '立即使用',
            'url': 'http://dayima.us/s/currentandroid',
            'iconImg': 'http://cdn.yoloho.com/marketing_html5/images/dymicon.png',
            'closeImg': 'http://cdn.yoloho.com/marketing_html5/images/float_close.png',
            'wordImg': 'http://cdn.yoloho.com/marketing_html5/images/float_word.png',
            'jianceid': 'test'
        };	//options浅覆盖settings
        $.extend(settings, options);

        var htmls = '';
        var background = settings.background;
        var slogan = settings.slogan;
        var downloadbtn = settings.downloadbtn;
        var url = settings.url;


        htmls += '<div class="float-bar" style="width: 100%;position: fixed;bottom: 0;z-index:9999;opacity: 0.75;background:' + background + '">';
        htmls += '<div class="close" style="height: 0.890625rem;width: 0.890625rem;float: left;">';
        htmls += '<img style="width: 100%;height: 100%;" src="' + settings.closeImg + '" alt=""/>';
        htmls += '</div>';
        htmls += '<div style="height: 1.359375rem;width: 1.359375rem;float: left;margin: 0.15625rem 0 0.15625rem 0.078625rem;">';
        htmls += '<img style="width: 100%;height: 100%;" src="' + settings.iconImg + '" alt=""/>';
        htmls += '</div>';
        htmls += '<div style="height: 1.265625rem;width: 4.1875rem;float: left;margin: 0.1875rem 0 0.1875rem 0.21875rem;">';
        htmls += '<img style="width: 100%;height: 100%;" src="' + settings.wordImg + '" alt=""/>';
        htmls += '</div>';
        htmls += '<div>';
        htmls += '<a target="_blank" id="' + settings.jianceid + '" href="' + url + '" style="float: right;margin: 0.265625rem 0.3125rem 0.265625rem 0.4375rem;border: 0.0625rem solid #ff5fa7;border-radius: 0.15625rem;color: #ff5fa7;font-size: 0.4375rem;padding: 0.25rem;text-decoration: none;">';
        htmls += downloadbtn;
        htmls += '</a></div>';
        htmls += '<div style="clear:both;"></div>';
        htmls += '</div>';

        objs.append(htmls);

        $(".float-bar .close").click(function () {
            $(".float-bar").css("display", "none");
        });
    }
})(Zepto);