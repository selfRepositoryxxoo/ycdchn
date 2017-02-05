<%@ page contentType="text/html;charset=utf-8" language="java" %>
    <%@ include file="/WEB-INF/views/common/taglibs.jsp" %>

        <!-- BEGIN HEAD -->
    <head>
    <title>专辑列表页</title>
        <!-- BEGIN PAGE LEVEL STYLES -->
    <link rel="stylesheet" type="text/css" href="${ctx}/static/lib/jquery.dataTables/css/DT_bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/lib/jquery.gritter/jquery.gritter.css"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/lib/toggle.buttons/bootstrap-toggle-buttons.css"/>
    <link rel="stylesheet" type="text/css" href="${ctx}/static/lib/bootstrap.modal/bootstrap-modal.css"/>
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script type="text/javascript" src="${ctx}/static/lib/jquery.dataTables/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/backdone/underscore-min.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/jquery.gritter/jquery.gritter.js"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script type="text/javascript" src="${ctx}/static/lib/jquery.dataTables/js/DT_bootstrap.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/jquery.validation/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/toggle.buttons/jquery.toggle.buttons.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/uploadify/js/jquery.uploadify.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/backdone/underscore-min.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/bootstrap.modal/bootstrap-modal.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/bootstrap.modal/bootstrap-modalmanager.js"></script>
    <script type="text/javascript" src="${ctx}/static/lib/require/require.js"></script>
    <script type="text/javascript" src="${ctx}/static/js/app.js"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
    <script type="text/javascript">
    jQuery(function () {
        App.init();
        // 因jsp冲突，将模板匹配字符改为{{}}
        _.templateSettings = {
            evaluate: /\{\{([\s\S]+?)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            escape: /\{\{-([\s\S]+?)\}\}/g
        };

        require.config({
            baseUrl: "${ctx}/static/",
            paths: {'jquery': 'js/jquery-1.10.1.min'},
            shim: {}
        });

        require(['album/album'], function (Album) {

            var album = new Album({
                host: "${ctx}"
            });

            album.show();
        });

    });

</script>
<script type="text/javascript">

    </script>
    <script id="temp_op" type="text/template">
    <span data-sign="{{=sign}}" data-id="{{=id}}" data-name="{{=name}}">
    {{ _.each(ops, function(op){ }}
<a href="javascript:void(0);" class="btn mini {{=op.color}}" data-sign="{{=op.sign}}" data-id="{{=op.id}}"
data-name="{{=op.name}}">{{=op.btnName}}</a>
{{ }); }}
</span>
</script>
</head>


    <!-- BEGIN PAGE CONTAINER-->
<div class="container-fluid">
        <!-- BEGIN PAGE HEADER-->

    <div class="row-fluid">
        <!-- BEGIN PAGE TITLE & BREADCRUMB-->
    <h3 class="page-title">
    <small></small>
    </h3>
        <!-- END PAGE TITLE & BREADCRUMB-->
    </div>
        <!-- END PAGE HEADER-->

        <!-- 模板列表-->
    <div id="contentList" class="row-fluid">
    <div id="content_album" data-sign="content" class="span12">

        <!-- 搜索栏开始 -->
    <div class="edit" id='form_album_search'>
    <select class="length_self  album_name_type" name="" >
    <option value="0">名称</option>
    <option value="1">ID</option>
    </select>
    <input type="text" class="length_self name_type_value" name='name' value=''/>
    <span> 艺人</span>
    <input type="text" class="length_self artist_value" name='name' placeholder="艺人名称"/>
    <span>标签 :</span>
<input type="text" class="length_self tag_value" name='name' placeholder="标签"/>
    <select  class="length_self album_name_cid" name="" >
    <option value="">所属频道</option>
    <option value="42">乐听</option>
    <option value="9">音乐</soption>
    <option value="49">乐小宝</option>
    <option value="43">铃声</option>
    </select>
    <select id='' class="length_self album_sourceId" name="" >
    <option value="-1">来源</option>
    <option value="Xiami">虾米</option>
    <option value="QQ">QQ</option>
    <option value="Duoting">多听</option>
    <option value="Kaola">考拉</option>
    <option value="Tingting">听听</option>
    <option value="TingToutiao">听头条</option>
    <option value="Ximalaya">喜马拉雅</option>
    </select>
    <a id='btn_album_search' class=" color margin_self btn btn-default" href="javascript:;" role="button">搜索专辑</a>
    <a id=btn_album_new class=" color margin_self btn btn-default" href="javascript:;" role="button">新建专辑</a>
    <a id='btn_grab_album' class=" color margin_self btn btn-default" href="javascript:;" role="button">专辑抓取</a>
    <span>排序方式</span>
    <select class="length_self time" name="" >
    <option value="0">录入时间</option>
    <option value="1">修改时间</option>
    </select>
    <select class="length_self order" name="" >
    <option value="0">倒序</option>
    <option value="1">顺序</option>
    </select>
    </div>
        <!-- 搜索栏结束 -->

        <!-- 列表页开始 -->
    <div id='edit_content_div'>

    </div>
    <div id="biuuu_city">

    </div>




    </div>
        <!-- 列表页结束 -->
    </div>

        <!-- 模板列表结束-->


        <!-- 模板编辑  模板 -->
    <div id="content_album_edit" data-sign="content" class="span12" style="margin-left: 0px;">
    <div class="portlet box blue">
    <div id="div_album_edit" class="portlet-body form" style="min-height: 600px;">
        <!--这是编辑的   -->


    </div>
    </div>
    </div>
        <!-- 模板编辑结束 -->


    </div>








