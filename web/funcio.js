let preguntesGlobal = [];
let preguntaActual = 0;
let resultats = [];
let tiempoRestante = 30;

fetch('/tr0-2024-2025-un-munt-de-preguntes-GerardArias/back/getPreguntes.php')
  .then(response => response.json())
  .then(data => {
    preguntesGlobal = data.preguntes;
    mostrarPregunta(preguntaActual);
  })
  .catch(error => {
    console.error('Error cargando las preguntas:', error);
  });

function mostrarPregunta(iPregunta) {
  let container = document.getElementById('partida');
  let preguntaObj = preguntesGlobal[iPregunta];

  if (iPregunta < preguntesGlobal.length) {
    let respostes = preguntaObj.respostes_incorrectes.concat([preguntaObj.resposta_correcta]).sort(() => Math.random() - 0.5);

    let htmlString = '<div style="margin-bottom: 20px;">';
    htmlString += `<h2>Pregunta número ${iPregunta + 1}</h2>`;
    htmlString += `<h3>${preguntaObj.pregunta}</h3>`;

    if (preguntaObj.imatge) {
      htmlString += `<img src="${preguntaObj.imatge}" alt="Imatge de la pregunta" style="height: 200px; margin-bottom: 10px;"><br>`;
    }

    respostes.forEach((resposta, j) => {
      htmlString += `<br><button class="resp" data-resposta="${resposta.replace(/'/g, "\\'")}" data-pregunta="${iPregunta}">${resposta}</button>`;
    });

    htmlString += '<br><button id="btn-anterior">Anterior</button>';
    htmlString += '<button id="btn-seguent">Siguiente</button>';
    htmlString += '<button id="btn-reiniciar" style="margin-left: 10px;">Reiniciar Cuestionario</button>';
    htmlString += '</div>';

    container.innerHTML = htmlString;
    document.getElementById('resultats').style.display = 'none';
  } else {
    enviarResultats();
  }
}

document.getElementById('partida').addEventListener('click', function(e) {
  if (e.target.classList.contains('resp')) {
    let respostaSeleccionada = e.target.getAttribute('data-resposta');
    let iPregunta = parseInt(e.target.getAttribute('data-pregunta'), 10);
    siguientePregunta(iPregunta, respostaSeleccionada);
  }

  if (e.target.id === 'btn-anterior') {
    preguntaAnterior();
  }

  if (e.target.id === 'btn-seguent') {
    preguntaSiguiente();
  }

  if (e.target.id === 'btn-reiniciar') {
    reiniciarCuestionario();
  }
});

function siguientePregunta(iPregunta, respostaSeleccionada) {
  let esCorrecta = respostaSeleccionada === preguntesGlobal[iPregunta].resposta_correcta;

  resultats[iPregunta] = {
    pregunta: preguntesGlobal[iPregunta].pregunta,
    resposta_seleccionada: respostaSeleccionada,
    correcta: esCorrecta
  };

  preguntaActual++;
  mostrarPregunta(preguntaActual);
}

function preguntaAnterior() {
  if (preguntaActual > 0) {
    preguntaActual--;
    mostrarPregunta(preguntaActual);
  }
}

function preguntaSiguiente() {
  if (preguntaActual + 1 < preguntesGlobal.length) {
    preguntaActual++;
    mostrarPregunta(preguntaActual);
  } else {
    enviarResultats();
  }
}

const contadorElement = document.getElementById('contador');

const intervalo = setInterval(() => {
    tiempoRestante--;
    contadorElement.textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        enviarResultats();
        contadorElement.textContent = "¡Tiempo Finalizado!";
    }
}, 1000);

function enviarResultats() {
  console.log('Enviando los resultados al servidor:', JSON.stringify(resultats));

  fetch('/tr0-2024-2025-un-munt-de-preguntes-GerardArias/back/finalitza.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ resultats }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Resultats enviats:', data);
    mostrarResultats();
  })
  .catch(error => {
    console.error('Error al enviar los resultados:', error);
  });
}

function mostrarResultats() {
  let container = document.getElementById('resultats');
  let htmlString = '<h2>Resultats del Cuestionari</h2>';

  resultats.forEach((resultat, index) => {
    htmlString += `<p><strong>Pregunta ${index + 1}:</strong> ${resultat.pregunta}<br>`;
    htmlString += `Resposta seleccionada: ${resultat.resposta_seleccionada}<br>`;
    htmlString += resultat.correcta ? 'Resultado: Correcta' : 'Resultado: Incorrecta';
    htmlString += '</p>';
  });

  htmlString += '<button id="btn-reiniciar-resultats">Reiniciar Cuestionario</button>';
  container.innerHTML = htmlString;
  container.style.display = 'block';
  document.getElementById('partida').style.display = 'none';

  document.getElementById('btn-reiniciar-resultats').addEventListener('click', reiniciarCuestionario);
}

function reiniciarCuestionario() {
  fetch('/tr0-2024-2025-un-munt-de-preguntes-GerardArias/back/getPreguntes.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'reiniciar=true'
  })
  .then(response => response.json())
  .then(data => {
    preguntesGlobal = data.preguntes;
    preguntaActual = 0;
    resultats = [];
    tiempoRestante = 30; 
    contadorElement.textContent = tiempoRestante;
    mostrarPregunta(preguntaActual);
    document.getElementById('resultats').style.display = 'none';
    document.getElementById('partida').style.display = 'block';
  })
  .catch(error => {
    console.error('Error al reiniciar el cuestionario:', error);
  });
}