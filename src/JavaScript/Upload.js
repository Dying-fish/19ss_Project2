function showFile() {
  let file  = $('#file').prop("files")[0];
  /*读取上传文件*/
  let reader  = new FileReader();
  /*将网页种空图片的src改成上传文件*/
  reader.onloadend = function () {
    $('#img').attr("src",reader.result);
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    $('#img').attr("src",'');
  }
};
function linkage(){
    $("#city").empty();
    $("#city").append("<option value=''>未选择</option>");
    $.post("../PHP/linkage-Upload.php",
        {
            country: $("#country option:selected").val()
        },
        function (data) {
            let arr = eval(data);
            for (let i=0;i<arr.length;i++){
                $("#city").append("<option value="+arr[i]["GeoNameID"]+">"+arr[i]["AsciiName"]+"</option>");
            }
        })
}
$(document).ready(function () {
    $.post("../PHP/detection.php", function (status) {
        if (status=='游客'){
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
    });
    $.get("../PHP/init-Upload.php",function(data){
        let arr = eval(data);
        for (let count=0;count<arr.length;count++){
            $("#country").append("<option value="+arr[count]["ISO"]+">"+arr[count]["CountryName"]+"</option>");
        }
    });
    let ImageId = window.location.search.indexOf("=");
    ImageId = window.location.search.substring(ImageId+1);
    if (ImageId!=''){
        $("#file").remove();
        $(".btn-success").text("修改");
        $("form.form-horizontal").attr("action","../PHP/Modify.php?id="+ImageId);
        $.post("../PHP/init-Modify.php",
            {
                ImageID: ImageId
            },
            function (data) {
                let arr = eval(data)[0];
                $("img").attr("src","../../images/travel-images/large/"+arr["PATH"]);
                $("#image-title").val(arr['Title']);
                $("#titleWarn").text("✔");
                $("#titleWarn").css("color", "green");
                $("#image-information").val(arr['Description']);
                if ($("#image-information").val()!='') {
                    $("#infoWarn").text("✔");
                    $("#infoWarn").css("color", "green");
                }
                $("#content option[value="+arr['Content']+"]").prop("selected", true);
                $("#country option[value="+arr['CountryCodeISO']+"]").prop("selected", true);
                linkage();
                if (arr['CityCode']!='') {
                    $("#city option:selected").text(arr['AsciiName']);
                    $("#city option:selected").val(arr['CityCode']);
                }
        })
    };
    var submit = false;
    $("#image-title").change(
      function () {
        if (!$("#image-title").val()) {
          submit = true;
          $("#titleWarn").text("*");
          $("#titleWarn").css("color","red");
        }
        else {
          $("#titleWarn").text("✔");
          $("#titleWarn").css("color", "green");
          submit = false;
        }
      }
    );
    $("#image-information").change(
      function () {
          if ($("#image-information").val()!='') {
              $("#infoWarn").text("✔");
              $("#infoWarn").css("color", "green");
              submit = false;
          }
          else $("#infoWarn").text("");
      }
    )
    $("form").submit(function(event){
        if(submit){
            event.preventDefault();
    }
        else alert("Success");
  });
})