$(document).ready(function(){
    var submit = false;
    $("#User").change(function () {
        if(!/^\w{8,}$/.test($("#User").val())){
            submit = true;
            $("#userWarn").text("用户名不规范,请使用8位及以上的字母、数字、下划线组成用户名");
            $("#userWarn").css("color","red");
        }
        else{
            $("#userWarn").text("✔");
            $("#userWarn").css("color","green");
            submit = false;
        }
    });
    $("#Email").change(function () {
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($("#Email").val())){
            submit = true;
            $("#emailWarn").text("邮箱格式错误");
            $("#emailWarn").css("color","red");
        }
        else{
            $("#emailWarn").text("✔");
            $("#emailWarn").css("color","green");
            submit = false;
        }
    })
    $("#pass").change(function () {
        if (!/^\w{8,}$/.test($("#pass").val())){
            submit = true;
            $("#passwordWarn").text("密码不规范,请使用8位及以上的字母、数字、下划线组成密码");
            $("#passwordWarn").css("color","red");
        }
        else{
            submit = false;
            $("#passwordWarn").text("✔");
            $("#passwordWarn").css("color","green");
        }
        if($("#pass").val()!= $("#confirm").val()){
            submit = true;
            $("#confirmWarn").text("密码不一致");
        }
        else{
            $("#confirmWarn").text("✔");
            $("#confirmWarn").css("color","green");
            submit = false;
        }
    })
    $("#confirm").change(function () {
        if($("#pass").val()!= $("#confirm").val()){
            submit = true;
            $("#confirmWarn").text("密码不一致");
        }
        else{
            $("#confirmWarn").text("✔");
            $("#confirmWarn").css("color","green");
            submit = false;
        }
    })
    $("form").submit(function(event){
      if(submit){
          event.preventDefault();
      }
    });
  });