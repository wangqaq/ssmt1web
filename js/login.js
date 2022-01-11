$(function () {
    layui.use(['form', 'layer'], function () {
        let form = layui.form;//得到form表单
        form.on('submit(login)', function (data) {

            let username = data.field.username;
            $.ajax({
                url: '/api/user/login',
                data: JSON.stringify(data.field),
                contentType: "application/json;charset=UTF-8",
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                        if (data.data === "codeErr") {
                            layer.msg("验证码错误");
                        }
                        if (data.data === "error") {
                            layer.msg("用户名或密码错误");
                        }if (data.code===1){
                            layer.msg(data.message);
                    }
                        if (data.data === "登陆成功") {
                            layer.msg('登陆成功，即将跳转到后台管理页面', function () {
                                sessionStorage.setItem("loginName",username);
                                location.href = 'index.html';
                            });
                        }
                }
            });
            return false;
        });
    });
});

function freshCode(obj) {
    let date = new Date();
    $(obj).attr("src", "api/code/checkCode?" + Math.random()*date.getMilliseconds());
}