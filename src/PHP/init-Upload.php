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
$sql = "SELECT CountryName,ISO
        FROM geocountries
        WHERE Population>100000
        ORDER BY CountryName 
        ";
$result = mysqli_query($conn, $sql);
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
}
mysqli_close($conn);
?>
