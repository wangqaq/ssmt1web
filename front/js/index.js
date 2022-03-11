$(function load() {
getServiceProject()
});
function getServiceProject() {
    $.ajax({
        url: '/front/indexInf',
        data: {},
        type: 'post',
        dataType: 'json',
        success: function (data) {
            setServiceProject(data.ServiceProject);
        }
    });
}
function detail(data) {
    sessionStorage.setItem("id",data.id);
}
function setServiceProject(data) {
    let html='';
    data.forEach(function (elem) {
        html+='            <div style="background-color: sandybrown;">' +
            '                <div><img src="..'+elem.img+'" alt=""></div>' +
            '                <div style="width: max-content;">' +
            '                    <div class="onbackletter">'+elem.onBackLetter+'</div>' +
            '                    <div class="servicename">'+elem.serviceName+'</div>' +
            '                    <div class="servicenglishname">'+elem.serviceEnglishName+'</div>' +
            '                    <div><a  onclick="detail(elem.id)"><input type="button" onclick="detail(elem.id)" value="MORE DETAILS"' +
            '                                class="layui-btn layui-btn-blue layui-btn layui-btn-lg"' +
            '                                style="width: 264px; margin-top: 30%;z-index: 1;"></a></div>' +
            '                </div>' +
            '            </div>';
        $("#serviceproject").html(html);
    });
    layui.use(['carousel', 'form'], function(){
        var carousel = layui.carousel
            ,form = layui.form;
        //图片轮播
        carousel.render({
            elem: '#test10'
            ,width: '500px'
            ,height: '200px'
            ,interval: 5000
        });
    })
}