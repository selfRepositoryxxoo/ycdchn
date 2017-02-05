function ajax(options) {
    var _default = {
        data: '',
        url: '',
        async: true,
        success: null,
        type: 'get'
    };
    for(var key in  options){
        _default[key]=options[key];
    }
    var xhr = new XMLHttpRequest();
    xhr.open(_default.type, _default.url, _default.async);
    console.log(_default.url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var data = 'JSON'  in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");
            _default.success && _default.success(data)
        }
    };
    xhr.send()

}
