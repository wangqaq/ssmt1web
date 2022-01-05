layui.use(['form', 'upload','layer', 'jquery'],
    function () {
        $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            ,upload = layui.upload;

        //监听提交
        form.on('submit(edit)',
            function (data) {
                data = data.field;
                data.id=sessionStorage.getItem("id");
                let res = myAjax("/api/product/update", data);
                if (res != undefined && res.count == 1) {
                    layer.alert("更新成功", {
                            icon: 6
                        },
                        function () {
                            //关闭当前frame

                            xadmin.close();

                            // 可以对父窗口进行刷新
                            xadmin.father_reload();

                        });
                } else {
                    layer.alert("更新失败");
                }

                return false;
            });

    });
$(function () {
    let id = sessionStorage.getItem("id");
    let res = myAjax("/api/product/findById", {id: id}, 'get');
//   将查询出来的数据进行赋值填充
    setData(res.data);
});


layui.use(['form', 'upload','layer', 'jquery', 'laydate'],function () {
    $ = layui.jquery;
    let form = layui.form
        , layer = layui.layer
        ,upload = layui.upload;

    let uploadInst = upload.render({
        elem: '#uploadPic'
        ,url: '/upload'
        ,data:{id:""+sessionStorage.getItem("id")+""}
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, src){
                $('#demo1').attr('src', src); //图片链接（base64）
            });
            layer.msg('上传中', {icon: 16, time: 0});
        }
        ,done: function(res){
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            layer.msg("上传成功");
        }
        ,error: function(){
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
        //进度条
        ,progress: function(n, elem, e){
            element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
            if(n == 100){
                layer.msg('上传完毕', {icon: 1});
            }
        }
    });
});
//常规使用 - 普通图片上传


//赋值
function setData(data) {

    $("#infName").val(data.name);
    $("#infImg").val(data.imgHref);
    $("#infLink").val(data.infLink);
    $("#price").val(data.normalPrice);
    $("#textarea").val(data.detail);
    $('input:radio[name=enable][value=' + data.enable + ']').attr("checked", true);
    layui.form.render();

}
