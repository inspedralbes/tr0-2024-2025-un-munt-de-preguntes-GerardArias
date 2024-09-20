function mostrarPreguntes(preguntes) {
  const container = document.getElementById('partida'); 
  let htmlString = '';  

  preguntes.forEach((preguntaObj, iPregunta) => {
    const respostes = [...preguntaObj.respostes_incorrectes, preguntaObj.resposta_correcta].sort(() => Math.random() - 0.5);

    htmlString += `<div style="margin-bottom: 20px;">`;
    htmlString += `<p><strong>Pregunta ${iPregunta + 1}:</strong> ${preguntaObj.pregunta}</p>`;
    
    if (preguntaObj.imatge) {
      htmlString += `<img src="${preguntaObj.imatge}" alt="Imatge de la pregunta" style="width: 200px; height: auto; margin-bottom: 10px;"><br>`;
    }

    respostes.forEach((resposta, iResposta) => {
      htmlString += `<button onclick="resposta(${iPregunta}, ${iResposta})" style="margin-right: 10px; margin-bottom: 5px;">${resposta}</button>`;
    });

    htmlString += `</div>`;
  });

  container.innerHTML = htmlString;  
}

function resposta(iPregunta, iResposta) {
  console.log(`Pregunta: ${iPregunta+1}, Resposta: ${iResposta+1}`);
}

fetch('http://localhost/tr0-2024-2025-un-munt-de-preguntes-GerardArias/back/getPreguntes.php')
  .then(response => response.json()) 
  .then(data => {
    mostrarPreguntes(data.preguntes); 
  })
  .catch(error => {
    console.error('Error carregant les preguntes:', error);
  });
