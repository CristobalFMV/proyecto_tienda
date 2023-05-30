$(document).ready(function() {
  // Configurar las reglas de validación y los mensajes de error
  $('#form').validate({
    errorClass: 'is-invalid',
    errorElement: 'small',
    errorPlacement: function(error, element) {
      error.addClass('form-text-error');
      error.insertAfter(element);
    },
    rules: {
      IdProducto: 'required',
      Rut: {
        required: true,
        validarRut: true
      },
      Nombre: 'required',
      Apellido: 'required',
      areaTexto: 'required',
      email: {
        required: true,
        email: true
      },
      password: 'required'
    },
    messages: {
      IdProducto: 'Por favor, ingrese un ID válido.',
      Rut: {
        required: 'Por favor, ingrese un RUT válido.'
      },
      Nombre: 'Por favor, ingrese sus nombres.',
      Apellido: 'Por favor, ingrese sus apellidos.',
      areaTexto: 'Por favor, ingrese su dirección.',
      email: {
        required: 'Por favor, ingrese un correo electrónico válido.',
        email: 'Por favor, ingrese un correo electrónico válido.'
      },
      password: 'Por favor, ingrese su contraseña.'
    }
  });

  // Agregar regla de validación personalizada para el RUT
  $.validator.addMethod('validarRut', function(value, element) {
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

  // Manejar el evento click del botón "Guardar"
  $('#form button[type="submit"]').click(function(event) {
    event.preventDefault(); // Evitar el envío convencional del formulario
    if ($('#form').valid()) {
      // Si la validación es exitosa, recargar la página
      window.location.reload();
    } else {
      // Si hay campos vacíos o no válidos, mostrar mensajes de error
      $('#form').find('.is-invalid').first().focus();
    }
  });
});
