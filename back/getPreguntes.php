<?php

include 'connect.php';

header('Content-Type: application/json');

session_start();

function obtenerPreguntas($conn): array {
    $pregBaseD = mysqli_query($conn, "SELECT * FROM preguntes");
    $info = $pregBaseD->fetch_all(MYSQLI_ASSOC);
    
    shuffle($info);
    
    $_SESSION['preguntes'] = $info;
    
    return $info;
}

if (!isset($_SESSION['preguntes']) || isset($_POST['reiniciar'])) {
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