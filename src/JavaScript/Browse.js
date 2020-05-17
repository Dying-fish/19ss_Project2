//翻页
function paging(num,array) {
    $(".pagination li.active").removeClass("active");
    $("#page" + num).addClass("active");
    let i = 0;
    for (i = 0; i < 12; i++) {
        $("div.thumb-" + i).css("display", "none");
    }
    for (i = num * 12; i < array.length; i++) {
        let j = i - num * 12;
        if (j < 12) {
            $("div.thumb-" + j).css("background-image", "url(\"../../images/travel-images/large/" + array[i]["PATH"] + "\")");
            $("div.thumb-" + j).val(array[i]['ImageID']);
            $("div.thumb-" + j).css("display", "block");
        }
    }
}
function display(array){
    $(".pagebutton").css("display","block");
    $(".pagination").append("<li id='prev'><a href=\"#\">&laquo;</a></li>");
    $(".pagination").append("<li id=\"page0\" value='0' class=\"active\"><a href=\"#\">1</a></li>");
    $("#page0").on("click", function () {
        paging(0, array)
    });
    $("#prev").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x == 0) return;
        else paging(x - 1, array);
    });
    for (i = 0; i < array.length; i++) {
        if (i < 12) {
            $("div.thumb-" + i).css("background-image", "url(\"../../images/travel-images/large/" + array[i]["PATH"] + "\")");
            $("div.thumb-" + i).val(array[i]['ImageID']);
            $("div.thumb-" + i).css("display","block");
        }
        if (i > 0 && 12 * i < array.length && i < 5) {
            let num = i;
            $(".pagination").append("<li id=\"page" + num + "\" value='" + num + "'><a href=\"#\">" + (num + 1) + "</a></li>");
            $("#page" + num).on("click", function () {
                paging(num, array)
            });
        }
    }
    $(".pagination").append("<li id='next'><a href=\"#\">&raquo;</a></li>");
    $("#next").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x == Math.floor(i / 12) || x == 4) return;
        else paging(x + 1, array);
    });
}
//筛选
function browseSearch(x,y,z) {
    let i = 0;
    for (i = 0; i < 12; i++) {
        $("div.thumb-" + i).css("display", "none");
    }
    $(".pagination").empty();
    $("div.show h2").remove();
    $.post("../PHP/BrowseSearch.php",
        {
            content:x,
            country: y,
            city: z
        },
        function (data) {
            if (data=="NULL"){
                $("div.show").append("<center><h2>很抱歉，未搜索到相关照片</h2></center>");
            }else {
                let array = eval(data);
                display(array);
            }
        })
}
$(document).ready(function () {
    //初始化热门
    $.get("../PHP/init-Browse.php",function(data){
        let arr = eval(data);
        let count;
        for (count=0;count<4;count++){
            let content = arr[0][count]["Content"];
            $("#hotContent"+count+" a").text(arr[0][count]["Content"]);
            $("#hotContent"+count).on("click",function () {
                browseSearch(content,"","");
            })
            let country = arr[1][count]["ISO"];
            $("#hotCountry"+count+" a").text(arr[1][count]["CountryName"]);
            $("#hotCountry"+count).on("click",function () {
                browseSearch("",country,"");
            });
            let city = arr[2][count]["GeoNameID"];
            $("#hotCity"+count+" a").text(arr[2][count]["AsciiName"]);
            $("#hotCity"+count).on("click",function () {
                browseSearch("","",city);
            });
        }
        for (count=0;count<arr[3].length;count++){
            $("#country").append("<option value="+arr[3][count]["ISO"]+">"+arr[3][count]["CountryName"]+"</option>");
        }
        for (count=0;count<arr[0].length;count++){
            $("#content").append("<option value="+arr[0][count]["Content"]+">"+arr[0][count]["Content"]+"</option>");
        }
    });
    $("#country").click(function () {
        $("#city").empty();
        $("#city").append("<option value=\"\">未选择</option>");
        $.post("../PHP/linkage.php",
            {
                country: $("#country option:selected").val()
            },
            function (data) {
                let arr = eval(data);
                for (let i=0;i<arr.length;i++){
                    $("#city").append("<option value="+arr[i]["GeoNameID"]+">"+arr[i]["AsciiName"]+"</option>");
                }
            })
    });
    $("#select").click(
        function () {
            browseSearch(
                $("#content option:selected").val(),
                $("#country option:selected").val(),
                $("#city option:selected").val());
        }
    )
    $("form.title-search").submit(function () {
        $(".pagination").empty();
        let i = 0;
        for (i = 0; i < 12; i++) {
            $("div.thumb-" + i).css("display", "none");
        }
        $.post("../PHP/Search.php",
            {
                title:$("input[type=text]").val(),
                info:""
            },
            function(data) {
                let arr = eval(data);
                display(arr);
            });
        return false;
    });
    $(".thumb").click(function () {
        let str = $(this).val();
        let url = 'Details.html?id='+str;
        window.location.href = url;
        return false;
    })
})