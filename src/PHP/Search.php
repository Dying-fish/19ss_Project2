<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "19ss_project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// 获取搜索的标题或简介
$title = isset($_GET['title']) ? htmlspecialchars($_GET['title']) : '';
$info = isset($_GET['info']) ? htmlspecialchars($_GET['info']) : '';
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
//搜索图片路径与信息
$sql = "SELECT DISTINCT PATH,Title,Description,ImageID
        FROM travelimage
        WHERE PATH IS NOT NULL
        ";
if($title!='') $sql = $sql." AND Title LIKE '%{$title}%'";
if ($info!='') $sql = $sql." AND Description LIKE '%{$info}%'";
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo "NULL";
    exit();
}
if (mysqli_num_rows($result) > 0) {
    $arr = Array();
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
} else {
    echo "NULL";
}
mysqli_close($conn);
?>