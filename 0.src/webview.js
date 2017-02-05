// +--------------------------------------------------------------------------------------------
// | webview.js [ for xiaoerbi's html5 webview function ]
// +--------------------------------------------------------------------------------------------
// | v1.0.0 release  2016.06.22
// +--------------------------------------------------------------------------------------------
// | Copyright (c) 2016-2018 http://www.miaoqian.com All rights reserved.
// +--------------------------------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +--------------------------------------------------------------------------------------------
// | Author: xiaoerbi <tank@shicaidai.com><sqboytan@126.com>
// +--------------------------------------------------------------------------------------------
var webview = {}
    webview.connectWebViewJavascriptBridge = function(callback){
        if(window.WebViewJavascriptBridge){
            callback(WebViewJavascriptBridge);
        }else{
            document.addEventListener('WebViewJavascriptBridgeReady',function(){
                callback(WebViewJavascriptBridge);
            },false)
        }
    };
    //showdepositdetail  定期计划详情的js方法
    webview.showdepositdetail = function(mysubjectId,myproId){
        myproId = String(myproId);
        mysubjectId = String(mysubjectId);
        if($.os.ios==true){
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showdepositdetail', {'subjectId': mysubjectId,'prodId': myproId}, function(response) {});
            });
        }else if($.os.android==true){
            if(myproId==3){
                MIAOQIAN.startRegularEarn(mysubjectId);
            }else{
                MIAOQIAN.startRegularPlan(mysubjectId);
            }
        }else{
            alert('platform error');
        }
    }

    //登陆
    webview.login = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('login', {}, function (response) {});
            });
        }else if($.os.android==true){
            MIAOQIAN.login();
        }else{
            alert('platform error');
        }
    }


    //注册
    webview.register = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('register', {}, function(response) {});
            });
        }else if($.os.android==true){
            MIAOQIAN.register();
        }else{
            alert('platform error');
        }
    }

    //调取红包界面
    webview.red_bag = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showmywealthlist', {}, function (response) {});
            });
        }else if($.os.android==true){
            MIAOQIAN.startTicketActivity();
        }else{
            alert('platform error');
        }
    }

    //充值界面
    webview.rechange = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showrecharge', {}, function(response) {})
            });
        }else if($.os.android==true){
            MIAOQIAN.startIntoActivity();
        }else{
            alert('platform error');
        }
    }

    //定期首页
    webview.start_regular = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showdepositmain', {}, function(response) {});
            });
        }else if($.os.android==true){
            MIAOQIAN.startRegular();
        }else{
            alert('platform error');
        }
    }

    //活期首页
    webview.start_current = function(){
        if($.os.ios==true) {
            this.connectWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showcurrentmain', {}, function (response) {
                });
            });
        }else if($.os.android==true){
            MIAOQIAN.startCurrent();
        }else{
            alert('platform error');
        }
    }


