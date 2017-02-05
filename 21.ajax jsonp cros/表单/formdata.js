function encodeFormData(data) {
    if (!data) return '';
    var arr = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        var value = data[name] + '';
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        arr.push(name + '=' + value);
    }
    return arr.join('&');
}
http.serialize = function (form) {
    var parts = [], optValue = "";
    each(form.elements, function (ele) {
        switch (ele.type) {
            case 'select-one':
            case 'select-multiple':
                if (ele.name) {
                    each(ele.options, function (option) {
                        if (option.selected) {
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(ele.name) + "=" + encodeURIComponent(optValue));
                        }
                    })
                }
                break;
            case undefined:
            case 'submit':
            case 'reset':
            case 'button':
            case 'file':
                break;
            case 'radio':
            case 'checkbox':
                if (!ele.checked) {
                    break;
                }
            default :
                if (ele.name) {
                    parts.push(encodeURIComponent(ele.name) + "=" + encodeURIComponent(ele.value));
                }
        }
    });
    return parts.join('&');
}
//给表单注册onsubmit事件。当提交时就序列化表单数据并发送给服务器
document.forms[0].onsubmit = function () {
    $http.get('/serialize', $http.serialize(this), function (res) {
        console.log(res);
    });
    //阻止默认行为
    return false;
};