$(document).ready(function(){
  $("#formulario_ing").validate({
    rules:{
      rut:{
        required: true,
        minlenght: 8,
      },
      nombres:{
        required: true,
        minlenght: 3,
      },
      apellidos:{
        required: true,
        minlenght: 5,
      },
      email:{
        required: true
      },
      direccion:{},
      contraseña1:{},
      contraseña2:{},
    },
    messages: {

    }
  })
})