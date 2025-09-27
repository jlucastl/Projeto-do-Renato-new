/*Mostrar menu criar sala */
const nSala = document.getElementById("nSala")
nSala.addEventListener("click", criarsala)

function criarsala(){
    if(document.getElementById("cSala").style.display=="flex"){
    document.getElementById("cSala").style.display="none"}

    else{
        document.getElementById("cSala").style.display="flex"
    }
}

document.getElementById('colocarImagem').addEventListener('click', function() {
    document.getElementById('fotoAluno').click()
    document.getElementById('colocarImagem').style.border = 'dashed 3.5px green'
    document.getElementById('imagemLogo').style.color = 'green'
    document.getElementById('imagemLogo').innerText = 'image'
})

/*Mostrar lista de salas*/
const mSala = document.getElementById("mSala")

function mostrarLista(){


    if(document.getElementById("listaS").style.display=="none"){
    document.getElementById("listaS").style.display = "flex"
    }

    else{
    document.getElementById("listaS").style.display="none"
    }
}

mSala.addEventListener("click", mostrarLista)


/*Mostrar menu criar aluno*/
const nAluno = document.getElementById("nAluno")
nAluno.addEventListener("click", criaraluno)

function criaraluno(){

    document.getElementById("listaS").style.display = "none"
    
    if(document.getElementById("cAluno").style.display=="none" || document.getElementById("cAluno").style.display==""){
    document.getElementById("cAluno").style.display="flex"
}

    else{
        document.getElementById("cAluno").style.display="none"
    }
}