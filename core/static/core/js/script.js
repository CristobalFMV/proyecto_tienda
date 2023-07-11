// "title":
// "price":
// "description":
// "category":
// "image":

$(document).ready(function () {
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