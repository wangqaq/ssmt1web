layui.use('table', function () {
    let table = layui.table,
        form = layui.form;
    //监听工具条
    table.on('tool(demo)', function (obj) {
        let data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/api/nav/deleteCompany", {id: data.id});
                if (res.count === 1) {
                    obj.del();
                    layer.close(index);
                } else {
                    layui.msg("删除失败");
                }

            });
        } else if (obj.event === 'edit') {
            sessionStorage.setItem("navId", data.id);

            xadmin.open('编辑', 'navList-edit.html', 600, 400);
        }
    });
    table.render({
        elem: '#test'
        , url: '/api/nav/findAllCompany'
        , cellMinWidth: 80
        , page: true
        , cols: [[
            {field: 'id', width: 80, title: 'ID', sort: true},
            {field: 'infName', width: 180, title: '名称'}
            , {field: 'infValue', width: 180, title: '值'}
            , {field: 'infLink', width: 250, title: '链接', sort: true}
            , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
        ]]
    });
    form.on('switch(enableDemo)', function (obj) {
        console.log(this.value);
        myAjax("/api/nav/enable", {id: this.value});
    });
});

