<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $respostes_usuari = json_decode(file_get_contents('php://input'), true);
    
    if (!is_array($respostes_usuari)) {
        echo json_encode(['error' => 'Respostes no vàlides']);
        exit;
    }

    $json = file_get_contents('preguntes.json');
    $data = json_decode($json, true);
    $preguntes = $data['preguntes'];

    $total_respostes = count($respostes_usuari);
    $respostes_correctes = 0;

    foreach ($respostes_usuari as $index => $resposta_usuari) {
        if ($index < count($preguntes) && $preguntes[$index]['resposta_correcta'] === $resposta_usuari) {
            $respostes_correctes++;
        }
    }

    $resultat = [
        'total_respostes' => $total_respostes,
        'respostes_correctes' => $respostes_correctes
    ];

    echo json_encode($resultat);
}
?>
