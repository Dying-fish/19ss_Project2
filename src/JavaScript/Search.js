$(document).ready(function () {
    $(".search").submit(function () {
        $(".pagination").empty();
        $(".display").css("display", "block");
        let i = 0;
        for (i = 0; i < 4; i++) {
            $("div.result" + i).css("display", "none");
        }
        $("div.display h2").remove();
        if ($("input[type=radio]:checked").val()=='title'){
            $.post("../PHP/Search.php",
                {
                    title:$("input[type=text]").val(),
                    info:''
                },
                function (data) {
                if (data=='nothing') {
                    $add = $("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                    $("div.display").append($add);
                }
                else{
                    let arr = eval(data);
                    display(arr);
                }
                });
        }
        else if ($("input[type=radio]:checked").val()=='info'){
            $.post("../PHP/Search.php",
                {
                    title:'',
                    info:$("textarea").val(),
                },
                function (data) {
                    if (data=='nothing') {
                        $add = $("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                        $("div.display").append($add);
                    }
                    else{
                        let arr = eval(data);
                        display(arr);
                    }
                });
        }
        return false;
    })
    $(".image").click(function () {
        let str = $(this).val();
        let url = 'Details.html?id='+str;
        window.location.href = url;
        return false;
    })
});