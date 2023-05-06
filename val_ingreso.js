$(document).ready(function() {
  $('#formulario_ing').submit(function(event) {
    event.preventDefault(); // se detiene el envío del formulario
    var email = $('#email').val();
    var contraseña = $('#contraseña').val();
    var confirmar = $('#confirmar').prop('checked');
		var emailFormato = /^\S+@\S+\.\S+$/;
    if (email == '') {
      alert('Debe ingresar un correo electrónico.');
      return;
    }else if (!emailFormato.test(email)){
			alert('Debe ingresar un correo electronico válido');
			return;
		}
    if (contraseña == '') {
      alert('Debe ingresar una contraseña.');
      return;
    }
    if (!confirmar) {
      alert('Debe confirmar que desea recordar su sesión.');
      return;
    }
    // si llega aquí el formulario es válido
    alert('Formulario válido, enviando datos...');
    $('#formulario_ing')[0].submit();
  });
});