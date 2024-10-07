CREATE TABLE preguntes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    resposta_correcta VARCHAR(255) NOT NULL,
    respostes_incorrectes JSON NOT NULL,
    imatge VARCHAR(255)
);
