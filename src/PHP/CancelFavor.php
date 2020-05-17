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
session_start();

$ImageId = isset($_GET['ImageID']) ? htmlspecialchars($_GET['ImageID']) : '';

if ($ImageId==''||$_SESSION["UID"]<=0) echo("Error");
else {
    $uid = $_SESSION["UID"];
    $sql = "DELETE FROM travelimagefavor
        WHERE ImageID = '{$ImageId}' AND UID ='{$uid}'
        ";
    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else echo("Error");
}
mysqli_close($conn);
?>