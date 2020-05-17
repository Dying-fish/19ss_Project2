$(document).ready(function () {
    $(".pagination").empty();
    for (let i = 0; i < 4; i++) {
        $("div.result"+i).css("display", "none");
        $(".modify"+i).click(function () {
            let str = $("div.result"+i+" div.image").val();
            let url = 'Upload.html?id='+str;
            $(location).attr("href",url);
            return false;
        });
        $(".delete"+i).click(function () {
            let str = $("div.result"+i+" div.image").val();
            $.post("../PHP/DeletePhoto.php",
                {
                  ImageID:str
                },
                function (data) {
                    if (data=='Success'){
                        alert("删除成功");
                        window.location.reload();
                    }
                    else alert("Error");
                })
            })
        };
    $.post("../PHP/detection.php", function (status) {
        if (status=='游客'){
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
        else{
            $.post("../PHP/Photograph.php",
                function (data) {
                if (data=="null"){
                    let $tip = $("<center><a href='../HTML/Upload.html'><h2>您还未上传任何照片，赶紧去上传一张吧!</h2></a></center>");
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