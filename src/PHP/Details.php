<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
$id = isset($_GET['id']) ? htmlspecialchars($_GET['id']) : '';
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
session_start();
$sql = "SELECT X.Title,X.Description,X.Content,Z.CountryName,X.CityCode,X.PATH,Y.UserName, COUNT(W.ImageID)
        FROM travelimage AS X,geocountries AS Z,traveluser AS Y,travelimagefavor AS W
        WHERE X.ImageID = '{$id}' AND Z.ISO = X.CountryCodeISO AND X.UID = Y.UID AND W.ImageID = '{$id}'
        ";
$data = Array();
$result = mysqli_query($conn, $sql);
if(!$result) echo "Error";
else if (mysqli_num_rows($result) > 0) {
    $data[0]['isFavor'] = false;
    $data[0] = mysqli_fetch_assoc($result);
    $data[0]['favor'] = $data[0]["COUNT(W.ImageID)"];
    unset($data[0]["COUNT(W.ImageID)"]);
    if($data[0]["CityCode"]!=''){
        $sql = "
        SELECT AsciiName
        FROM geocities
        WHERE GeoNameID = '{$data[0]["CityCode"]}'
        ";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $data[0]["CityName"] = mysqli_fetch_assoc($result)["AsciiName"];
        }
    }
    else $data[0]["CityName"] = "NULL";
    unset($data[0]["CityCode"]);
    if (isset($_SESSION["UID"])){
        $uid = $_SESSION["UID"];
        $sql = "SELECT * FROM travelimagefavor WHERE ImageID='{$id}' AND UID = '{$uid}'";
        $result = mysqli_query($conn, $sql);
        if (!$result){}
        else if (mysqli_num_rows($result) > 0) $data[0]['isFavor'] = true;
    }
    echo json_encode($data);
} else {
    echo "Error";
}
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>
