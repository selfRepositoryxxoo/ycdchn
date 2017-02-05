function getRandom(n, m) {
    return Math.round(Math.random() * (m - n) + n)
}

var numfir = '赵钱孙李周吴郑王';
var numtwo = '一二三四五六七八九';


var ary = [];
for (var i = 1; i <= 86; i++) {
    var obj = {};
    obj['num'] = i < 10 ? '00' + i : '0' + i;
    obj['name']=numfir.charAt(getRandom(0,7))+numtwo.charAt(getRandom(0,9));
    obj['sex']=getRandom(0,1);
    obj['score']=getRandom(50,99)
    ary.push(obj)
}
console.log(JSON.stringify(ary))






