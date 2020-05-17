$(document).ready(function () {
    $(".pagination").empty();
    for (let i = 0; i < 4; i++) {
        $("div.result"+i).css("display", "none");
        $(".favor"+i).click(function () {
            let imageId = $("div.result"+i+" div.image").val();
            $.get("../PHP/CancelFavor.php",{
                ImageID:imageId
            },function (data) {
                alert(data);
            })
            window.location.reload();
        });
    }
    $.post("../PHP/detection.php", function (status) {
        if (status=='游客'){
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
        else{
            $.post("../PHP/Favourite.php",
                function (data) {
                    if (data=="null"){
                        let $tip = $("<center><a href='../HTML/Browse.html'><h2>您还未收藏任何照片，赶紧去浏览吧!</h2></a></center>");
                        $("div.panel").append($tip);
                    }
                    else {
                        let array = eval(data);
                        display(array);
                    }
            })
        }
    })
    $(".image").click(function () {
        let str = $(this).val();
        let url = 'Details.html?id='+str;
        window.location.href = url;
        return false;
    })
})