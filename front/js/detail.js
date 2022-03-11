$(function load() {
    getDetail()
});

function getDetail(data) {
    let i = sessionStorage.getItem("id");
    console.log(i);
    let res = myAjax("/front/product/FindById", {id: i}, "get");
    setData(res.data);
}

function getback() {
    window.location.href = "/front/html/serviceproject.html"
}

function setData(data) {
    let html = '';
    html += '    <div>\n' +
        '        <div>' + data.name + '</div>\n' +
        '        <div>' + data.detail + '</div>\n' +
        '        <img src="..' + data.imgHref + '" alt="">\n' +
        '<button type="button" class="layui-btn layui-btn-primary" onclick="getback()">返回</button>' +
        '<button type="button" class="layui-btn layui-btn-primary" onclick="findLast()">上一个</button>' +
        '<button type="button" class="layui-btn layui-btn-primary" onclick="findNext()">下一个</button>' +
        '    </div>';
    $("#detail").html(html);
}

function findNext() {
    let m = myAjax("/front/product/findNext", {id: sessionStorage.getItem("id")}, "get");
    console.log(m);
    sessionStorage.setItem("id", m.data.id);
    getDetail();
}

function findLast() {
    let i = myAjax("/front/product/findLast", {id: sessionStorage.getItem("id")}, "get");
    console.log(i);
    sessionStorage.setItem("id", i.data.id);
    getDetail();
}
