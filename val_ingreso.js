$(document).ready(function(){
  $("#formulario_ing").validate({
    rules:{
      email:{
        required : true,
        email: true,
      },
      password:{
        required: true,
        minlength: 5,
      },
    },
    messages: {
      email:{
        required: "El campo email es requerido.",
        email: "El email no cumple con el formato de correo.",
      },
      password:{
        required:"La contraseña es obligatoria.",
        minlength:"Mínimo 5 caracteres.",
      },
    },
  });
});