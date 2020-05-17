<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
$UID = 0;
//  启动会话，这步必不可少
session_start();
$sql = "SELECT PATH,Title,Description,ImageID
        FROM travelimage
        WHERE ImageID IN (
            SELECT T.ImageID 
            FROM(
                SELECT ImageID
                FROM travelimagefavor 
                WHERE UID = '{$_SESSION["UID"]}'
                ) AS T
        ) AND PATH!='NULL'
        ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
} else {
    echo "null";
}
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>