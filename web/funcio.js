let preguntesGlobal = [];
let preguntaActual = 0;

fetch('../back/getPreguntes.php')
  .then(function(response) { return response.json(); })
  .then(function(data) {
    preguntesGlobal = data.preguntes;
    mostrarPregunta(preguntaActual);
  })
  .catch(function(error) {
    console.error('Error carregant les preguntes:', error);
  });

function mostrarPregunta(iPregunta) {
  let container = document.getElementById('partida');
  let preguntaObj = preguntesGlobal[iPregunta];
  let respostes = preguntaObj.respostes_incorrectes.concat([preguntaObj.resposta_correcta]).sort(function() { return Math.random() - 0.5; });

  let htmlString = '<div style="margin-bottom: 20px;">';
  htmlString += '<p><strong>Pregunta ' + (iPregunta + 1) + ':</strong> ' + preguntaObj.pregunta + '</p>';
  
  if (preguntaObj.imatge) {
    htmlString += '<img src="' + preguntaObj.imatge + '" alt="Imatge de la pregunta" style="height: 200px; margin-bottom: 10px;"><br>';
  }

  respostes.forEach(function(resposta, iResposta) {
    htmlString += '<button onclick="resposta(' + iPregunta + ', ' + iResposta + ')" style="margin-right: 10px; margin-bottom: 5px;">' + resposta + '</button>';
  });

  htmlString += '</div>';

  //htmlString += '<button onclick="preguntaAnterior()" style="margin-right: 10px;">Anterior</button>';
  //htmlString += '<button onclick="preguntaSiguiente()">Siguiente</button>';

  container.innerHTML = htmlString;
}


function resposta(iPregunta, iResposta) {
  console.log('Pregunta: ' + (iPregunta + 1) + ', Resposta: ' + (iResposta + 1));
  preguntaSiguiente();
}

/*function preguntaAnterior() {
  if (preguntaActual > 0) {
    preguntaActual--;
    mostrarPregunta(preguntaActual);
  }
}*/

function preguntaSiguiente() {
  if (preguntaActual < preguntesGlobal.length - 1) {
    preguntaActual++;
    mostrarPregunta(preguntaActual);
  }
}
