layui.use('table', function () {
    let table = layui.table,
        form = layui.form;
    //监听工具条
    table.on('tool(demo)', function (obj) {
        let data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/api/mail/delete", {id: data.id});
                if (res.count === 1) {
                    obj.del();
                    layer.close(index);
                } else {
                    layui.msg("删除失败");
                }

            });
        } else if (obj.event === 'edit') {
            sessionStorage.setItem("id", data.id);
            xadmin.open('编辑', 'mail-edit.html', 800, 650);
        }
    });
    loadList();
    form.on('submit(search)',
        function (data) {
        console.log(data);
            loadList(data.field);
            return false;
        });
    form.on('switch(enableDemo)', function (obj) {
        console.log(this.value);
        myAjax("/api/mail/enable", {id: this.value},'get',false);
    });
});

function loadList(data){
    layui.use('table', function () {
        let table = layui.table;
        table.render({
            elem: '#test'
            , url: '/api/mail/findAll'
            , cellMinWidth: 80
            , where: data
            , page: true
            , cols: [[
                {field: 'id', width: 80, title: 'ID', sort: true},
                {field: 'email', width: 180, title: '邮箱地址'}
                , {field: 'title', width: 180, title: '标题'}
                , {field: 'detail', width: 250, title: '内容', sort: true}
                ,{field: 'publishTime', width: 145, title: '发布时间'}
                , {field: 'callBack', title: '回复', sort: true}
                ,{field: 'callBackTime', width: 145, title: '回复时间'}
                , {field: 'enable', title: '状态', templet: '#switchTpl',width:90}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
        });
    });
}

