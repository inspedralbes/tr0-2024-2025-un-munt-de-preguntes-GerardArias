<?php
header('Content-Type: application/json');

$json = file_get_contents('preguntes.json');
$data = json_decode($json, true);
$preguntes = $data['preguntes'];

$num_preguntes = isset($_GET['num']) ? intval($_GET['num']) : 10;

shuffle($preguntes);
$preguntes_aleatories = array_slice($preguntes, 0, $num_preguntes);

$preguntes_sense_correcta = array_map(function($pregunta) {
    return [
        'pregunta' => $pregunta['pregunta'],
        'imatge' => $pregunta['imatge'],
        'respostes_incorrectes' => $pregunta['respostes_incorrectes']
    ];
}, $preguntes_aleatories);

echo json_encode($preguntes_sense_correcta);

?>
