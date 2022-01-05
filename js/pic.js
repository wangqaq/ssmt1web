$(function () {
    let html="";
    let pic = sessionStorage.getItem("picShow");
    html+="<img src='"+pic+"' alt='' width='100%' height='100%'>";
    $("#showPic").html(html);
});