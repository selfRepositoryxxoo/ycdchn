var text=document.getElementById('text')
var pas=document.getElementById('pas')
var btn=document.getElementById('btn')
var shop=document.getElementById('shop')

var val=text.value;
var pasval=pas.value;
var A=cookie.get('name');
var B=cookie.get('mima');
console.log(A);
console.log(B);
if(A){
    text.value=A;
}else{
    cookie.set("name",val);
}
if(B){
    pas.value=B;
}else{
    cookie.set("mima",pasval);
}
val=text.value;
pasval=pas.value;


text.onkeyup=function(){
    val=text.value;
    if(val){
        console.log(1)
        text.style.borderColor="#eee";
    }

};
pas.onkeyup=function(){
    pasval=pas.value;
    if(pasval){
        pas.style.borderColor="#eee";
    }
};



btn.onclick=function(){

    if(val&&pasval){
        var data={
            name:val,
            mima:pasval
        };

    }else if((!val)&&pasval){
        text.style.borderColor="red";
        shop.innerHTML=""
        console.log(1)
        return
    }else if(val&&(!pasval)){
        pas.style.borderColor="red";
        shop.innerHTML=""
        console.log(2)
        return
    }else{
        shop.innerHTML=""
        alert("请输入信息")
        return
    }
    find(data);
};


function find(data){
    var xhr=new XMLHttpRequest();
    xhr.open("post","/getData",true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            var jsonData=JSON.parse(xhr.responseText);
            console.log(jsonData);
            if(typeof jsonData=="object"){

                shop.innerHTML="";
                alert(jsonData.code);
                return

            }

             shop.innerHTML=jsonData

        }
    }
    xhr.send(JSON.stringify(data))
}