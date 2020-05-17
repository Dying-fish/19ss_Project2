function paging(num,array) {
    $(".pagination li.active").removeClass("active");
    $("#page" + num).addClass("active");
    let i = 0;
    for (i = 0;i<4;i++) {
        $("div.result" + i).css("display", "none");
    }
    for (i = num * 4; i < num*4+4; i++) {
        let j = i - num * 4;
        $("div.result"+j).css("display","block");
        $("div.result"+j+" div.image").css("background-image", "url(\"../../images/travel-images/large/" + array[i]['PATH'] + "\")");
        $("div.result" + j+" div.image").val(array[i]['ImageID']);
        $("div.result"+j+" h3").text(array[i]["Title"]);
        if (!array[i]["Description"]){
            $("div.result" + j+" div.word p").text("This guy is lazy so he write nothing.");
        }else
            $("div.result" + j+" div.word p").text(array[i]["Description"]);
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
    let i = 0;
    for (; i < array.length; i++) {
        if (i < 4) {
            $("div.result" + i+" div.image").css("background-image", "url(\"../../images/travel-images/large/" + array[i]["PATH"] + "\")");
            $("div.result" + i+" div.image").val(array[i]['ImageID']);
            $("div.result" + i+" h3").text(array[i]["Title"]);
            if (!array[i]["Description"]){
                $("div.result" + i+" div.word p").text("This guy is lazy so he write nothing.");
            }else
                $("div.result" + i+" div.word p").text(array[i]["Description"]);
            $("div.result" + i).css("display", "block");
        }
        if (i > 0 && 4 * i < array.length&&i<5) {
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
        if (x == Math.floor(i / 4) || x == 4) return;
        else paging(x + 1, array);
    });
}