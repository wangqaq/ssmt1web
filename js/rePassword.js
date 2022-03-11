$(function () {
    layui.use(['form', 'layer'], function () {
        let form = layui.form;//得到form表单
        form.on('submit(rePassword)', function (data) {

            let username = data.field.username;
            $.ajax({
                url: '/api/auth/rePassword',
                data: JSON.stringify(data.field),
                contentType: "application/json;charset=UTF-8",
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.code === 401) {
                        layer.msg("验证码错误");
                    }
                    if (data.code === 400) {
                        layer.msg(data.message);
                    }if (data.code===1){
                        layer.msg(data.message);
                    }
                    if (data.code === 0) {
                        layer.msg('修改成功', function () {
                            location.href = 'index.html';
                        });
                    }
                }
            });
            return false;
        });
    });
});