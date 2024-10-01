<?php
$servername = "localhost";
$database = "UMDP";
$username = "Gerard";
$password = "Gerard1234";

$conn = mysqli_connect($servername, $username, $password, $database);
header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

session_start();

function obtenerPreguntas($conn): array {
    $pregBaseD = mysqli_query($conn, "SELECT * FROM preguntes");
    if (!$pregBaseD) {
        return [];
    }
    $info = $pregBaseD->fetch_all(MYSQLI_ASSOC);
    shuffle($info);
    $_SESSION['preguntes'] = $info;
    return $info;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['reiniciar'])) {
    session_unset();
    session_destroy();
    session_start();
}

if (!isset($_SESSION['preguntes'])) {
    $preguntesDesordenades = obtenerPreguntas($conn);
} else {
    $preguntesDesordenades = $_SESSION['preguntes'];
}

$resp = [];
foreach ($preguntesDesordenades as $resposta) {
    $respostes_incorrectes = json_decode($resposta['respostes_incorrectes'], true);
    
    $resp[] = array(
        'pregunta' => $resposta['pregunta'],
        'resposta_correcta' => $resposta['resposta_correcta'],
        'respostes_incorrectes' => $respostes_incorrectes,
        'imatge' => isset($resposta['imatge']) ? $resposta['imatge'] : ''
    );
}

echo json_encode(array('preguntes' => $resp));

$conn->close();
session_destroy();
?>
