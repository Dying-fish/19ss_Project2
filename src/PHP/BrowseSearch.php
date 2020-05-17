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
$content = isset($_POST['content']) ? htmlspecialchars($_POST['content']) : '';
$country = isset($_POST['country']) ? htmlspecialchars($_POST['country']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$sql = "SELECT PATH,ImageID
        FROM travelImage
        WHERE PATH != 'NULL'";
if($content!=''){
    $sql = $sql." AND Content = '{$content}'";
}
if ($country!=''){
    $sql = $sql." AND CountryCodeISO =  '{$country}'";
}
if ($city!=''){
    $sql = $sql." AND CityCode = '{$city}'";
}
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
}
else echo "NULL";
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>