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
                <div>
                    <p> + comment.description + </p>
                </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
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
            let productRelatedHTML = document.getElementById("productRelated");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description; 
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productRelatedHTML.innerHTML = product.relatedProducts;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showCommentsList();
        }
    });
});