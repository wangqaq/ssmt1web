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
                let res = myAjax("/api/user/delete", {id: data.id});
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
            xadmin.open('编辑', 'member-edit.html', 600, 400);
        }

    });
    page();
    form.on('submit(search)',
        function (data) {
            page(data.field);
            return false;
        });

    form.on('switch(enableDemo)', function () {
        let data={
            id:this.value
        };

        $.ajax({
            url: "/api/user/enable",
            type: 'get',
            data: data,
            // async: false,
            dataType: 'json',
            success: function (data) {
            }
        });
    });

});
function openImg(data){
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
            , cols: [[
                {field: 'id', width: 80, title: 'ID', sort: true}
                , {field: 'username', width: 180, title: '用户名'}
                , {field: 'sex', width: 80, title: '性别', sort: true}
                , {field: 'phone', width: 150, title: '电话'}
                , {field: 'birthday', title: '生日', width: 180, minWidth: 100, sort: true}
                , {field: 'hobby', title: '爱好', sort: true}
                , {
                    field: 'img', title: '图片', width: 130, style: 'height:100px;padding:0',
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
                , {field: 'enable', title: '状态', templet: '#switchTpl', sort: true}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
        });
    });
}