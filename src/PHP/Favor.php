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
session_start();
$ImageId = isset($_GET['ImageID']) ? htmlspecialchars($_GET['ImageID']) : '';

if ($ImageId==''||$_SESSION["UID"]==0) echo("Error");
else {
    $uid = $_SESSION["UID"];
    $sql ="SELECT Count(*) FROM travelimagefavor";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $favorID = $row['Count(*)']+1;
    $sql = "INSERT INTO travelimagefavor
            (FavorID, UID,ImageID) 
            VALUES ('{$favorID}','{$uid}','{$ImageId}')
        ";
    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else echo("Error");
}
mysqli_close($conn);
?>