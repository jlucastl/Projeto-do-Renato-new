const login = localStorage.getItem("log")

if(login === "false"){
   alert("Login Necessário!")
   window.location.href = "login.html"
}

const logout = document.getElementById("logout")
logout.addEventListener("click", out)

function out(){
   localStorage.setItem("log", "false")
}

/*Desculpe a bagunça meu querido amigo afonsio... sou dumb as fuck, tentei deixar o mais legível possível... */


/*Funcionalidades do menu lateral */
let menuIcon = document.getElementById("menuIcon")
let MENU = document.getElementById("MENU")
let cabecalhoMenu = document.getElementById("motion")
const avisoAluno = document.getElementById("AVISO_ALUNO")
avisoAluno.style.display = 'none'
const avisoSala = document.getElementById("AVISO_SALA")
avisoSala.style.display = 'none'
const avisoImagem = document.getElementById("AVISO_IMAGEM")
avisoImagem.style.display = 'none'

MENU.style.opacity = "0"
MENU.style.visibility = "hidden"

cabecalhoMenu.style.display = "none"

verificarSalas(); //Verifica se tem salas, se tiver salas ele tira a div dos alunos e troca pela de criar salas

function abrirMenu() {
   if(MENU.style.opacity == "1" && MENU.style.visibility == "visible") {
      MENU.style.opacity = "0"
      MENU.style.visibility = "hidden"
      menuIcon.style.color = "#f5f5f5"
      menuIcon.style.textShadow = "1px 2px 8px rgb(22, 22, 22)"
      cabecalhoMenu.style.display = "flex"
   }
   else {
      MENU.style.opacity = "1"
      MENU.style.visibility = "visible"
      menuIcon.style.textShadow = "0px 0px 5px gray"
      cabecalhoMenu.style.display = "flex"
   }
}

/* MODAL ------------------------------ */
   /* MODAL SALAS ------------------------------------------ */
document.getElementById("MODAL").style.display = "none"

function abrirModal() {
   document.getElementById("MODAL").style.display = "flex"
}

function fecharModal() {
   document.getElementById("MODAL").style.display = "none"
   document.getElementById("CORPO").style.filter = "none"
}

function criarSala() {

   const nome = document.getElementById("nomeSala").value;
   if (nome.trim() === "") {
      avisoSala.style.display = 'flex'
      return;
   }
   
   document.getElementById("msgMenu").style.display = "none"
   
   const containerLI = document.getElementById("SALAS")
   const salaLI = document.createElement("li")
   salaLI.className = "SALAS_LI"
   salaLI.innerHTML = `
   <div id = "REMOVER_SALA" class = "REMOVER_SALA" onclick="removerSala(this)"><span class="material-symbols-outlined" title="Remover Sala">close_small</span></div>
   <h3>${nome}</h3>
   </li>
   `;
   
   containerLI.appendChild(salaLI)
   
   fecharModal();
   verificarSalas();
   document.getElementById("nomeSala").value = "";
   avisoSala.style.display = "none"
}

/*Função que verifica se tem salas, se houver remove o "Sem salas" caso contrário adiciona pra nn ficar feio */

function verificarSalas() {
   const salasVazias = document.getElementById("SALAS_VAZIAS")
   const semSalas = document.getElementById("APRESENTACAO");
   const container = document.getElementById("SALAS");
   const msg = document.getElementById("msgMenu");

   
   if (container.querySelector(".SALAS_LI")) {
      msg.style.display = "none";
      semSalas.style.display = 'flex'
      salasVazias.style.display = 'none'
   } else {
      msg.style.display = "flex";
      semSalas.style.display = 'none'
      salasVazias.style.display = 'flex'
   }
}


/*Função que remove a sala */
document.getElementById("MODAL_REMOVER").style.display = "none"

const btnSim = document.getElementById("btn_confirmar")
const btnNao = document.getElementById("btn_cancelar")

