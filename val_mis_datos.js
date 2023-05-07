const form = document.querySelector('form');
const validarnombresInput = document.getElementById('nombres');
const validarapellidosInput = document.getElementById('apellidos');
const validarRUTInput = document.getElementById('rut');
const validarcorreoelectronicoInput = document.getElementById('correo electronico');
const confirmarfotoInput = document.getElementById('exampleFormControlFile1');

form.addEventListener('submit', (event) => {
  if (nombresInput.value === '') {
    alert('Validar los nombres de su usuario.');
    event.preventDefault();
    return;
  }
  
  if (apellidosInput.value === '') {
    alert('Validar los apellidos de su usuario.');
    event.preventDefault();
    return;
  }

  if (!/^[0-9]+-[0-9kK]$/.test(RUTInput.value)) {
    alert('Validar el RUT .');
    event.preventDefault();
    return;
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correoelectronicoInput.value)) {
    alert('Valide la direccion de correo electrónico establecida.');
    event.preventDefault();
    return;
  }

  if (fotoInput.value === '') {
    alert('Confirme la foto de entrada para su perfil.');
    event.preventDefault();
    return;
  }
});