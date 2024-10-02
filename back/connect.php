<?php
//base de datos local
$servername = "localhost";
$database = "UMDP";
$username = "Gerard";
$password = "Gerard1234";

//base de datos hestia
/*
$servername = "localhost";
$database = "a23gerarimar_Gerard";
$username = "a23gerarimar_gerard";
$password = "Gerard2005";
*/

$conn = mysqli_connect($servername, $username, $password, $database);
?>