function removerSala(elemento) {
  document.getElementById("MODAL_REMOVER").style.display = 'flex';
     document.getElementById("REMOVER_h1").textContent = "Tem certeza que deseja remover essa sala?"

  btnSim.onclick = function () {
    elemento.closest(".SALAS_LI").remove();
    verificarSalas();
    document.getElementById("MODAL_REMOVER").style.display = "none";
  };

  btnNao.onclick = function () {
    document.getElementById("MODAL_REMOVER").style.display = "none";
  };
}

/* MODAL ALUNOS --------------------------------- */



document.getElementById("MODAL_ALUNO").style.display = "none"

function abrirModalAluno() {
   document.getElementById("MODAL_ALUNO").style.display = "flex"
}

function fecharModalAluno() {
   document.getElementById("MODAL_ALUNO").style.display = "none"
   document.getElementById("CORPO").style.filter = "none"
}

function criarAluno() {
   const nomeAluno = document.getElementById("nomeAluno").value;
   const interiorCheck = document.getElementById("SEeINTERIOR")
   
   if (nomeAluno.trim() === "") {
      avisoAluno.style.display = 'flex'
      return;
   }
   
   document.getElementById("msg").style.display = "none";
   
   const containerInterior = document.getElementById("alunosInteriorContainer")
   const container = document.getElementById("alunosContainer");
   
   const salaDiv = document.createElement("div");
   salaDiv.id = 'aluno';
   salaDiv.classList.add("aluno");
   
   if(interiorCheck.checked) {
      salaDiv.classList.add("interior")
   }
   
   salaDiv.innerHTML = `
   <h3>${nomeAluno}</h3>
   </div>
   <div id = "OPCOES" class = "OPCOES"><span onclick="menuOpcoes(this, event)" class="material-symbols-outlined">
   more_horiz
   </span>
   <div id = "OPCOES_MENU" class = "OPCOES_MENU">
   <h2 id= "REMOVER_DIV" class = "REMOVER_DIV" onclick="removerDiv(this)"><span class="material-symbols-outlined">delete</span>Remover Aluno</h2>
   </div>
   </div>
   `;
   if(interiorCheck.checked) {
      document.getElementById("ALUNOS_INTERIOR").style.display = "block"
      containerInterior.appendChild(salaDiv)
   }
   else {
      document.getElementById("ALUNOS_CIDADE").style.display = "block"
   container.appendChild(salaDiv);
}
   let alunos = Array.from(container.querySelectorAll(".aluno"));

alunos.sort((a, b) => {
   // quem tem classe "interior" vem antes
   if (a.classList.contains("interior") && !b.classList.contains("interior")) return -1;
   if (!a.classList.contains("interior") && b.classList.contains("interior")) return 1;
   return 0; // mantém a ordem entre iguais
});

// Limpa o container e adiciona de novo na ordem
container.innerHTML = "";
alunos.forEach(aluno => container.appendChild(aluno));
   

   fecharModalAluno();
   document.getElementById("nomeAluno").value = "";
   interiorCheck.checked = false
   document.getElementById("TOGGLE").innerText = "toggle_off"
   avisoAluno.style.display = 'none'

   Imagem(salaDiv);
}
document.getElementById("SEeINTERIOR").innerText = "toggle_off"

function checkToggle() {
   let interior = document.getElementById("SEeINTERIOR")
   let toggle = document.getElementById("TOGGLE")

   if(interior.checked) {
      toggle.innerText = "toggle_off"
   }
   else {
      toggle.innerText = "toggle_on"
   }
}

const botaoEnviarImg = document.getElementById("BOTAO_IMAGEM")
const fileInput = document.getElementById("fileInput")
const enviarBtn = document.getElementById("enviarBtn");

document.getElementById("MODAL_IMAGEM").style.display = 'none'

let alvoDiv = null;
let imagemSelecionada = null;

