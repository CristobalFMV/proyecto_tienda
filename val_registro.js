const form = document.querySelector('form');
const nombresInput = document.getElementById('nombres');
const apellidosInput = document.getElementById('apellidos');
const rutInput = document.getElementById('rut');
const correoInput = document.getElementById('correo');
const fotoInput = document.getElementById('exampleFormControlFile1');
form.addEventListener('submit', (event) => {
  if (nombresInput.value === '') {
    alert('Por favor, ingrese sus nombres.');
    event.preventDefault();
    return;
  }
  if (apellidosInput.value === '') {
    alert('Por favor, ingrese sus apellidos.');
    event.preventDefault();
    return;
  }
  if (!/^[0-9]+-[0-9kK]$/.test(rutInput.value)) {
    alert('Por favor, ingrese un RUT válido.');
    event.preventDefault();
    return;
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correoInput.value)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    event.preventDefault();
    return;
  }
  if (fotoInput.value === '') {
    alert('Por favor, seleccione una foto de perfil.');
    event.preventDefault();
    return;
  }
});