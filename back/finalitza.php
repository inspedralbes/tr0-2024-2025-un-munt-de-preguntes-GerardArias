<?php
header('Content-Type: application/json');
session_start();

$json = file_get_contents('php://input');
$respostes = json_decode($json, true);

if (isset($_SESSION['preguntes'])) {
    $preguntes = $_SESSION['preguntes'];
    $verificar = [];
    foreach ($respostes['resultats'] as $index => $resposta) {
        $esCorrecta = $resposta['resposta_seleccionada'] === $preguntes[$index]['resposta_correcta'];
        $verificar[] = array(
            'pregunta' => $resposta['pregunta'],
            'resposta_seleccionada' => $resposta['resposta_seleccionada'],
            'correcte' => $esCorrecta
        );
    }
    echo json_encode($verificar);
} else {
    echo json_encode(array('error' => 'No se han encontrado preguntas en la sesión.'));
}
?>
