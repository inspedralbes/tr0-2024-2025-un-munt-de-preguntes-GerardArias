<?php
include 'connect.php';
header('Content-Type: application/json');
session_start();

function obtenerPreguntas($conn): array {
    $pregBaseD = mysqli_query($conn, "SELECT * FROM preguntes");
    return $pregBaseD->fetch_all(MYSQLI_ASSOC);
}

$preguntesDesordenades = obtenerPreguntas($conn);

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
?>
