//->导入三个常用的内置模块
var http = require("http"),
    url = require("url"),
    fs = require("fs");

//->创建服务
var sv = http.createServer(function (req, res) {
    //->1)解析客户端请求的信息
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
        console.log(pathname)

    //->2)处理资源文件的请求
    var reg = /\.(HTML|CSS|JS)/i;
    if (reg.test(pathname)) {
        try {
            //->2.1:获取资源文件的后缀名，并且根据后缀名计算出其MIME类型
            var suffix = reg.exec(pathname)[1].toUpperCase();
            var suffixType = "text/plain";
            switch (suffix) {
                case "HTML":
                    suffixType = "text/html";
                    break;
                case "CSS":
                    suffixType = "text/css";
                    break;
                case "JS":
                    suffixType = "text/javascript";
                    break;
            }

            //->2.2:根据pathname读取出对应文件中的代码,并且返回给客户端进行渲染
            var conFile = fs.readFileSync("." + pathname, "utf8");
            res.writeHead(200, {'content-type': suffixType + ";charset=utf-8;"});
            res.end(conFile);
        } catch (e) {
            //->2.3:如果请求的资源文件不存在,我们返回404
            res.writeHead(404);
            res.end();
        }
    }
});

//->监听80端口
sv.listen(7777, function () {
    console.log("server is create success,listen on 8888 port!");
});
