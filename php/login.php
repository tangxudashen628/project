<?php
include "conn.php";
if(isset($_POST['tel'])){
    $tel=$_POST['tel'];
    $pass=md5($_POST['pass']);
}else{
    echo "非法操作";
};
$result=mysql_query("select * from registor where tel='$tel' and password='$pass'");
if(mysql_fetch_array($result,MYSQL_ASSOC)){
    echo true;
}else{
    echo false;
};
?>