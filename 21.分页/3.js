
var load=function(curr){
    $.ajax({
        type: 'post',
        url: '/audio-webapp/audioAlbum/list',
        data:{'pageNum':curr||1,'searchName':'test'},
        success:function(data){
            laypage({
                cont: 'biuuu_city',
                pages: data.pages,//这个是总页数
                jump: function(obj){//点击之后 回调
                    document.getElementById('edit_content_div').innerHTML = this.thisDate(data);
                    load(obj.curr)

                }
            });
        }
    })
}
load();