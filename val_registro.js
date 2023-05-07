// Obtener el formulario y los campos de entrada
const form = document.querySelector('form');
const nombresInput = document.getElementById('nombres');
const apellidosInput = document.getElementById('apellidos');
const rutInput = document.getElementById('rut');
const correoInput = document.getElementById('correo');
const fotoInput = document.getElementById('exampleFormControlFile1');

// Agregar un controlador de eventos de envío al formulario
form.addEventListener('submit', (event) => {
  // Verificar el campo de entrada de nombres
  if (nombresInput.value === '') {
    alert('Por favor, ingrese sus nombres.');
    event.preventDefault();
    return;
  }
  
  // Verificar el campo de entrada de apellidos
  if (apellidosInput.value === '') {
    alert('Por favor, ingrese sus apellidos.');
    event.preventDefault();
    return;
  }

  // Verificar el campo de entrada de RUT
  if (!/^[0-9]+-[0-9kK]$/.test(rutInput.value)) {
    alert('Por favor, ingrese un RUT válido.');
    event.preventDefault();
    return;
  }

  // Verificar el campo de entrada de correo electrónico
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correoInput.value)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    event.preventDefault();
    return;
  }

  // Verificar el campo de entrada de foto
  if (fotoInput.value === '') {
    alert('Por favor, seleccione una foto de perfil.');
    event.preventDefault();
    return;
  }
});