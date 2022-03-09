$(function () {
    $("#loginIndexName").html(sessionStorage.getItem("loginName"));
});
function loginOut() {
    sessionStorage.setItem("access_token","");
    sessionStorage.setItem("tokenHeader","");
}