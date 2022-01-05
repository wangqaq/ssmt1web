layui.use('table', function () {
    let table = layui.table,
        form = layui.form;
    //监听工具条
    table.on('tool(demo)', function (obj) {
        let data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/back/news/delete", {id: data.id});
                if (res.count === 1) {
                    obj.del();
                    layer.close(index);
                } else {
                    layui.msg("删除失败");
                }

            });
        } else if (obj.event === 'edit') {
            sessionStorage.setItem("id", data.id);

            xadmin.open('编辑', 'news-edit.html', 600, 400);
        }
    });
    table.render({
        elem: '#test'
        , url: '/back/news/findAll'
        , cellMinWidth: 80
        , page: true
        , cols: [[
            {field: 'id', width: 80, title: 'ID', sort: true},
            {field: 'name', width: 180, title: '名称'}
            , {field: 'englishName', width: 180, title: '值'}
            , {field: 'type', width: 250, title: '链接', sort: true}
            ,{field:'detail',width:250,title:'细节',sort:true}
            , {
                field: 'img', title: '图片', width: 130, style: 'height:100px;padding:0',
                templet: function (data) {
                    let html = "";
                    if (data.img != null) {
                        html = "<img alt='图片' src='../../../front" + data.img + "' style='height: 30px; width: 30px;' onclick=''/>";
                    } else {
                        html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
                    }
                    return html;
                }
            }
            , {field: 'enable', title: '状态', templet: '#switchTpl'}
            , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
        ]]
    });
    form.on('switch(enableDemo)', function (obj) {
        console.log(this.value);
        myAjax("/back/news/enable", {id: this.value});
    });
});

