var textarea = document.getElementById("texto-origem");
var fileSelector = document.querySelector('input')
const copybtn = document.getElementById('copybtn');

let inputLang ;
let outputLang ;


// Traducao da pagina

var idioma

function translate(lng, tagAttr){
  var translate = new Tradutor();
  translate.init(tagAttr, lng);
  translate.process();
}

$(document).ready(function(){
  $('.lista-idioma a').click(function() {
    
      $('.lista-idioma a').removeClass("active");
      $(this).addClass("active");  
      idioma = $(this).data("value");
      console.log("Lingua: ",idioma)
      translate(idioma, 'translatable');
      console.log("traduziu")
  });
});



// traducaoo de texto


var loadFile = function (event) {
	var output = document.getElementById('output');
	output.src = URL.createObjectURL(event.target.files[0]);
};

function recognizeFunction(){
  textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker()
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
          //$("#copybtn").addClass("d-none")
            textarea.innerHTML = 'Processando...'
        })
        .then(function (data) {
            textarea.innerHTML = data.text
           // $("#copybtn").removeClass("d-none")

        })
}
  $("#copybtn").click(function()  {
    copybtn.innerHTML = "Copiado!"
    navigator.clipboard.writeText(textarea.innerHTML)
  })

  function getLanguage(){
    inputLang = $(".from_language").val();
    outputLang = $(".to_language").val();
    var inputLangText = $(".from_language :selected").text();
    var outputLangText = $(".to_language :selected").text();
   // alert(`Traduzir de ${inputLangText}(${inputLang}) para ${outputLangText}(${outputLang})`)

  }


  async function traduzir(){
    getLanguage();

    var inputText = document.getElementById("texto-origem");
    var outputText = document.getElementById("texto-destino");
    //outputText.value = inputText.value;

    console.log(inputText.value)
    console.log(outputText.value)

    let text = inputText.value.trim()

      if(!text) return;

      outputText.setAttribute("placeholder", "Traduzindo...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${inputLang}|${outputLang}`;
      
      console.log(apiUrl)


      try {
        const res = await fetch(apiUrl)

        const data = await res.json()
        outputText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
          if (data.id === 0) {
            outputText.value = data.translation;
          }
        });
      } catch (error) {
        outputText.setAttribute("placeholder", "Sem resultados!");
      }
      

  }



  


 