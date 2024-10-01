<?php
$servername = "localhost";
$database = "UMDP";
$username = "Gerard";
$password = "Gerard1234";

$conn = mysqli_connect($servername, $username, $password, $database);
header('Content-Type: application/json');

session_start();

function obtenerPreguntas($conn): array {
    $pregBaseD = mysqli_query($conn, "SELECT * FROM preguntes");
    $info = $pregBaseD->fetch_all(MYSQLI_ASSOC);
    
    // Desordenar preguntas
    shuffle($info);
    
    // Almacenar en la sesión
    $_SESSION['preguntes'] = $info;
    
    return $info;
}

if (!isset($_SESSION['preguntes']) || isset($_POST['reiniciar'])) {
    // Si no hay preguntas en la sesión o se solicita reiniciar, obtener nuevas preguntas
    $preguntesDesordenades = obtenerPreguntas($conn);
} else {
    // Si ya hay preguntas en la sesión, solo las recuperamos
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