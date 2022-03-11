$(function (data) {
    let loginName = sessionStorage.getItem("loginName");
    if (loginName==null) {
    }
});

function myAjax(url, data, type, async) {
    let res = {};
    $.ajax({
        headers:{
            "Authorization":sessionStorage.getItem("tokenHeader")+" "+sessionStorage.getItem("access_token"),
        },
        url: url,
        type: type == null ? 'post' : 'get',
        data: data,
        async: async != null,
        dataType: 'json',
        success: function (data) {
            res = data;
            console.log(data);
        }
    });
    return res;
}