// Abre modal de imagem para o elemento passado
function Imagem(elemento) {
    alvoDiv = elemento;
    document.getElementById("MODAL_IMAGEM").style.display = "flex";
}

// Fecha modal
function fecharModalImagem() {
    document.getElementById("MODAL_IMAGEM").style.display = "none";
    fileInput.value = "";
    imagemSelecionada = null;
}

// Abre seletor de arquivo
function escolherImagem() {
    fileInput.click();
}

// Captura imagem selecionada
fileInput.addEventListener("change", (event) => {
    imagemSelecionada = event.target.files[0] || null;
    document.getElementById("imagemIcon").innerText = "Imagem Escolhida";
});


// Envia imagem para a div alvo
function enviarImagem() {

    if (!imagemSelecionada) { 
        document.getElementById("AVISO_IMAGEM").style.display = 'flex'; 
        return; 
    }

    

    const leitor = new FileReader();
    leitor.onload = (e) => {
        alvoDiv.style.backgroundImage = `url(${e.target.result})`;
        alvoDiv.style.backgroundSize = "cover";
        alvoDiv.style.backgroundPosition = "center";
        fecharModalImagem();
        document.getElementById("AVISO_IMAGEM").style.display = 'none'; 
        document.getElementById("imagemIcon").innerText = "Escolha uma Imagem";
    };
    leitor.readAsDataURL(imagemSelecionada);
}

// Eventos dos botões do modal
botaoEnviarImg.addEventListener("click", escolherImagem);
enviarBtn.addEventListener("click", enviarImagem);
/*Verifica se tem alunos, se tiver remove o "Sem Alunos" caso contrário adiciona para nn quebrar o fluxo do site */

function verificarAlunos() {
   const container = document.getElementById("alunosContainer");
   const containerInterior = document.getElementById("alunosInteriorContainer")
   const msg = document.getElementById("msg");
   
   if(containerInterior.querySelector(".aluno")) {
      msg.style.display = "none";
      document.getElementById("ALUNOS_INTERIOR").style.display = "flex"
   }
   if(!containerInterior.querySelector('.aluno')) {
      document.getElementById("ALUNOS_INTERIOR").style.display = 'none'
   }

   else if (container.querySelector(".aluno")) {
      msg.style.display = "none";
      document.getElementById("ALUNOS_CIDADE").style.display = "flex"
   }

   if(!container.querySelector('.aluno')) {
      document.getElementById("ALUNOS_CIDADE").style.display = 'none'
   }

   if(!container.querySelector('.aluno') && !containerInterior.querySelector('.aluno')) {
      msg.style.display = "flex";
   }

    
}

/*Isso aq é sobre os 3 pontinhos encima da div dos alunos */

function menuOpcoes(elemento, event) {
   event.stopPropagation();
   
   let opcoes = elemento.nextElementSibling;
   let estaAberto = opcoes.style.display === "flex";

   
   let todosMenus = document.querySelectorAll(".OPCOES_MENU");
   todosMenus.forEach(menu => menu.style.display = "none");
   
   if (!estaAberto) {
      opcoes.style.display = "flex";
   }
   
}

/*Isso serve para que quando eu abra o menu dos 3 pontinhos em uma div e logo após em outra, nn fique 2 menus abertos */
document.addEventListener("click", function() {
   let todosMenus = document.querySelectorAll(".OPCOES_MENU");
   todosMenus.forEach(menu => menu.style.display = "none");
});

/*Deletar a div dos alunos */

function removerDiv(elemento) {
   document.getElementById("MODAL_REMOVER").style.display = 'flex';
   document.getElementById("REMOVER_h1").textContent = "Tem certeza que deseja remover esse aluno?"
   

btnSim.onclick = function () {
   elemento.closest(".aluno").remove()
   verificarAlunos();
   document.getElementById("MODAL_REMOVER").style.display = "none";
 };

 btnNao.onclick = function () {
   document.getElementById("MODAL_REMOVER").style.display = "none";
 };

}
