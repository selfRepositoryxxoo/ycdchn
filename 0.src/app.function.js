/**
 * Created by lvlq on 16/3/9.
 *
 * is_login 是全局登录状态标识
 *
 * 一级页面进入
 * set_userinfo 方法自动调用,方法调用后台接口进行登录验证
 * uid,token是通过set_userinfo方法获取
 * d_token通过php写在页面的input中
 *
 * 二级页面进入
 * 方式一:
 * uid,token,d_token通过php写在页面中
 * 手动构造set_userinfo 方法参数,并进行调用
 *
 * 方式二:
 * uid,token,d_token作为url的参数传入页面
 * 手动构造set_userinfo 方法参数,并进行调用
 *
 * 注意:
 * 二级页面进入,set_userinfo 方法参数是json的字符串(JSON.stringify转换)
 */

var uid = $("#uid").val() || getQueryString("uid"),
    token = $("#token").val(),
    d_token = $("#d_token").val() || getQueryString("token"),
    is_login = false,
    set_userinfo_flag = false;

var set_userinfo = function (userinfo) {
    if (typeof userinfo == "string")
        userinfo = JSON.parse(userinfo);
    uid = uid || userinfo.uid;
    token = token || userinfo.token;
    d_token = d_token || userinfo.d_token;

    if (!uid || !d_token) {
        return;
    }

    if (set_userinfo_flag == true) return;
    set_userinfo_flag = true;

    $.Event('set_userinfo:do', {bubbles: false});
    $(document).trigger('set_userinfo:do');

    $.ajax({
        url: "/index.php/Common/set_userinfo",
        type: "POST",
        data: {
            uid: uid,
            token: token,
            d_token: d_token
        },
        dataType: "json",
        success: function (data) {
            if (!data.errno) {
                is_login = true;
                $.Event('set_userinfo:success', {bubbles: false});
                $(document).trigger('set_userinfo:success');
            } else {
                $.Event('set_userinfo:error', {bubbles: false});
                $(document).trigger('set_userinfo:error');
            }
        },
        error: function () {
            $.Event('set_userinfo:error', {bubbles: false});
            $(document).trigger('set_userinfo:error');
        }
    });
};

if (uid && d_token) {
    set_userinfo(JSON.stringify({
        uid: uid,
        token: token,
        d_token: d_token
    }));
}