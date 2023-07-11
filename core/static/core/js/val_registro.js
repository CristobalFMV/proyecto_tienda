$(document).ready(function () { // Manejar el evento submit del formulario
  $('#myForm').submit(function (event) {
    event.preventDefault();
    // Evitar el envío convencional del formulario

    // Realizar validación manualmente
    if ($('#myForm').valid()) { // Si la validación es exitosa, redirigir a la otra ruta
      window.location.href = "usuario.html";
    } else { // Si hay campos vacíos o no válidos, mostrar mensajes de error
      $('#myForm').find('.is-invalid').first().focus(); // Enfocar el primer campo con error
    }
  });

  // Configurar las reglas de validación y los mensajes de error
  $('#myForm').validate({
    errorClass: 'is-invalid',
    errorElement: 'small',
    errorPlacement: function (error, element) {
      error.addClass('form-text-error');
      error.insertAfter(element);
    },
    rules: {
      nombres: 'required',
      apellidos: 'required',
      rut: {
        required: true,
        validarRut: true
      },
      correo: {
        required: true,
        email: true
      },
      password: 'required',
      'confirm-password': {
        required: true,
        equalTo: '#password'
      },
      direccion: 'required'
    },
    messages: {
      nombres: 'Por favor, ingrese sus nombres.',
      apellidos: 'Por favor, ingrese sus apellidos.',
      rut: {
        required: 'Por favor, ingrese un RUT válido.'
      },
      correo: {
        required: 'Por favor, ingrese un correo electrónico válido.',
        email: 'Por favor, ingrese un correo electrónico válido.'
      },
      password: 'Por favor, ingrese su contraseña.',
      'confirm-password': {
        required: 'Por favor, confirme su contraseña.',
        equalTo: 'Las contraseñas no coinciden.'
      },
      direccion: 'Por favor, ingrese su dirección.'
    }
  });

  // Agregar regla de validación personalizada para el RUT
  $.validator.addMethod('validarRut', function (value, element) {
    value = value.replace(/\./g, '').replace('-', '');
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      return true;
    } else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      return true;
    } else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      return true;
    } else if (value.match(/^(\d)(\d{0,2})$/)) {
      return true;
    }
    return false;
  }, 'Por favor, ingrese un RUT válido.');
});

// Evitar el envío del formulario al presionar Enter en los campos de entrada
$('#myForm input').keydown(function (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    return false;
  }
});


$('#rut').on('input', function () {
  let value = $(this).val().replace(/\./g, '').replace('-', '');
  if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  } else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
    value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
  } else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
    value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
  } else if (value.match(/^(\d)(\d{0,2})$/)) {
    value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
  }
  $(this).val(value);
});
