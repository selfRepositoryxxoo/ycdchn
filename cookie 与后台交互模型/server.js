

var http=require('http');
var url=require('url');
var fs=require('fs');
var sv=http.createServer(function(req,res){
        var urlObj=url.parse(req.url,true);
        var pathname=urlObj.pathname;
        var query=urlObj.query;
    var reg=/\.(HTML|CSS|js)/i;
    if(reg.test(pathname)){
        try{
            var suffix=reg.exec(pathname)[1].toUpperCase();
            var suffixType="text/plain"
            switch (suffix){
                case "HTML":
                    suffixType="text/html";
                    break;
                case "CSS":
                    suffixType="text/css";
                    break;
                case "JS":
                    suffixType="text/javascript";
                    break
            }
            var conFile=fs.readFileSync("."+pathname,"utf8")
            res.writeHead(200,{"content-type":suffixType+";charset=utf-8"});
            res.end(conFile);
        }catch(e){
            res.writeHead(404);
            res.end(null);
        }

    }
    if(pathname=="/getData"){
        var str="";
        req.addListener('data',function(data){
            str+=data;
        });
        req.addListener('end',function(){
           var jsonData=JSON.parse(str);
            var con=fs.readFileSync("data.json","utf8");
            con=JSON.parse(con);
            console.log(jsonData);
            con=con[0];
            console.log(con)
            var name=jsonData['name'];
            var mima=jsonData['mima'];
            if(name==con.name&&mima==con.mima){
                res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
                res.end(JSON.stringify(con.data));
            }else if(name==con.name){
                res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
                res.end(JSON.stringify({'code':'密码错误'}));
            }
            else if(mima==con.mima){
                res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
                res.end(JSON.stringify({'code':'账户错误'}));
            }else{
                res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
                res.end(JSON.stringify({'code':'信息错误'}));
            }
        })
    }
});
sv.listen(5678,function(){
    console.log("success")
});