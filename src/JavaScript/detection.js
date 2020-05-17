$(document).ready(function () {
    $.post("../PHP/detection.php",function (status) {
        if (status=="游客"){
            $(".dropdown-toggle").text("登录");
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./Login.html");
                return true;
            })
            $(".dropdown-menu").hide();
        }
    })
})