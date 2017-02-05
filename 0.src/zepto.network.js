/**
 * Created by lvlq on 15/7/2.
 */
(function ($) {
    $.network = function (requestConfig, global) {
        var config = {
            debug: true,
            random: false,
            isJson: false,
            develoment_url: ["", ""],
            product_url: ["", ""]
        };
        $.extend(config, global);
        var query = function (options, successCb, errorCb) {
            var develoment_url = config.develoment_url[0] + options.url + config.develoment_url[1];
            var product_url = config.product_url[0] + options.url + config.product_url[1];
            develoment_url = config.random ? develoment_url + "?query_random_v=" + Math.random() * 1000000 : develoment_url;
            product_url = config.random ? product_url + "?query_random_v=" + Math.random() * 1000000 : product_url;
            $.ajax({
                url: config.debug ? develoment_url : product_url,
                type: config.isJson ? "GET" : options.type || 'GET',
                data: options.data || {},
                contentType: options.contentType || 'application/x-www-form-urlencoded',
                dataType: options.dataType || '',
                timeout: options.timeout || 0,
                headers: options.headers || {},
                async: options.async || true,
                global: options.global || true,
                context: options.context || window,
                beforeSend: options.beforeSend || function (xhr, settings) {
                    config.debug && console.log(xhr);
                },
                success: options.success || function (data, status, xhr) {
                    successCb && successCb(data);
                },
                error: options.error || function (xhr, errorType, error) {
                    errorCb && errorCb();
                },
                complete: options.complete || function (xhr, status) {
                    config.debug && console.log(xhr);
                }
            });
        };
        var api = {};
        for (var key in requestConfig) {
            api.__defineGetter__(key, (function (index) {
                return function () {
                    return function (d, cb, errorCb) {
                        var options = requestConfig[index];
                        options.data = options.data || {};
                        $.extend(options.data, d);
                        query(options, cb, errorCb);
                    }
                }
            })(key));
        }
        return api;
    };
})(Zepto);