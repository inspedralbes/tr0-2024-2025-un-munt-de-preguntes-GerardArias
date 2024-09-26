<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$respostes = json_decode($json, true);

$json2 = file_get_contents("preguntes.json");
$preg = json_decode($json2, true);

$respostesCorrectes = [];
foreach($preg["preguntes"] as $rCorrecta){
    $respostesCorrectes[] = $rCorrecta["resposta_correcta"];
}

$respostaClient = [];
foreach($respostes["resultats"] as $resposta){
    $respostaClient[] = $resposta["resposta_seleccionada"];
}

$verificar = [];
for ($index = 0; $index < count($respostaClient); $index++) { 
    if ($respostaClient[$index] == $respostesCorrectes[$index]) {
        $verificar[] = true;
    } else {
        $verificar[] = false;
    }
}

$mostrarCorreccion = [];
foreach ($respostes["resultats"] as $index => $respCorr) {
    $mostrarCorreccion[] = array(
        'pregunta' => $respCorr['pregunta'],
        'resposta_seleccionada' => $respCorr['resposta_seleccionada'],
        'correcte' => $verificar[$index]
    );
}

echo json_encode($mostrarCorreccion);
?>
