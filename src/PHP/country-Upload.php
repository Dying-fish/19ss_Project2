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
$country = isset($_GET['country']) ? htmlspecialchars($_GET['country']) : '';
$sql = "SELECT *
        FROM geocountries
        WHERE CountryName ='{$country}'
        ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    echo "valid";
} else {
    echo "invalid";
}
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>
