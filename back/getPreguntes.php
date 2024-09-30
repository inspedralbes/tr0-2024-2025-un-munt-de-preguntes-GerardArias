<?php
header('Content-Type: application/json');

session_start();

$json = file_get_contents('preguntes.json');
$data = json_decode($json, true);

if (isset($data['preguntes'])) {
    function desordenarPreguntas($preguntes): array {
        shuffle($preguntes); 
        return $preguntes;
    }

    $preguntesDesordenades = desordenarPreguntas($data['preguntes']);

    $_SESSION['preguntes'] = $preguntesDesordenades;

    $resp = [];
    foreach ($preguntesDesordenades as $resposta) {
        $resp[] = array(
            'pregunta' => $resposta['pregunta'],
            'resposta_correcta' => $resposta['resposta_correcta'],
            'respostes_incorrectes' => $resposta['respostes_incorrectes'],
            'imatge' => isset($resposta['imatge']) ? $resposta['imatge'] : '' 
        );
    }

    echo json_encode(array('preguntes' => $resp));
} else {
    echo json_encode(array('error' => 'No se encontraron preguntas en el archivo JSON.'));
}
?>
