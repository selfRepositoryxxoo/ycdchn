define(["./album_new", "../common/confirm"],
    function (AlbumNew, Confirm) {
        function Album(options) {
            this.init(options);
        }

        Album.prototype = {
            init: function (options) {

                this.options = options;
                this.album_new = new AlbumNew({host: this.options.host});
                //his.source_edit = new SourceEdit({host: this.options.host});
                this.confirm = new Confirm();
            },
            setOptions: function (options) {
                this.options = $.extend(this.options, options);
            },
            show: function () {
                $("div[data-sign=content]").hide();
                $("#content_album").show();
                this.initEvents();
                this.initTable();
            },
            initEvents: function () {
                var that = this;
                // 新增  这个按钮是专辑页的按钮
                $("#btn_album_new").off("click.album_new").on("click.album_new", function () {
                    that.opNew();
                });

                // 搜索 这也是专辑详情页的 获取所有的 input内容
                /* $("#btn_album_search").off("click.album_search").on("click.album_search", function () {
                 var searchParam = {};
                 //search_source_name也就是在页面中肯定有 搜索框的内容
                 $("#form_album_search").find("input[type=text]").each(function () {
                 searchParam[this.name] = $(this).val();
                 });
                 that.setOptions(searchParam);
                 that.initTable();
                 });*/
                // 修改事件注册（事件代理模式） 东西态度好像是无法使用table的
                $("#table_album tbody").off("click.op_album_edit").on("click.op_album_edit", "a[data-sign=op_album_edit]", function () {
                    var $op_product = $(this).closest("span[data-sign=op_source]");
                    that.opEdit({
                        id: $op_product.data("id")
                    });
                });
                // 启用停用
                /*   $("#table_source tbody").off("click.op_source_delete").on("click.op_source_delete", "a[data-sign=op_source_delete]", function () {
                 var $op_product = $(this).closest("span[data-sign=op_source]");
                 that.opDelete({
                 id: $op_product.data("id"),
                 name: $op_product.data("name")
                 });
                 });*/
            },
            getQueryParams: function () {
                return [
                    {name: "name", value: this.options.search_source_name}
                ];
            },
            initTable: function () {
                var edit = document.getElementById('edit_content_div')
                var that = this;
                var thisDate=function(curr){
                    $.ajax({
                        type: 'post',
                        url: '/audio-webapp/audioAlbum/list',
                        data:{'pageNum':curr,'pageSize','searchName':'test'},
                        success: function (data) {
                            //data 肯定是 一页显示的
                            //总共多少页
                            data.ye
                            data = data['data'];//data是总数据
                            var pagnum=10;
                            var pages=Math.ceil(data.length/pagnum)
                            //var pagnum=inputvalue||10
                            var str = '';
                            for (var i = 0; i < data.length; i++) {
                                var item = data[i];
                                str += '<div class="edit_content_div_all clear">\
                			<div class="edit_content_left">\
                            <div class="edit_div">\
                            <div class="edit_img"></div>\
                            </div>\
                            </div>\
                            <div class="edit_content_right">\
                            <form class="form-horizontal">\
                            <div class="form-group">\
                            <label for="" class="col-sm-2 label_self  control-label">专辑ID</label>\
                            <div class="col-sm-10 div_self">\
                            <span>' + item.id + '</span>\
                            </div>\
                            </div>\
                            <div class="form-group">\
                            <label for="" class="col-sm-2  label_self control-label">专题名</label>\
                            <div class="col-sm-10 div_self">\
                            <span class="span_block">' + item.name + '</span>\
                            <input style="display:none"  class="input_block" type="text" value=' + item.name + ' placeholder="" />\
                            </div>\
                            </div>\
                            <div class="form-group ">\
                            <label for="" class="col-sm-2  label_self control-label">来源</label>\
                            <div class="col-sm-10 div_self">\
                            <a href="javascript:;">' + item.source + '</a>\
                            </div>\
                            </div>\
                            <div class="form-group">\
                            <label for="" class="col-sm-2  label_self control-label">专题名</label>\
                            <div class="col-sm-10 div_self">\
                            <input type="text" placeholder="狼牙棒 电视原声带"/>\
                            <a href="javascript:;">链接艺人详情页</a>\
                            </div>\
                            </div>\
                    <div class="form-group">\
                            <label for="" class="col-sm-2  label_self control-label">播放平台</label>\
                            <div class="col-sm-10">\
                            <label class="radio-inline radio_self">\
                            <input type="radio" name="inlineRadioOptions" value="option3"> 手机\
                            </label>\
                            <label class="radio-inline radio_self">\
                            <input type="radio" name="inlineRadioOptions" value="option3"> 汽车\
                            </label>\
                            <a class="edit_enable" href="javascript:;">可修改</a>\
                            </div>\
                            </div>\
                            </form>\
                            </div>\
                            </div> ';
                            }
                           return str
                        }
                    })
                };
                //这是渲染页面

                laypage({
                    cont: 'biuuu_city',
                    pages: pages,//这个是总页数
                    jump: function(obj){//点击之后 回调
                        document.getElementById('edit_content_div').innerHTML = thisDate(obj.curr);
                    }
                });
            },
            refreshTable: function () {
                if (this.dataTable) {
                    this.dataTable.fnDraw();
                } else {
                    this.initTable();
                }
            },
            opNew: function () {
                var that = this;
                this.album_new.setOptions({
                    callback_btnSave: function () {
                        that.show();
                    }
                });
                this.album_new.show();
            },
            //编辑页面先停停停
            /*opEdit: function (data) {
             var that = this;
             this.source_edit.setOptions({
             id: data.id,
             callback_btnSave: function () {
             that.show();
             }
             });
             this.source_edit.show();
             },*/
            /* 这个页面不存在删除吧
             *   opDelete: function (data) {
             var that = this;
             this.confirm.show({info: data.name}, function () {
             $.ajax({
             url: '/lms/source/deleteById/' + data.id ,
             type: 'DELETE',
             success: function(data) {
             if (data.code == "0") {
             that.initTable();
             $.gritter.add({title: "提示信息：", text: "删除成功！", time: 1000});
             }else {
             $.gritter.add({title: "提示信息：", text: data.message, time: 2000});
             }
             }
             });
             });
             }*/
        };
        return Album;
    });
////这是tag点击消失的

$('#popular_second_2').css({
    "width": "60px"
});
$('#popular_third_3').css({
    "width": "60px"
});
$('#popular_first_1').css({
    "width": "60px"
});
$('.hit_block').on('click', function () {
    $(this).css({
        "display": 'none'
    });
    $(this).prev().css({
        "display": 'none'
    })

})