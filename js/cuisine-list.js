$(function () {
    findCuisineList();
});

function findCuisineList() {
    let res = myAjax("/back/cuisine/findAll", {enable: 1}, 'get');
//    需要对select赋值
    setCuisineList(res.data);
}

function setCuisineList(data) {
    layui.use(['form', 'layer', 'jquery', 'laydate'],
        function () {
            $ = layui.jquery;
            var form = layui.form;
            let html = '';
            for (let i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
            }
            $("#cuisine").html(html);

            form.render();
        });
}