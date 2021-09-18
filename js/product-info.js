var product = {};
var commentsArray = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCommentsList(){

    let htmlContentToAppend = "";

    for(let i = 0; i < commentsArray.length; i++){
        let comment = commentsArray[i];

        htmlContentToAppend += `
            <div class="card p-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="img/blank_profile.png" width="30" class="user-img rounded-circle mr-2"> <span><small class="font-weight-bold text-primary">` + comment.user + `</small></div> <small>`+ comment.dateTime +`</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="user d-flex flex-row align-items-center">  <small class="font-weight-bold">`+ comment.description + `</small></span>  </div>
                    <div class="icons align-items-center"> <i class="fa fa-star text-warning"></i> <i class="fa fa-check-circle-o check-icon"></i> ` + comment.score + ` </div>
                </div>
            </div>
        `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }

// function califico(num){

//     let estrellas = "";

//     for (let i=1; i<5; i++){

//         if (i<=num){
//             estrellas += '<i class="fas fa-star"></i>';

//         }else{
//             estrellas += '<i class="fas fa-star "></i>';
//         }
//     }

//     return estrellas;
// }

function addComment(){

    let comentario = {};
    let fecha = new Date ();

    comentario.user = JSON.parse(localStorage.getItem("usuario"));
    comentario.description = document.getElementById("comentarioUsuario").value;
    comentario.score = parseInt(document.getElementById("calificacion").value);
    comentario.dateTime = fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    commentsArray.push(comentario);

    showCommentsList();

    document.getElementById("comentarioUsuario").value="";
    document.getElementById("calificacion").value="";

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldHTML = document.getElementById("productSold");
            let productCategoryHTML = document.getElementById("productCategory");
            // let productRelatedHTML = document.getElementById("productRelated");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description; 
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            // productRelatedHTML.innerHTML = product.relatedProducts;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            commentsArray = resultObj.data;

            showCommentsList();
        }
    });

});