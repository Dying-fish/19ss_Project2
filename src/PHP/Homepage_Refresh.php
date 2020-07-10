<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "19ss_Project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
//  随机选取六张照片
$sql = "SELECT ImageID,PATH,Title,Description
        FROM travelimage
        WHERE PATH IS NOT NULL
        ORDER BY RAND()
        LIMIT 6";
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo json_encode([]);
    exit();
}
if (mysqli_num_rows($result) > 0) {
    $arr = Array();
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
}
echo json_encode($arr);
mysqli_close($conn);
?>
