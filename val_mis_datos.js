$(document).ready(function () {
  $('#myForm').submit(function (event) {
    event.preventDefault();

    if ($('#myForm').valid()) {
      window.location.href = "usuario.html";
    } else {
      $('#myForm').find('.is-invalid').first().focus();
    }
  });

  $('#myForm').validate({
    errorClass: 'is-invalid',
    errorElement: 'small',
    errorPlacement: function (error, element) {
      error.addClass('form-text-error');
      error.insertAfter(element);
    },
    rules: {
      Nombres:'required',
      Apellidos:'required',
      Rut:{
        required: true,
        validarRut: true
      },
      Correoelectronico:{
        required: true,
        Email: true
      },
      Password:'required',
      'confirm-password':{
        required: true,
        equalTo:'#password'
      },
      Dirección:'required'
    },
    messages:{
      Nombres:'Haga el favor de ingresar sus Nombres.',
      Apellidos:'Haga el favor, ingrese sus Apellidos.',
      Rut:{
        required:'Haga el favor de ingresar un Rut válido.'
      },
      Correoelectronico:{
        required:'Haga el favor de ingresar un correo electrónico válido.',
        Email:'Haga el favor de ingrese un correo electrónico válido.'
      },
      Password:'Haga el favor de ingresar su contraseña.',
      'confirm-password':{
        required:'Haga el favor de confirmar su contraseña.',
        equalTo:'Error, las contraseñas no coinciden.'
      },
      Dirección:'Haga el favor de ingresar su dirección.'
    }
  });

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
  }, 'Haga el favor de ingresar un Rut válido.');
});

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
