const form = document.getElementById("formCadastro");
const login = localStorage.getItem("log")

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const senha = document.getElementById("SENHA").value.trim();

    let formularioValido = true;

    if(senha !== "if2025"){
        localStorage.setItem("log", "false")
        mostrarErro("erroSenha", "Senha incorreta");
        formularioValido = false;
    }

if(!formularioValido) return;

localStorage.setItem("log", "true")
window.location.href="index.html"

form.reset();

})

function mostrarErro(id, msg){
    document.getElementById(id).textContent = msg;
}
