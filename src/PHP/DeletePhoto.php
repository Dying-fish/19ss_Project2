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
$ImageID = isset($_POST['ImageID']) ? htmlspecialchars($_POST['ImageID']) : '';
$sql = "DELETE FROM travelimage
        WHERE ImageID = '{$ImageID}'
        ";
if ($conn->query($sql) === TRUE) {
    echo "Success";
}
else echo "Error";
mysqli_close($conn);
?>