// Archivo: crudPreguntas.js

const preguntasListElement = document.getElementById('preguntas-list');
const agregarPreguntaForm = document.getElementById('agregar-pregunta-form');

let preguntas = [];

// Función para cargar las preguntas desde el servidor
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

// Función para mostrar las preguntas en el contenedor
function mostrarPreguntas() {
  preguntasListElement.innerHTML = ''; // Limpiar el contenedor
  preguntas.forEach((pregunta, index) => {
    const preguntaElement = document.createElement('div');
    preguntaElement.innerHTML = `
      <p><strong>Pregunta ${index + 1}:</strong> ${pregunta.pregunta}</p>
      <button onclick="editarPregunta(${index})">Editar</button>
      <button onclick="eliminarPregunta(${index})">Eliminar</button>
    `;
    preguntasListElement.appendChild(preguntaElement);
  });
}

// Función para agregar una nueva pregunta
agregarPreguntaForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const nuevaPregunta = document.getElementById('nueva-pregunta').value;

  fetch('../back/agregarPregunta.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pregunta: nuevaPregunta }),
  })
  .then(response => response.json())
  .then(data => {
    cargarPreguntas(); // Recargar preguntas después de agregar
    agregarPreguntaForm.reset(); // Reiniciar el formulario
  })
  .catch(error => {
    console.error('Error al agregar la pregunta:', error);
  });
});

// Función para editar una pregunta
function editarPregunta(index) {
  const nuevaPregunta = prompt('Ingrese la nueva pregunta:', preguntas[index].pregunta);
  if (nuevaPregunta) {
    fetch('../back/editarPregunta.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index, pregunta: nuevaPregunta }),
    })
    .then(response => response.json())
    .then(data => {
      cargarPreguntas(); // Recargar preguntas después de editar
    })
    .catch(error => {
      console.error('Error al editar la pregunta:', error);
    });
  }
}

// Función para eliminar una pregunta
function eliminarPregunta(index) {
  if (confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
    fetch('../back/eliminarPregunta.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    })
    .then(response => response.json())
    .then(data => {
      cargarPreguntas(); // Recargar preguntas después de eliminar
    })
    .catch(error => {
      console.error('Error al eliminar la pregunta:', error);
    });
  }
}

// Cargar preguntas al iniciar
cargarPreguntas();
