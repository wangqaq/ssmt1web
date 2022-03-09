$(function () {
    layui.use(['form', 'layer'], function () {
        let form = layui.form;//得到form表单
        form.on('submit(login)', function (data) {

            let username = data.field.username;
            $.ajax({
                url: '/api/auth/login',
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
                            layer.msg('登陆成功，即将跳转到后台管理页面', function () {
                                sessionStorage.setItem("loginName",username);
                                sessionStorage.setItem("tokenHeader",data.data.tokenHead);
                                sessionStorage.setItem("access_token",data.data.access_token);
                                location.href = 'index.html';
                            });
                        }
                }
            });
            return false;
        });
    });
});
function register(){
    window.location.href="../register.html"
}

function freshCode(obj) {
    let date = new Date();
    $(obj).attr("src", "api/code/checkCode?" + Math.random()*date.getMilliseconds());
}