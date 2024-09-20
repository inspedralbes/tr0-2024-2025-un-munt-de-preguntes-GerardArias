<?php
//session_start();
$contPreg=24;
header(header: 'Content-Type: application/json')
$json = file_get_contents('preguntes.json');
$data = json_decode($json, true);
$preguntes = $data['preguntes'];

function desordenarPreguntas($preguntes, $contPreg): array{
    $pregDesord = array();
    $pregDesord = shuffle($preguntes); 
    return $pregDesord
}

$resp=[];
foreach ($preguntes as $respostes){
    $resp[]=array(
        'pregunta' =>$respostes['pregunta']
        'resposta_correcta' =>$respostes['resposta_correcta']
        'respostes_incorrectes' =>$respostes['respostes_incorrectes']
    );
}
$resp2=json_encode($resp);
echo $resp2;
?>
