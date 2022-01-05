layui.use(['layedit', 'form', 'jquery', 'layer', 'upload'], function () {
    let layedit = layui.layedit,
        form = layui.form
        , layer = layui.layer
        , upload = layui.upload;
    layedit.set({
        uploadImage: {
            url: '/upload' //接口url
            , type: '' //默认post
        }
    });
    //注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
    layedit.build('demo', {
        tool: ['left', 'center', 'right', '|', 'face', 'image', 'link', 'help']
    });


    form.on('submit(submit)',
        function (data) {
            let email = data.field.email;
            let content = layedit.getContent(index);
            let res= null;
            if (content!==null && email!==null) {
                let i ={email:email,content:content};
                res = myAjax("/front/text", i);
            }
            if (res !== undefined && res.count === 1) {
                layer.alert("更新成功");
            } else {
                layer.alert("更新失败");
            }
            return false;
        });
});