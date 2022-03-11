$(function () {
    layui.use(['form', 'layer'], function () {
        let form = layui.form;//得到form表单
        form.on('submit(sub)', function (data) {
            console.log(data);
            $.ajax({
                url: '/api/auth/register',
                data: JSON.stringify(data.field),
                contentType: "application/json;charset=UTF-8",
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.code === 400) {
                        layer.msg(data.message);
                    }if (data.code===1){
                        layer.msg(data.message);
                        layer.msg("重复用户名")
                    }
                    if (data.code === 0) {
                        layer.msg('注册成功');
                    }
                }
            });
            return false;
        });
    });
});