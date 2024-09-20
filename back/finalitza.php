<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('preguntes.json');
    $data = json_decode($json, true);
    $preguntes = $data['preguntes'];

    $respostes = json_decode(file_get_contents('php://input'), true);

    $total = count($respostes);
    $correctes = 0;

    foreach ($respostes as $index => $resposta) {
        if ($preguntes[$index]['resposta_correcta'] == $resposta) {
            $correctes++;
        }
    }

    $resultat = [
        'total' => $total,
        'correctes' => $correctes
    ];

    echo json_encode($resultat);
} else {
    echo json_encode(['error' => 'Només es permeten peticions POST']);
}
?>
