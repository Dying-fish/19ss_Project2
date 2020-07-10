$(document).ready(function () {
    $(".display").hide();
    $(".search").submit(function () {
        $(".pagination").empty();
        $(".display").show();
        $(".result").hide();
        $("div.display h2").remove();
        // 按标题搜索
        if ($("input[type=radio]:checked").val()=="title"){
            $.post("../PHP/Search.php",
                {
                    title:$("input[type=text]").val(),
                },
                function (data) {
                    // 未搜索到相关照片时
                    if (data=='NULL') {
                        $("div.display").append("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                    }
                    // 展示照片
                    else{
                        data = data || 'ERROR';
                        if (data=="ERROR"){      //部署到服务器端会出现问题
                            $("div.display").append("<center><h2>请输入查询内容</h2></center>");
                        }else {
                            let array = eval(data);
                            display(array);
                        }
                    }
                });
        }
        // 按简介搜索
        else if ($("input[type=radio]:checked").val()=="info"){
            $.post("../PHP/Search.php",
                {
                    info:$("textarea").val().trim(),
                },
                function (data) {
                    // 未搜索到相关照片时
                    if (data=='NULL') {
                        $("div.display").append("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                    }
                    // 展示照片
                    else{
                        data = data || 'ERROR';
                        if (data=="ERROR"){      //部署到服务器端会出现问题
                            $("div.display").append("<center><h2>请输入查询内容</h2></center>");
                        }else {
                            let array = eval(data);
                            display(array);
                        }
                    }
                });
        }
        return false;
    })
});