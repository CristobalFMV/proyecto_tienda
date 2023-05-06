$(document).ready(function() {
  $('#btnNuevo').click(function() { //------> pa limpiar el formulario con el boton azul
    $('form')[0].reset();
  });
  $('#btnGuardar').click(function() { //-----------> boton para guardar 
      var id = $('#IdProducto').val();
      var categoria = $('#SelectorCategoria').val();
      var nombre = $('#Nombre').val();
      var descripcion = $('#areaTexto').val();
      var precio = $('#Precio').val();
      var descuentoSuscriptor = $('#DescuentoSus').val();
      var descuentoOferta = $('#DescuentoOf').val();
      
      if (id.trim() == '') {
          alert('El ID no puede estar vacío');
          return false;
      }
      if (nombre.trim() == '') {
          alert('El Nombre no puede estar vacío');
          return false;
      }
      if (descripcion.trim() == '') {
          alert('Ingrese una descripción');
          return false;
      }
      if (precio.trim() == '') {
          alert('El campo precio no puede estar vacío');
          return false;
      }
      if (descuentoSuscriptor.trim() == '') {
          alert('El campo descuento susc no puede estar vacío');
          return false;
      }
      if (descuentoOferta.trim() == '') {
          alert('El campo descuento oferta no puede estar vacío');
          return false;
      }
      alert('Se ha guardado correctamente');
  });
  $('#btnEliminar').click(function() {
    if (confirm('¿Desea eliminar el producto?')) {
        $('form')[0].reset();
    }
});
});
