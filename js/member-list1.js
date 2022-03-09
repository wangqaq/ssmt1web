$(function load() {
});
layui.use('table', function () {
    let table = layui.table,
        form = layui.form;
    //监听工具条
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            if (data.img != null) {
                openImg(data);
            } else {
                layer.msg("没有图片,给我加！！！！");
            }
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/api/user/delete", {id: data.id},1);
                if (res.code === 0) {
                    obj.del();
                    layer.close(index);
                    xadmin.reload(index);
                } else {
                    layer.msg("删除失败");
                }
            });
        } else if (obj.event === 'edit') {
            sessionStorage.setItem("userId", data.id);
            xadmin.open('编辑', 'member-edit.html', 800, 650);
        }

    });
    page();
    //模糊查询
    form.on('submit(search)',
        function (data) {
            page(data.field);
            return false;
        });

    //启用停用
    form.on('switch(enableDemo)', function () {
        let data = {
            id: this.value
        };
        let i = myAjax("/api/user/enable",data,'get',false);
        if (i.code===0){
            layer.msg("提交成功");
        }else{
            layer.msg(data.msg);
        }
    });
function refresh(){
    xadmin.father_reload()
}

    //批量删除
    $(".delAll_btn").click(function () {
        let checkStatus = table.checkStatus('userList'),
            data = checkStatus.data,
            userId = "";
        if (data.length > 0) {
            for (let i in data) {
                userId += data[i].id + ",";
            }
            console.log(userId);
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                let data = myAjax("/api/user/delAllUser", {ids: userId});
                if (data.code === 0) {
                    layer.msg(data.message);
                    layer.close(index);
                    setTimeout(refresh,2000);

                } else {
                    layer.msg(data.message);
                }
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    });

    //layui  end！
});

//查看图片
function openImg(data) {
    sessionStorage.setItem("picShow", data.img);
    xadmin.open("图片", '../pic.html', 400, 450);
}

function page(data) {
    layui.use('table', function () {
        let table = layui.table,
            form = layui.form;
        table.render({
            elem: '#test'
            , url: '/api/user/findAll'
            , method: 'get'
            , cellMinWidth: 80
            , where: data
            , page: true
            , id: "userList"
            , cols: [[
                {type: 'checkbox'}
                , {field: 'id', title: 'ID', sort: true}
                , {field: 'username', title: '用户名'}
                , {field: 'sex', title: '性别', sort: true}
                , {field: 'phone', title: '电话'}
                , {field: 'birthday', title: '生日', minWidth: 100, sort: true}
                , {field: 'hobby', title: '爱好', sort: true}
                , {
                    field: 'img', title: '图片',
                    templet: function (data) {
                        let html = "";
                        if (data.img != null) {
                            html = "<img alt='图片' src='" + data.img + "' style='height: 30px; width: 30px;' onclick='openImg()'/>";
                        } else {
                            html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
                        }
                        return html;
                    }
                }
                , {field: 'enable', title: '状态', templet: '#switchTpl', sort: true, width: 100}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
        });
    });
}