$(document).ready(function () {
    let imageId = window.location.search.indexOf("=");
    imageId = window.location.search.substring(imageId+1);
    $.get("../PHP/Details.php",
        {
            id:imageId
        },
        function (data) {
            let result = eval(data)[0];
            $("img").attr("src","../../images/travel-images/large/"+result['PATH']);
            $(".themeTag").text("主题："+result['Content']);
            $("#photographer").text(result['UserName']);
            $(".page-header h2").text(result["Title"]);
            $(".panel-body p").text(result["Description"]);
            $(".cityName").text("城市："+result["CityName"]);
            $(".countryName").text("国家："+result["CountryName"]);
            $("#favor").text("收藏："+result['favor']);
            if(result['isFavor']){
                $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160已收藏");
                $("button").addClass("like");
            }
        }
    );
    $.post("../PHP/detection.php",function (status) {
        if (status=="游客"){
            $(".dropdown-toggle").text("登录");
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./Login.html");
                return true;
            })
            $(".dropdown-menu").hide();
            $("button").click(function () {
                alert("请先登录");
            });
        }
        else {
            $("button").click(function () {
                if ($("button").hasClass("like")) {
                    $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160收藏");
                    $("button").removeClass("like");
                    $.get("../PHP/CancelFavor.php",{
                        ImageID:imageId
                    })
                }
                else {
                    $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160已收藏");
                    $("button").addClass("like");
                    $.get("../PHP/Favor.php",{
                        ImageID:imageId
                    })
                }
            })
        }
    })
})