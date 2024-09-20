<?php
session_start();

if (!isset($_SESSION['resultats'])) {
    header('Location: index.php');
    exit;
}
$puntuacio = $_SESSION['puntuacio'];
$totalPreguntes = count($_SESSION['preguntes']);
$resultats = $_SESSION['resultats'];

session_unset();
?>

<title>Resultats</title>
</head>
<body>
    <h1>Resultat del Joc</h1>
    <p>Puntuació: <?php echo $puntuacio . '/' . $totalPreguntes; ?></p>
    <p>Resultats:</p>
    <ul>
        <?php 
        foreach ($resultats as $index => $encertat) {
            if ($encertat) {
                $resultado = 'Correcte';
            } else {
                $resultado = 'Incorrecte';
            }
        ?>
            <li>Pregunta <?php echo $index + 1; ?>: <?php echo $resultado; ?></li>
        <?php } ?>
    </ul>
    <form method="post" action="index.php">
        <button name="reiniciar" type="submit">Reiniciar el joc</button>
    </form>
</body>