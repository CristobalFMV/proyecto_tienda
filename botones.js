$(document).ready(function(){
    $("#mantenedor_prod").validate({
    rules:{
        IdProducto:{
          required : true,
          minlength: 5,
        },
        SelectorCategoria:{
          required: true,
        },
        Nombre:{
          required: true,
          minlength:5,
        },
        areaTexto:{
          required: true,
          minlength:5,
        },
        Precio:{
          required: true,
          number: true,
          minlength:5,
        },
        DescuentoSus:{
          required: true,
          number: true,
          minlength:2,
        },
        DescuentoOf:{
          required: true,
          number: true,
          minlength:2,
        },
      },
      messages: {
        IdProducto:{
          required: "El campo ID es requerido.",
          minlength:"Invalido"
        },
        SelectorCategoria:{
          required: "Seleccione una categoría.",
        },
        Nombre:{
          required: "El campo Nombre es requerido.",
        },
        areaTexto:{
          required: "El campo Descripción es requerido.",
        },
        Precio:{
          required: "El campo Precio es requerido.",
          number: "Ingrese un valor numérico para el Precio.",
          minlength:"No puede ser un valor tan bajo."
        },
        DescuentoSus:{
          required: "El campo Descuento suscriptor es requerido.",
          number: "Ingrese un valor numérico para el Descuento suscriptor.",
          minlength:"Ingrese un descuento válido",

        },
        DescuentoOf:{
          required: "El campo Descuento en oferta es requerido.",
          number: "Ingrese un valor numérico para el Descuento en oferta.",
          minlength: "Ingrese un descuento válido"
        },
      },
    });
  });
    $('#btnNuevo').click(function() { //------> pa limpiar el formulario con el boton azul
    $('form')[0].reset();
  });
  $('#btnGuardar').click(function() { //-----------> boton para guardar 
      alert('Se ha guardado correctamente');
  });
  $('#btnEliminar').click(function() {
    if (confirm('¿Desea eliminar el producto?')) {
        $('form')[0].reset();
    }
    
});

