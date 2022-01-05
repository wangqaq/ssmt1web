$(function footInf() {
    getFootCompanyInf();
});
function getFootCompanyInf() {
    $.ajax({
        url: '/front/foot',
        data: {},
        type: 'post',
        dataType: 'json',
        success: function (data) {
            setFootCompanyInf(data.companyModelList);
        }
    });
 function setFootCompanyInf(data) {
     let html='';
     html+='        <div class="picture">\n' +
         '            <div class="marginleft"><img src="..'+data.bottomLogo+'" alt=""></div>\n' +
         '            <div class="marginleft_1">\n' +
         '                <img src="..'+data.qr+'" alt="" width="95px">\n' +
         '            </div>\n' +
         '            <div class="marginleft">\n' +
         '                <div>订房热线</div>\n' +
         '                <div class="phonenumber">'+data.hotLine+'</div>\n' +
         '                <div>'+data.email+'</div>\n' +
         '                <div>地址：'+data.address+'</div>\n' +
         '            </div>\n' +
         '            <div class="marginleft">\n' +
         '                <div>cpoyright @ 2009-2015</div>\n' +
         '                <div><a href="index.html" style="color: blueviolet;">'+data.website+'</a></div>\n' +
         '            </div>\n' +
         '        </div>';
     $("#foot").html(html);
 }
}