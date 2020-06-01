<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "19ss_project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
// 搜索热门主题
$sql0 = "SELECT Content
         FROM travelimage
         GROUP BY Content
         ORDER BY COUNT(Content) DESC
         LIMIT 4
         ";
$result0 = mysqli_query($conn, $sql0);
// 搜索热门国家
$sql1 = "SELECT CountryName,ISO
        FROM geocountries
        WHERE ISO IN (
            SELECT T.CountryCodeISO 
            FROM (
                SELECT CountryCodeISO
                FROM travelimage
                GROUP BY CountryCodeISO 
                ORDER BY COUNT(CountryCodeISO) DESC 
                LIMIT 4) AS T
            )
        ";
$result1 = mysqli_query($conn, $sql1);
// 搜索热门城市
$sql2 = "SELECT AsciiName,GeoNameID
        FROM geocities
        WHERE GeoNameID IN (
            SELECT T.CityCode 
            FROM (
                SELECT CityCode
                FROM travelimage
                GROUP BY CityCode
                ORDER BY COUNT(CityCode) DESC 
                LIMIT 4) AS T
            )
        ";
$result2 = mysqli_query($conn, $sql2);
//搜索含有照片的国家
$sql3 = "SELECT CountryName,ISO
        FROM geocountries
        WHERE ISO IN (
            SELECT CountryCodeISO 
            FROM travelimage
        )
        ";
$result3 = mysqli_query($conn, $sql3);
$arr = Array();
if (mysqli_num_rows($result0) > 0) {
    $count = 0;
    while($row = mysqli_fetch_assoc($result0)) {
        $arr[0][$count++] = $row;
    }
}
if(mysqli_num_rows($result1) > 0){
    $count = 0;
    while($row = mysqli_fetch_assoc($result1)) {
        $arr[1][$count++] = $row;
    }
}
if(mysqli_num_rows($result2)>0){
    $count = 0;
    while($row = mysqli_fetch_assoc($result2)) {
        $arr[2][$count++] = $row;
    }
}
if (mysqli_num_rows($result3)) {
    $count = 0;
    while($row = mysqli_fetch_assoc($result3)) {
        $arr[3][$count++] = $row;
    }
}
if (!$result0) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (!$result1) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (!$result2) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (!$result3) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
//输出数据
echo json_encode($arr);
mysqli_close($conn);
?>