<?php
$servername = "localhost";
$username = "root";
$password = "Dying_fish233";
$dbname = "project2";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
$url = "../HTML/Signup.html";
$user = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
$pass = isset($_POST['pass']) ? htmlspecialchars($_POST['pass']) : '';
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
$sql = "SELECT COUNT(UID) FROM traveluser";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$uid = $row["COUNT(UID)"]+1;
if ($user==''||$pass=='') echo("Error发生");
else {
    $sql = "INSERT INTO traveluser
            (UID, UserName,Pass, State) 
            VALUES ('{$uid}','{$user}','{$pass}',1)
        ";
    if ($conn->query($sql) === TRUE) {
        $url = "../HTML/Login.html";
        echo "您已注册成功";
    } else echo("Error发生");
}
mysqli_close($conn);
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
</body>
</html>
