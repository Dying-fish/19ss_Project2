$(document).ready(function () {
    $(".pagination").empty();
    $(".result").hide();
    $.post("../PHP/Detection.php", function (status) {
        if (status=='Visitor'){ //字面意思，防止直接通过输入网页进入界面
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
        else{
            $.get("../PHP/Favourite.php",   //初始化
                function (data) {
                    if (data=="NULL"){  //若没有收藏的照片则显示该文字
                        let $tip = $("<center><a href='../HTML/Browse.html'><h2>您还未收藏任何照片，赶紧去浏览吧!</h2></a></center>");
                        $("div.panel").append($tip);
                    }
                    else {
                        let array = JSON.parse(data);
                        display(array);

                    }
                })
        }
    })
    $(".favorButton").click(function () {   //点击按钮后取消收藏
        let ImageID = $(this).attr("value");    //获取该图片ID
        $.post("../PHP/Favor_Cancel.php",
            {
                ImageID:ImageID
            },
            function(data) {
                if (data=="Error") alert("Error发生");
                else {
                    alert("已取消收藏");
                    window.location.reload();   //刷新页面
                }
            })
    })
})