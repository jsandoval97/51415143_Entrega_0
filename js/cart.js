var carritoArray = [];

function showCart(){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < carritoArray.articles.length; i++){
        let carrito = carritoArray.articles[i];

        htmlContentToAppend += `
				 					<div class="row">
					 					<div class="col-md-3">
					 						<img class="img-fluid mx-auto d-block image" src="` + carrito.src + `">
					 					</div>
					 					<div class="col-md-8">
					 						<div class="info">
						 						<div class="row">
							 						<div class="col-md-5 product-name">
							 							<div class="product-name">
								 							<a href="#">` + carrito.name + `</a>
								 							<div class="product-info">
									 							<div>Costo Unitario: <span class="value">` + carrito.currency + `</span><span class="value">`+ " " + carrito.unitCost + `</span></div>
									 						</div>
									 					</div>
							 						</div>
							 						<div class="col-md-4 quantity">
							 							<label for="quantity">Cantidad:</label>
							 							<input id="quantity" type="number" value ="` + carrito.count + `" class="form-control quantity-input">
							 						</div>
							 						<div class="col-md-3 price">
							 							<span>` + carrito.currency + " " +`</span>` + carrito.unitCost * carrito.count + `<span></span>
							 						</div>
							 					</div>
							 				</div>
					 					</div>
					 				</div>
				 				
        `
        }

        document.getElementById("cartProduct").innerHTML = htmlContentToAppend;
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {

            carritoArray = resultObj.data;

        
            showCart();
        }
    });

    let usuario = JSON.parse(localStorage.getItem("usuario"));
        document.getElementById("nombreUsuario").innerHTML = usuario;
});
