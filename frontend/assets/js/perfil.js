//document.getElementById("perfil-titulo").innerHTML += obterUsuario().nome_user;
const codIdioma = {
  "pt": "Português",
  "it": "Italiano",
  "en":"Inglês",
  "es": "Espanhol",
  "fr": "Francês",
}

document.getElementById("perfil-nome").innerHTML += obterUsuario().nome_completo;
document.getElementById("perfil-nomeusuario").innerHTML += obterUsuario().nome_user;
document.getElementById("perfil-email").innerHTML += obterUsuario().email;
document.getElementById("perfil-idioma").innerHTML += codIdioma[obterUsuario().idioma];





$(document).ready(function () {
  $.ajax({
   method: "get",
   contentType: 'application/json',
   url: `http://127.0.0.1:5000/utilizador/${obterUsuario().id}/historico/`,
   success: function (response) {
     console.log(response)
     console.log(response.Historicos)
     document.getElementById("total-traducoes").innerHTML += response.Historicos.length
       
   },
   fail: function(e) {
       console.log(e)
       alert("Erro!");
   }
 });

 });