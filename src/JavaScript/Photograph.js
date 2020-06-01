$(document).ready(function () {
    $(".pagination").empty();
    $(".result").hide();
    $.post("../PHP/Detection.php", function (status) {
        if (status=='Visitor'){ //同收藏页
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
        else{
            $.get("../PHP/Photograph.php",  //初始化
                function (data) {
                if (data=="NULL"){
                    let $tip = $("<center><a href='../HTML/Upload.html'><h2>您还未上传任何照片，赶紧去上传一张吧!</h2></a></center>");
                    $("div.panel").append($tip);
                }
                else {
                    let array = JSON.parse(data);
                    display(array);
                }
            })
        }
    })
    $(".modify").click(function () {    //点击修改按钮后进入修改页
        let url = 'Upload.html?ImageID=' + $(this).attr("value");
        $(location).attr("href",url);
    });
    $(".delete").click(function () { //点击后删除相应图片
        let ImageID = $(this).attr("value");
        $.post("../PHP/Photograph_Delete.php",
            {
                ImageID:ImageID
            },
            function (data) {
                if (data=='Success'){
                    alert("删除成功");
                    window.location.reload();
                }
                else alert("Error发生");
            })
    })

})