var carritoArray = [];
var selectEnvio = [];

function showCart(){

    for(let i = 0; i < carritoArray.articles.length; i++){
        let carrito = carritoArray.articles[i];
		let productDiv = document.createElement('div');
		productDiv.classList.add("row");



        productDiv.innerHTML += `
				 					
					 					<div class="col-md-3">
					 						<img class="img-fluid mx-auto d-block image" src=${carrito.src} " alt="Sample">
					 					</div>
					 					<div class="col-md-8">
					 						<div class="info">
						 						<div class="row">
							 						<div class="col-md-5 product-name">
							 							<div class="product-name">
								 							<a href="#"> ${carrito.name} </a>
								 							<div class="product-info">
									 							<div>Costo Unitario: <span class="value" id="moneda"> ${carrito.currency} </span><span class="value" id="precio">`+ " " + carrito.unitCost + `</span></div>
									 						</div>
									 					</div>
							 						</div>
							 						<div class="col-md-4 quantity">
							 							<label for="quantity">Cantidad:</label>
							 							<input id="quantity" type="number" value = ${carrito.count} class="form-control quantity-input"> 
							 						</div>
							 						<div class="col-md-3 price">
							 							<span> ${carrito.currency} </span><span> ${carrito.unitCost * carrito.count} </span>
							 						</div>
							 					</div>
							 				</div>
										</div>
										
					 				
				 				
        `
		
		let inputQuantity = productDiv.getElementsByClassName("quantity-input") [0]

		inputQuantity.addEventListener('change', (e)=>{

			productDiv.getElementsByClassName("price") [0].innerHTML = `<span> ${carrito.currency} </span><span> ${carrito.unitCost * e.target.value } </span>`

			showTotal();
			metodoEnvioSelection()

		})
		
		document.getElementById("cartProduct").appendChild(productDiv);

		}
        

    }

	
	function showTotal(){

	 	let htmlContentToAppend = "";

     	for(let i = 0; i < carritoArray.articles.length; i++){


         	let product = carritoArray.articles[i];
	 		let cantProduct = document.getElementById("quantity");
			let precioEnvio = selectEnvio
	 		let precioCompra = product.unitCost * cantProduct.value; 
			let precioTotal = precioCompra + parseInt(precioEnvio);
			
        	htmlContentToAppend +=   `

	 		<h3>Sumario</h3>
                     <div class="summary-item"><span class="text">Subtotal</span><span type="number" class="price">${precioCompra}</span></div>
                     <div class="summary-item"><span class="text">Env??o</span><span class="price">${precioEnvio}</span></div>
                     <div class="summary-item"><span class="text">Total</span><span class="price">${precioTotal}</span></div>
                     <button type="button" class="btn btn-primary btn-lg btn-block" onclick="validar();">Ir a pagar</button>

	 				`
	}

	document.getElementById("cuentas").innerHTML = htmlContentToAppend;

}

function guardarPago() {

	let pulsado = document.metodoPago;
	for (i=0; i<pulsado.length; i++) {
        valor = pulsado[i].checked;
              if (valor == true) {
                 elegido = pulsado[i].value;
                 }
              }

		document.getElementById("formaPago").innerHTML = elegido;

	}

	function validar(){

		let calle = document.getElementById('calle');
		let numero = document.getElementById('numero');
		let esquina = document.getElementById('esquina');
		let pais = document.getElementById('pais');
		
		if ((calle.value === '') || (numero.value === '') || (esquina.value === '') || (pais.value === '')){
			alert("Debe completar todos los datos")
		}

		else{

			location.href="index.html"

		}
	
	}
	
	function metodoEnvioSelection(){
		let pulsado = document.metodoEnvio;
				for (i=0; i<pulsado.length; i++) {
        			valor = pulsado[i].checked;
              			if (valor == true) {
                	 		elegido = pulsado[i].value;
                 			}
              			}

					selectEnvio = elegido

			}
	
	// function actualizarCarritoArray(num){

	// 	let carritoArrayNew = carritoArray
	// 	carritoArrayNew.count = num
	// 	carritoArray = carritoArrayNew
	// }

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {

            carritoArray = resultObj.data;

        
            showCart();
			showTotal();
        }
    });

    let usuario = JSON.parse(localStorage.getItem("usuario"));
        document.getElementById("nombreUsuario").innerHTML = usuario;
});
