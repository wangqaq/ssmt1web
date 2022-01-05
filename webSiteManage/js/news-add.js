layui.use(['layedit', 'upload', 'element', 'form', 'layer', 'jquery', 'laydate'],
    function () {
        $ = layui.jquery;
        let form = layui.form
            , element = layui.element
            , upload = layui.upload
            ,layer = layui.layer
        , layedit = layui.layedit;

        layedit.set({
            uploadImage: {
                url: '/upload' //接口url
                , type: '' //默认post
            }
        });
        let index = layedit.build('demo'); //建立编辑器

        //常规使用 - 普通图片上传
        var uploadInst = upload.render({
            elem: '#test1'
            , url: '/upload'//后台访问的地址，需要将文件传到服务器，
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                // 将上传的图片预览到下面的图片框
                obj.preview(function (index, file, result) {
                    $('#demo1').attr('src', result); //图片链接（base64）
                });

            }
            , done: function (res) {
                //如果上传失败
                if (res.code > 0) {
                    return layer.msg('上传失败');
                }

                sessionStorage.setItem("productImgHref", res.data.src);
                //上传成功的一些操作
                //……
            }


        });

        //监听提交
        form.on('submit(add)',
            function (data) {
                data = data.field;

                //发异步，把数据提交给java
                //提交之前，需要重新设置爱好
                //拿到复选框的所有的title的值

                data.imgHref = sessionStorage.getItem("productImgHref");
                data.content = layedit.getContent(index);


                let res = myAjax("/back/news/add", data);


                if (res != undefined && res.count == 1) {
                    layer.alert("增加成功", {
                            icon: 6
                        },
                        function () {
                            //关闭当前frame

                            xadmin.close();

                            // 可以对父窗口进行刷新
                            xadmin.father_reload();

                        });
                } else {
                    layer.alert("增加失败");
                }

                return false;
            });

    });


