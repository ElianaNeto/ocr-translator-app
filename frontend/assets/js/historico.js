function obterUsuario(){
  const data = localStorage.getItem("usuario")
  const usuario = JSON.parse(data)
  console.log(data)
  return usuario;
}

function deletar(id){
  $.ajax({
    url: `http://127.0.0.1:5000/historico/${id}`,
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
        alert("Apagado!");

    },
    fail: function(e) {
        console.log(e)
        alert("Erro!");
    }
});

}
const deletar_btn = document.getElementById('deletar-btn"');

const traducaoSelecionada="";

const codIdioma = {

  "pt": "Português",
  "it": "Italiano",
  "en":"Inglês",
  "es": "Espanhol",
  "fr": "Francês",
}

$(document).ready(function () {
  $.ajax({
   method: "get",
   contentType: 'application/json',
   url: `http://127.0.0.1:5000/utilizador/${obterUsuario().id}/historico/`,
   success: function (response) {
     console.log(response)
     console.log(response.Historicos)
    // document.getElementById("lista-traducoes").innerHTML += "<div><div/>"
       $('#card-traducoes').html(
         response.Historicos.map((r) =>
        `
        <div class="card-columns m-4" >
        <div class="card p-3 ">
        <blockquote class="blockquote mb-0 card-body">

        <button id="deletar-btn" onclick="deletar(${r.id})" class="btn border position-absolute btn-outline-danger" style="top: 20px; right: 20px">Deletar</button>
          <p>${r.texto_origem}</p>
          <footer class="blockquote-footer">
            <small class="text-muted" translatable="idioma-${r.idioma_origem}">
            ${codIdioma[r.idioma_origem]} : <cite title="Source Title">${r.idioma_origem}</cite>
            </small>
          </footer>
        </blockquote>

        <blockquote class="blockquote mb-0 card-body">
          <p>${r.texto_destino}</p>
          <footer class="blockquote-footer">
            <small class="text-muted" translatable="idioma-${r.idioma_destino}">
            ${codIdioma[r.idioma_destino]} : <cite title="Source Title">${r.idioma_destino}</cite>
            </small>
          </footer>
        </blockquote>
      </div>
    </div>



         `
         )
       )
   },
   fail: function(e) {
       console.log(e)
       alert("Erro!");
   }
 });

 

 });