var pageCon = document.getElementById("pageCon");
var pageList = document.getElementById("pageList");
var lis = pageList.getElementsByTagName('li');
var search = document.getElementById('search');
var boxbtn = document.getElementById("boxbtn");
var n = 1,
    total = 0;
var firstpage=0;
bindData();
function bindData() {
    ajax({
        url: 'getData?n=' + n + "&_=" + Math.random(),
        success: callback
    });
    function callback(jsondata) {
        if (!jsondata) {
            return
        }
        total = Math.ceil(jsondata['total']);
        var data = jsondata['data'];
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<li>\
                <span>' + curData["num"] + '</span>\
                <span>' + curData["name"] + '</span>\
                <span>' + (curData["sex"] === 0 ? "男" : "女") + '</span>\
                <span>' + curData["score"] + '</span>\
                </li>'
        }
        pageCon.innerHTML = str;
        var str1 = '';
        total=Math.ceil(total/10);
       for(var i=1;i<=total;i++){
           str1+='<li>'+i+'</li>'
       }
        pageList.innerHTML = str1;

        for( i=firstpage-1;i<=firstpage+10;i++){
            $(lis[i]).show()
        }
        for( i=0;i<firstpage-1;i++){
            $(lis[i]).hide()
        }
        for( i=firstpage+10;i<total;i++){
            $(lis[i]).hide()
        }
        for (var k = 0; k < lis.length; k++) {
            //为什么不能是绝对===  运行的时候是n是string存在的 但是k+1是number存在的
            lis[k].className = (k + 1) == n ? 'bg' : null;

        }
        search.value = n;
    }
}
boxbtn.onclick = function (e) {
    console.log(total);
    e = e || window.event;
    var tar = e.target || e.srcElement;
    var tagName = tar.tagName.toUpperCase();
    if (tagName === "SPAN") {
        if (tar.innerHTML === 'FIRS') {
            if (n === 1) {
                return
            }
            n = 1;
            firstpage=1;
        }
        if (tar.innerHTML === 'LAST') {
            if (n ==total) {
                return
            }
            console.log(total);
            n = total;
            firstpage=total-7;

        }
        if (tar.innerHTML === 'PREV') {
            if (n == 1) {
                return
            }
            n--;
            if(n>firstpage+6){
                firstpage=n
            }
            if(n<firstpage+2){
                firstpage=n
            }
        }
        if (tar.innerHTML === 'NEXT') {
            if (n === total) {
                return
            }
            n++;
            if(n>firstpage+6){
                firstpage=n
            }
            if(n<firstpage+2){
                firstpage=n
            }
        }
    }
    if (tagName === 'LI') {
        if (tar.innerHTML == n) {
            return
        }
     /*   n = tar.innerHTML//按道理这个位置应该有parsefloat 这样的话传出的n是number类型的
        否则的话传出的是string，这就是为什么上面不能使用===的原因*/
        n =parseFloat( tar.innerHTML);//这样上面就可以使用===了
        if(n>firstpage+7){
            firstpage=n
        }
        if(n<firstpage+2){
            firstpage=n-2
        }
    }
    bindData()
};
search.onkeyup=function(e){
    e=e||window.event;
    if(e.keyCode==13){
        var val=parseFloat(search.value);
        if(val==n){
            return
        }
        if(val<1){
            search.value=1;
            n=1;
        } else if(val>total){
            search.value=total;
            n=total;
        }else{
            n=val;
            firstpage=val-3;
        }
        bindData()
    }
};


if(typeof value =='Number'){

}


