$(document).ready(function(){
    $.post("./src/PHP/detection.php",function (status) {
        if (status=="游客"){
            $(".dropdown-toggle").text("登录");
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./src/HTML/Login.html");
                return true;
            })
            $(".dropdown-menu").hide();
        }
    })
    $.get("src/PHP/init-Homepage.php",function(data){
        let arr = eval(data);
        for(let i = 0;i<arr.length;i++){
            let select = ".display"+i;
            $(select).css("display","block");
            $(select+" div.img").css("background-image","url(\"images/travel-images/large/"+arr[i]["PATH"]+"\")");
            $(select+" h4").html(arr[i]["Title"]);
            if (!arr[i]["Description"])
                $(select+" p").html("This guy is lazy so he write nothing.");
            else
                $(select+" p").html(arr[i]["Description"]);
        }
    })
    $("#refresh").click(function () {
        $.get("src/PHP/refresh.php",function(data){
            let arr = eval(data);
            for(let i = 0;i<arr.length;i++){
                let select = ".display"+i;
                $(select).css("display","block");
                $(select+" div.img").css("background-image","url(\"images/travel-images/large/"+arr[i]["PATH"]+"\")");
                $(select+" h4").html(arr[i]["Title"]);
                if (!arr[i]["Description"])
                    $(select+" p").html("This guy is lazy so he write nothing.");
                else
                    $(select+" p").html(arr[i]["Description"]);
            }
        })
    })
    $(".img").click(function () {
        let str = $(this).css("background-image");
        let start = str.lastIndexOf("/")+1;
        let url = 'src/HTML/Details.html?url='+str.substring(start,str.length-6);
        window.location.href = url;
        return false;
    })
});