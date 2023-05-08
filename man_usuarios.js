$(document).ready(function () {
  // Al hacer clic en el botón "Nuevo", se limpian los campos del formulario
  $('button.btn-primary').click(function () {
    $('form')[0].reset();
  });

  // Al hacer clic en el botón "Guardar", se validan los campos y se envía el formulario
  $('button.btn-success').click(function () {
    // Validación de campos obligatorios
    var id = $('#IdProducto').val();
    var tipoUser = $('input[name="inlineRadioOptions"]:checked').val();
    var rut = $('#Rut').val();
    var nombre = $('#Nombre').val();
    var apellidos = $('#Apellidos').val();
    var direccion = $('#areaTexto').val();
    var correo = $('#email').val();
    var contraseña = $('#password').val();
    if (id == '' || tipoUser == undefined || rut == '' || nombre == '' || apellidos == '' || direccion == '' || correo == '' || contraseña == '') {
      alert('Por favor, complete todos los campos obligatorios');
      return false;
    }


    // Validación de ID
    $('#IdProducto').on('input', function () {
      var input = $(this);
      var id = input.val();
      if (id.length == 0) {
        input.removeClass("is-invalid");
        input.removeClass("is-valid");
        return;
      }
      if (!/^\d+$/.test(id)) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      }
    });

    // Validación de Tipo de Usuario
    $('input[type="radio"]').on('change', function () {
      var input = $(this);
      var value = input.val();
      if (value == "opcion1" || value == "opcion2") {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      } else {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      }
    });

    // Validación de Rut
    $('#Rut').on('input', function () {
      var input = $(this);
      var rut = input.val();
      if (rut.length == 0) {
        input.removeClass("is-invalid");
        input.removeClass("is-valid");
        return;
      }
      if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      }
    });
    // Validación de Nombre
    $('#Nombre').on('input', function () {
      var input = $(this);
      var name = input.val();
      if (name.length == 0) {
        input.removeClass("is-invalid");
        input.removeClass("is-valid");
        return;
      }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      }
    });

    // Validación de Apellidos
    $('#Apellidos').on('input', function () {
      var input = $(this);
      var lastName = input.val();
      if (lastName.length == 0) {
        input.removeClass("is-invalid");
        input.removeClass("is-valid");
        return;
      }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(lastName)) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      }
    });

    // Validación de Dirección
    $('#areaTexto').on('input', function () {
      var input = $(this);
      var address = input.val();
      if (address.length == 0) {
        input.removeClass("is-invalid");
        input.removeClass("is-valid");
        return;
      }
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+[0-9]*$/.test(address)) {
        input.removeClass("is-valid");
        input.addClass("is-invalid");
      } else {
        input.removeClass("is-invalid");
        input.addClass("is-valid");
      }
    });
    // Validación de formato de correo y contraseña
    var correoRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var contraseñaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!correoRegex.test(correo)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return false;
    }
    if (!contraseñaRegex.test(contraseña)) {
      alert('Por favor, ingrese una contraseña válida (mínimo 8 caracteres, al menos 1 número, 1 letra minúscula y 1 letra mayúscula)');
      return false;
    }

    // Si todos los campos son válidos, se envía el formulario
    $('form').submit();
  });

  // Al hacer clic en el botón "Eliminar", se muestra una confirmación antes de borrar el formulario
  $('button.btn-danger').click(function () {
    if (confirm('¿Está seguro de que desea eliminar este formulario?')) {
      $('form')[0].reset();
    }
  });
});
