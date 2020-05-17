<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
session_start();
$url = "../HTML/Upload.html";

// 允许上传的图片后缀

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);     // 获取文件后缀名
if (in_array($extension, $allowedExts))
{
    if ($_FILES["file"]["error"] > 0)
    {
        echo "错误：: " . $_FILES["file"]["error"] . "<br>";
    }
    else
    {
        // 判断当前目录下是否存在该文件
        if (file_exists(" /WEB/19ss_Project2/images/travel-images/large/" . $_FILES["file"]["name"]))
        {
            echo " 文件已经存在."."<br>";
        }
        else
        {
            // 如果目录不存在该文件则将文件上传到目录下
            move_uploaded_file($_FILES["file"]["tmp_name"], "/WEB/19ss_Project2/images/travel-images/large/" . $_FILES["file"]["name"]);
            echo "上传成功"."<br>";
        }
        $filename = $_FILES["file"]["name"];
        $title = isset($_POST['image-title']) ? htmlspecialchars($_POST['image-title']) : '';
        $info = isset($_POST['image-information']) ? htmlspecialchars($_POST['image-information']) : '';
        $content = isset($_POST['content']) ? htmlspecialchars($_POST['content']) : '';
        $country = isset($_POST['country']) ? htmlspecialchars($_POST['country']) : '';
        $city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
        $sql = "SELECT COUNT(*) FROM travelimage";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $ImageId = $row["COUNT(*)"]+1;
        $uid = $_SESSION["UID"];
        if($city!='') {
            $sql = "INSERT INTO travelimage
                (ImageID, Title, Description, CityCode, CountryCodeISO, UID, PATH, Content)
                VALUES('{$ImageId}','{$title}','{$info}','{$city}','{$country}','{$uid}','{$filename}','{$content}')
                ";
        }
        else{
            $sql = "INSERT INTO travelimage
                (ImageID, Title, Description, CityCode, CountryCodeISO, UID, PATH, Content)
                VALUES('{$ImageId}','{$title}','{$info}',NULL,'{$country}','{$uid}','{$filename}','{$content}')
                ";
        }
        if ($conn->query($sql) === TRUE) {
            $url = "../HTML/Photograph.html";
            echo "正在跳转";
        }
    }
}
else
{
    echo "Error";
}


mysqli_close($conn);
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
</body>
</html>
