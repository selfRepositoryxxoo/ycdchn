$(window).scroll(function(){
    var _top = $(window).scrollTop();
    if(_top>300){
        $('.lanrenzhijia_top_new').fadeIn(600);
    }else{
        $('.lanrenzhijia_top_new').fadeOut(600);
    }
});
$(".lanrenzhijia_top_new").click(function(){
    $("html,body").animate({scrollTop:0},500);
});
