atualizaCartao("titulo", "cartao-titulo")
atualizaCartao("ano", "cartao-ano")
atualizaCartao("mensagem", "cartao-mensagem")

let campoImagemFrente = document.querySelector("#imagem-frente")
campoImagemFrente.addEventListener("keyup", function() {
    let srcImagemFrente = campoImagemFrente.value    
    if (srcImagemFrente.trim == "") {
        campoImagemFrente.src = "tf.png"
        return
    }
    let imagemFrenteCartao = document.querySelector("#cartao-imagem-frente")
    imagemFrenteCartao.src = srcImagemFrente
       
})

let campoImagemFundo = document.querySelector("#imagem-fundo")
campoImagemFundo.addEventListener("keyup", function() {
    console.log("teste")
    let srcImagemFundo = campoImagemFundo.value    
    if (srcImagemFundo.trim() == "") {
        campoImagemFundo.backgroundImage = "url(fundo1.png)"
        return
    }
    let imagemFundoCartao = document.querySelector("#cartao")
    imagemFundoCartao.style.backgroundImage = `url(${srcImagemFundo})`
})

function atualizaCartao(idCampoFormulario, idElementoCartao) {
    let campo = document.querySelector("#" + idCampoFormulario)
    campo.addEventListener("keyup", function() {
        let campoDigitado = campo.value
        document.querySelector("#" + idElementoCartao).textContent = campoDigitado
        if (campoDigitado.trim() == "") {
            document.querySelector("#" + idElementoCartao).textContent = "Que este novo ano seja repleto de saúde e muitas realizações."
        }
    })      
}

async function compartilhar() {   
    let cartao = document.querySelector("#cartao")    
    let canva = await html2canvas(cartao)
    const dataUrl = canva.toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray = [new File([blob], 'fundo1.png', { type: blob.type, lastModified: new Date().getTime() })]
    const shareData = { files: filesArray }
    navigator.share(shareData).then(() => { console.log('Shared successfully') })
}

let botaoCompartilhar = document.querySelector("form")
botaoCompartilhar.addEventListener("submit", function(event) {
    event.preventDefault()
    compartilhar()    
})