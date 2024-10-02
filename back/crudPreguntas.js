const preguntasListElement = document.getElementById('preguntas-list');

let preguntas = [];

function cargarPreguntas() {
  fetch('../back/getPreguntes.php')
    .then(response => response.json())
    .then(data => {
      preguntas = data.preguntes;
      mostrarPreguntas();
    })
    .catch(error => {
      console.error('Error cargando las preguntas:', error);
    });
}

function mostrarPreguntas() {
  preguntasListElement.innerHTML = '';
  preguntas.forEach((pregunta, index) => {
    const preguntaElement = document.createElement('div');

    const respuestas = [pregunta.resposta_correcta, ...pregunta.respostes_incorrectes];
    
    const respuestasHtml = respuestas.map((respuesta, resIndex) => {
      return `<p>Respuesta ${resIndex + 1}: ${respuesta}</p>`;
    }).join('');

    const imagenHtml = pregunta.imatge ? `<img src="${pregunta.imatge}" alt="Imagen de la pregunta" style="max-width: 100%; height: auto;" />` : '';

    preguntaElement.innerHTML = `
      <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <p><strong>Pregunta ${index + 1}:</strong> ${pregunta.pregunta}</p>
        ${imagenHtml}
        ${respuestasHtml}
      </div>
    `;
    
    preguntasListElement.appendChild(preguntaElement);
  });
}

cargarPreguntas();
