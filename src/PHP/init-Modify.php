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
$sql = "SELECT PATH,Title,Description,CityCode,CountryCodeISO,Content
        FROM travelimage
        WHERE ImageID = '{$ImageID}'
        ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        $arr[0] = $row;
    }
    if ($arr[0]['CityCode']!='') {
        $code = $arr[0]['CityCode'];
        $sql = "SELECT AsciiName
        FROM geocities
        WHERE GeoNameID = '{$code}'
        ";
        $result = mysqli_query($conn, $sql);
        while($row = mysqli_fetch_assoc($result)) {
            $arr[0]["AsciiName"] = $row['AsciiName'];
        }
    }
    echo json_encode($arr);
} else {
    echo "error";
}
mysqli_close($conn);
?>