var http = require('http');
var fs = require('fs');
var url = require('url');
var sv = http.createServer(function (request, response) {
    var objUrl = url.parse(request.url, true);
    var pathname = objUrl.pathname;
    //console.log(pathname)
    console.log(objUrl)
    var query = objUrl.query;
    var reg = /\.(HTML|CSS|JS)/i
    if (reg.test(pathname)) {
        try {
            var suffix = reg.exec(pathname)[1].toUpperCase();
            var type = 'text/plain';
            switch (suffix) {
                case 'HTML':
                    type = 'text/html';
                    break
                case 'CSS':
                    type = 'text/css';
                    break
                case 'JS':
                    type = 'text/javascript';
                    break
            }
            var con = fs.readFileSync('.' + pathname, 'utf8');//这个.加的原因是我们读取的需要当前目录的文件，假如不加的话会到这个这个文件的  通过fs.readfileAsync好像是可以得
            response.writeHead(200, {'content-type': type + ';charset=utf-8'});
            response.end(con)
        } catch (e) {
            response.writeHead(404, {'content-type': 'text/plain;charset=utf-8'});
            response.end()
        }

    }
//假如只需要看看有没有地址就可以  在浏览器中直接输入 http://localhost/getData?n=4
    //假如端口换了  就得改 是80的话就不用写了；
    //http://localhost:81/getData?n=4
    if (pathname == '/getData') {
        var n = query['n'] || 1;
        var ary = [];
        var allData = JSON.parse(fs.readFileSync('./jsondata.json', 'utf8'));
        //这边必须有等号
        for (var i = (n - 1) * 10; i <=n * 10 - 1; i++) {
         /*   //这边必须有-1；
            if (i > allData.length-1) {
                break
            }*/
            if(!allData[i]){
                break
            }
            ary.push(allData[i]);
        }
        var obj = {
            total: Math.ceil(allData.length),
            data: ary
        };
        console.log(obj);
        response.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        response.end(JSON.stringify(obj))
    }

});


sv.listen(81, function () {
    console.log('server is create success')
})
//只需要在浏览器中http://localhost:81/index.html