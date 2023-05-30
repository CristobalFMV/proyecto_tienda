// "title":
// "price":
// "description":
// "category":
// "image":




$(document).ready(function () {
  //NAVBAR
  // Crea una instancia de XMLHttpRequest
  var xhttp = new XMLHttpRequest();

  // Configura la solicitud
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Cuando la solicitud se complete correctamente,
      // actualiza el contenido de la barra de navegación
      document.getElementById("navbar").outerHTML = this.responseText;
    }
  };

  // Realiza la solicitud GET al archivo de la barra de navegación
  xhttp.open("GET", "navbar.html", true);
  xhttp.send();
  //api

  //footer
  // Crea una instancia de XMLHttpRequest
  var xhttp1 = new XMLHttpRequest();

  // Configura la solicitud
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Cuando la solicitud se complete correctamente,
      // actualiza el contenido de la barra de navegación
      document.getElementById("footer").outerHTML = this.responseText;
    }
  };

  // Realiza la solicitud GET al archivo del footer
  xhttp1.open("GET", "footer.html", true);
  xhttp1.send();
  //api

    $.get('https://fakestoreapi.com/products/',
        function(data) {
          
            //limpiar tabla
            $('#apis-ropita').empty();
            // es un ciclo for que recorre los productos que estan en data
            $.each(data, function(i,item) {
                //con esto trabajamos
                var fila = 
                `
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <img src="${item.image}" style="height:200px; width:170px" alt="">
                    <br>
                    <div class="item-title">
                      ${item.title}
                    </div>
                    <br>
                    <div class="item-price">
                      ${item.price}
                    </div>
                    <br>
                    <div class="item-desc">
                    ${item.description}
                    </div>
                    
                    <br>
                    <div class="item-categ">
                      ${item.category}
                    </div>
                  </div>
                `;
                
                $('#apis-ropita').append(fila);
            });
        }
    )
});