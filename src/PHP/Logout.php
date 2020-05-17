<?php
session_start();
session_destroy();
$url = "../../index.html"
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
你已注销，请稍等片刻
</body>
</html>
