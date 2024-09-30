<?php
$servername = "localhost";
$database = "UMDP";
$username = "Gerard";
$password = "Gerard1234";

$conn = mysqli_connect($servername, $username, $password, $database);
header('Content-Type: application/json');

session_start();

$pregBaseD = mysqli_query($conn, "SELECT * FROM preguntes");

$info = $pregBaseD->fetch_all(MYSQLI_ASSOC);

if (empty($info)) {
	echo json_encode(array('error' => 'No se encontraron preguntas en la base de datos.'));
	exit;
}

function desordenarPreguntas($preguntes): array {
	shuffle($preguntes);
	return $preguntes;
}

$preguntesDesordenades = desordenarPreguntas($info);

$_SESSION['preguntes'] = $preguntesDesordenades;

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


