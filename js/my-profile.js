function validarDatos (){

    let nombreUsuario = document.getElementById("nombreUsuario");
    let apellidoUsuario = document.getElementById("apellidoUsuario");
    let emailUsuario = document.getElementById("mailUsuario");
    let contraUsuario = document.getElementById("contraUsuario");
    let telefonoUsuario = document.getElementById("telefonoUsuario");
    
    if ((nombreUsuario.value === '') || (apellidoUsuario.value === '') || (emailUsuario.value === '') || (contraUsuario.value === '') || (telefonoUsuario.value === '')){
        alert("Debe completar los datos")
    }

    else{

        location.href="my-profile.html";
        localStorage.setItem("datoN", JSON.stringify(document.getElementById("nombreUsuario").value));
        localStorage.setItem("datoA", JSON.stringify(document.getElementById("apellidoUsuario").value));
        localStorage.setItem("datoM", JSON.stringify(document.getElementById("mailUsuario").value));
        localStorage.setItem("datoT", JSON.stringify(document.getElementById("telefonoUsuario").value));



    }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let usuario = JSON.parse(localStorage.getItem("usuario"));
        document.getElementById("UserName").innerHTML = usuario;

    let nombreUsuario = JSON.parse(localStorage.getItem("datoN"));
        document.getElementById("mostrarNombre").innerHTML = nombreUsuario;

    let apellidoUsuario = JSON.parse(localStorage.getItem("datoA"));
        document.getElementById("mostrarApellido").innerHTML = apellidoUsuario;

    let emailUsuario = JSON.parse(localStorage.getItem("datoM"));
        document.getElementById("mostrarMail").innerHTML = emailUsuario;

    let telefonoUsuario = JSON.parse(localStorage.getItem("datoT"));
        document.getElementById("mostrarTel").innerHTML = telefonoUsuario;


});