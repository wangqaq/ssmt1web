$(function () {
    $("#loginIndexName").html(sessionStorage.getItem("loginName"));
});
function loginOut() {
    sessionStorage.setItem("loginName","");
}