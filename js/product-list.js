layui.use(['table'], function () {
    var table = layui.table
        , form = layui.form;


    page({});
    //监听单元格事件
    table.on('tool(demo)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            if (data.imgHref != null) {
                let img = "../../front"+data.imgHref+"";
                sessionStorage.setItem("picShow", img);
                xadmin.open("图片", '../pic.html', 400, 450);
            } else {
                layer.msg("没有图片,给我加！！！！");
            }
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                let res = myAjax("/api/product/delete", {id: data.id});
                if (res.count === 1) {
                    obj.del();
                    layer.close(index);
                } else {
                    layui.msg("删除失败");
                }
            });
        } else if (obj.event === 'edit') {
            sessionStorage.setItem("id", data.id);
            xadmin.open('编辑', 'product-edit.html', 600, 400);
        }
    });
    //监听提交
    form.on('submit(sreach)',
        function (data) {
            data = data.field;
            //查询所有
            page(data);

            return false;
        });
    form.on('switch(enableDemo)', function (obj) {

        myAjax("/api/product/enable", {id: this.value});
    });
});

function page(data) {
    layui.use(['table'], function () {
        var table = layui.table
            , form = layui.form;
        table.render({
            elem: '#test'
            , url: '/api/product/findAll'
            , cellMinWidth: 80
            , where: data//传递到后台的值
            , cols: [[
                {field: 'id', title: 'ID', width: 100, unresize: true, sort: true}
                , {field: 'name', title: '产品名称'}
                , {field: 'normalPrice', title: '正常价'}
                ,  {
                    field: 'img', title: '图片', width: 130, style: 'height:100px;padding:0',
                    templet: function (data) {
                        console.log(data);
                        let html = "";
                        if (data.imgHref != null) {
                            html = "<img alt='图片' src='../front" + data.imgHref + "' style='height: 30px; width: 30px;' onclick=''/>";
                        } else {
                            html = "<i class=\"layui-icon layui-icon-face-cry\" style=\"font-size: 25px; color: #ff0008;\"></i>";
                        }
                        return html;
                    }
                }
                , {field: 'enable', title: '是否启用', width: 120, templet: '#switchTpl', unresize: true}
                , {fixed: 'right', title: '操作', width: 200, align: 'center', toolbar: '#barDemo'}
            ]]
            , page: true
        });
    });
}
