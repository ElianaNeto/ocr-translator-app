

function obterUsuario(){
  const data = localStorage.getItem("usuario")
  const usuario = JSON.parse(data)
  console.log(data)

  return usuario;
}

  $(document).ready(function () {
    

    $('#btn-login').click(function () {
      
      $.ajax({
        method: "post",
        data: JSON.stringify({
          nome_user: $("#loginName").val(),
          senha: $("#loginPassword").val()
        }),
        contentType: 'application/json',
        url: "http://127.0.0.1:5000/login",
        success: function (response) {
            console.log(response.utilizador)
            localStorage.setItem("usuario",JSON.stringify(response.utilizador))

            window.location.replace('home.html');
            //window.location.href = './home.html'
        },
        fail: function(e) {
            console.log(e)
            alert("Erro!");
        }
      });
      return false;
    });

    $('#btn-cadastro').click(function () {
      $.ajax({
        method: "post",
        data: JSON.stringify({
    
          nome_completo: $("#registerName").val(),
          nome_user: $("#registerUsername").val(),
          senha: $("#registerPassword").val(),
          email: $("#registerEmail").val(),
          idioma: $('#lang option:selected').val(),
        }),
        contentType: 'application/json',
        url: "http://127.0.0.1:5000/cadastro",
        success: function (response) {
            console.log(response)
            localStorage.setItem("usuario",JSON.stringify(response.utilizador))

            window.location.replace('home.html');
            //alert("Cadastro feito com sucessso!");

            //window.location.href = './home.html'
        },
        fail: function(e) {
            console.log(e)
            alert("Erro!");
        }
      });
      //this is mandatory other wise your from will be submitted. return false;
      return false; 

    });

    $('#btn-traduzir').click(async function () {

      await traduzir()


      $.ajax({
        method: "post",
        data: JSON.stringify({
          texto_origem: $("#texto-origem").val(),
          texto_destino: $("#texto-destino").val(),
          idioma_origem: $(".from_language option:selected").val(),
          idioma_destino: $(".to_language option:selected").val(),
          id_utilizador: obterUsuario().id
          }),
        contentType: 'application/json',
        url: "http://127.0.0.1:5000/cadastro_historico",
        success: function (response) {
            console.log(response)

            //window.location.replace('home.html');
            //window.location.href = './home.html'
        },
        fail: function(e) {
            console.log(e)
            alert("Erro!");
        }
      });


      return false;
    });
    
    $('#btn-sair').click(function () {
      localStorage.removeItem('usuario');
    });


  });


