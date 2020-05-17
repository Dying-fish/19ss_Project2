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
$sql0 = "SELECT Content
         FROM travelimage
         GROUP BY Content
         ORDER BY COUNT(Content) DESC
         ";
$result0 = mysqli_query($conn, $sql0);
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
    // 输出数据
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
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result3)) {
        $arr[3][$count++] = $row;
    }
} else {
    echo "???"."<br>";
}
echo json_encode($arr);
if (!$result1) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (!$result2) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>
