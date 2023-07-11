//-->> jq ready
$().ready(function() {

  // validate signup form on keyup and submit
  $("#form").validate({
    errorClass: 'is-invalid',
    errorElement: 'small',
    errorPlacement: function(error, element) {
      error.addClass('form-text-error');
      error.insertAfter(element);
    },

    rules: {

      IdProducto: {
        required: true,
        minlength: 2
      },

      Rut: {
        required: true,
        validarRut: true
      },

      nombre: {
        required: true,
        minlength: 3
      },

      apellido: {
        required: true,
        minlength: 3
      },

      direccion: {
        required: true,
        minlength: 10
      },

      email: {
        required: true,
        email: true
      },

      password: {
        required: true,
        minlength: 6
      }
    },


    messages: {

      IdProducto: {
        required: "Por favor, ingrese un ID.",
        minlength: "ID no válido"
      },

      Rut: {
        required: "Por favor, ingrese un RUT.",
        validarRut: "RUT no es válido."
      },

      nombre: {
        required: "Por favor, ingrese sus nombres.",
        minlength: "Su nombre debe ser mas largo."
      },

      apellido: {
        required: "Por favor, ingrese sus apellidos.",
        minlength: "Su apellido debe ser mas largo."
      },

      direccion: {
        required: "Por favor, ingrese sus dirección.",
        minlength: "Su dirección debe ser almenos de 10 caracteres."
      },

      email: {
        required: "Por favor, ingrese un correo electrónico válido.",
        email: "Por favor, ingrese un correo electrónico válido."
      },

      password: {
        required: "Por favor, ingrese su contraseña.",
        minlength: "Contraseña incorrepta."
      }


    }

 });


  // this method to validate the RUT
  $.validator.addMethod('validarRut', function(value, element) {

    var value = value.replace(/\./g, '').replace('-', '');

    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) { return true; }

    else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) { return true; }

    else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) { return true; }

    else if (value.match(/^(\d)(\d{0,2})$/)) { return true; }

    return false;

  }, 'Por favor, ingrese un RUT válido.'); // por razones d esteticas eliminee este return




  //------------👇------------//
  // before submittion do this ->>
  $("#form").on("submit",() => {

    // Si la validación es exitosa, recargar la página
    if ($('#form').valid()) {

      window.location.reload();

    // Si hay campos vacíos o no válidos, mostrar mensajes de error
    } else {

      $('#form').find('.is-invalid').first().focus();

    }

  });


});// jqery
