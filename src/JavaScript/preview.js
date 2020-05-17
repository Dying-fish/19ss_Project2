/*定义显示预览图的函数*/
function showFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  /*读取上传文件*/
  var reader  = new FileReader();
  /*将网页种空图片的src改成上传文件*/
  reader.onloadend = function () {
    preview.src = reader.result;
  }
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
