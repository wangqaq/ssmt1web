$(function serviceProject() {
    getServiceProject();
});
function getServiceProject() {
    $.ajax({
        url: '/front/serviceProject',
        data: {},
        type: 'post',
        dataType: 'json',
        success: function (data) {
            setservceProject(data.serviceProjectDetail);
        }
    });
}

function detail(data) {

    sessionStorage.setItem("id",data);
    window.location.href="/front/html/detail.html";
}
function setservceProject(data) {
    console.log(data);
    let html='';
    data.forEach(function (elem) {
        html+='              <div id="service-project-detail">\n' +
            '                    <a style="color: white" onclick="detail('+elem.id+')"><div><img src="..'+elem.img+'" alt=""></div>\n' +
            '                    <div>'+elem.serviceName+'</div>\n' +
            '                    <div>价格</div>\n' +
            '                    <div>'+elem.price+'</div></a>\n' +
            '                </div>';
    });
    $("#service-project").html(html);
}