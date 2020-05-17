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
$user = isset($_POST['User']) ? htmlspecialchars($_POST['User']) : '';
$pass = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : '';
$url = "../HTML/Login.html";
$sql = "SELECT UID
        FROM traveluser
        WHERE UserName ='{$user}' AND Pass = '{$pass}'
        ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $row = mysqli_fetch_assoc($result);
    session_start();
    //  声明一个名为 admin 的变量，并赋空值。
    $_SESSION["admin"] = true;
    $_SESSION["UID"]=$row["UID"];
    $url  =  "../../index.html";
    echo "您已成功登录，请稍等片刻";
}
else{
    echo("用户名或密码错误");
}
if (!$result) {
    echo("用户名或密码错误");
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
