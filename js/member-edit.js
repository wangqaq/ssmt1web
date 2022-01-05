layui.use(['form', 'upload','layer', 'jquery', 'laydate','layedit'],
    function () {
        $ = layui.jquery;
        let form = layui.form
            , layer = layui.layer
            ,upload = layui.upload
            , laydate = layui.laydate,
            layedit = layui.layedit;

        layedit.set({
            //默认post
            uploadImage: {
                url: '/api/picture/upload/type=text/id='+sessionStorage.getItem("userId") //接口url
            }
        });
        //注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
         index=layedit.build('demo'); //建立编辑器
        //日期
        laydate.render({
            elem: '#birthday',
            trigger: 'click'
        });

        //监听提交
        form.on('submit(edit)',
            function (data) {
                data = data.field;
                let arr=[];
                $('input:checkbox[name=hobby]:checked').each(function() {
                    arr.push($(this).attr("title")) ;
                });
                data.hobby =arr.toLocaleString();
                data.id=sessionStorage.getItem("userId");
                data.text = layedit.getContent(index);
                let res = myAjax("/api/user/update", data);

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



        //常规使用 - 普通图片上传（头像）
        let uploadInst = upload.render({
            elem: '#uploadPic'
            ,url: '/api/picture/upload/type=avatar/id='+sessionStorage.getItem("userId")
            ,data:{userId:""+sessionStorage.getItem("userId")+""}
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, src){
                    $('#demo1').attr('src', src); //图片链接（base64）
                });
                layer.msg('上传中', {icon: 16, time: 0});
            }
            ,done: function(res){
                if(res.code !== 0){
                    return layer.msg('上传失败');
                }
                layer.msg("上传成功");
            }
            ,error: function(){
                let demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
            //进度条
            ,progress: function(n){
                element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
                if(n == 100){
                    layer.msg('上传完毕', {icon: 1});
                }
            }
        });
        $(function () {
            let id = sessionStorage.getItem("userId");
            let data = myAjax("/api/user/findById", {id: id}, 'get');
            console.log(data);
            if (data.code===0){
                setData(data.data);
                setText(data.data);
            }else{
                layer.msg("没有数据");
            }
        });
        function setText(data) {
            layedit.setContent(index,data.text);
        }
        function setData(data) {
            $("#username").val(data.username);
            $("#email").val(data.email);
            $("#birthday").val(data.birthday);
            $("#sex").val(data.sex);
            $("#phone").val(data.phone);
            $("#demo1").attr("src",""+data.img+"");
            let hobby = data.hobby;
            let arr = hobby.split(",");
            $('input:checkbox[name=hobby]').each(function () {
                for (let i = 0; i < arr.length; i++) {
                    if ($(this).attr("title") == arr[i]) {
                        $(this).attr("checked", true);
                    }
                }
            });
            $('input:radio[name=enable][value=' + data.enable + ']').attr("checked", true);
            layui.form.render();
        }
    });

