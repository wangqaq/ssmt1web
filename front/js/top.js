$(function navInf() {
    getNavInf();
});



function getNavInf() {
    $.ajax({
        url: '/front/top/navInf',
        data: {},
        type: 'post',
        dataType: 'json',
        success: function (data) {
            setNavInf(data.navList);
            setCompanyInf(data.logoPic);
        }
    });
}

function setNavInf(data) {
    let html = '';
    data.forEach(function (elem) {
        html += '<li class="layui-nav-item"><a href="' + elem.infLink + '">' + elem.infValue + '</a></li>';
    });
    $("#navInf").html(html);
}

function setCompanyInf(data) {
    let html = '';
        html += '<img src="..' + data.infValue + '" alt="" onclick="turnToIndex()">';
        $("#logoPic").html(html);
}
function turnToIndex() {
    window.location.href="index.html"
}

////////////////////////////////// 图片轮播
var index = 0;
//改变图片
var a = document.getElementsByClassName("img-slide");
a[1].style.display = "block";
for (var i = 1; i < a.length; i++) {
    a[i].style.display = "none"
}

function ChangeImg() {
    index++;
    var a = document.getElementsByClassName("img-slide");
    if (index >= a.length) index = 0;
    for (var i = 0; i < a.length; i++) {
        a[i].style.display = 'none';
    }
    a[index].style.display = 'block';
}

//设置定时器，每隔两秒切换一张图片
setInterval(ChangeImg, 2000);
