import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Função para converter arquivo em Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// ---------- CADASTRAR SALA ----------
document.getElementById("formSala").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nomeSala = document.getElementById("nomeSala").value;
  await addDoc(collection(db, "salas"), { nome: nomeSala });
  alert("Sala criada!");
  document.getElementById("nomeSala").value = "";
  document.getElementById("cSala").style.display="none"
  carregarSalas();
});

// ---------- LISTAR SALAS NO MENU ----------
async function carregarSalas() {
  const ulSalas = document.getElementById("lSalas");
  ulSalas.innerHTML = "";

  const select = document.getElementById("selectSala");
  select.innerHTML = '<option value="">Selecione a sala</option>';

  const querySnapshot = await getDocs(collection(db, "salas"));
  querySnapshot.forEach((docSnap) => {
    const sala = docSnap.data();
    const salaId = docSnap.id;

    // Adiciona no <ul>
    const li = document.createElement("li");
    li.innerHTML = `
      ${sala.nome} 
      <button class="rSala" onclick="removerSala('${salaId}')">❌</button>
    `;
    li.style.cursor = "pointer";

    // Clique mostra alunos da sala
    li.addEventListener("click", () => {
      mostrarAlunos(salaId, sala.nome);
    });

    ulSalas.appendChild(li);

    // Adiciona no <select> também
    select.innerHTML += `<option value="${salaId}">${sala.nome}</option>`;
  });
}

// ---------- CADASTRAR ALUNO ----------
document.getElementById("formAluno").addEventListener("submit", async (e) => {
  e.preventDefault();

  const salaId = document.getElementById("selectSala").value;
  const nome = document.getElementById("nomeAluno").value;
  const interior = document.getElementById("interiorAluno").checked;
  const arquivoFoto = document.getElementById("fotoAluno").files[0];

  if (!salaId) {
    alert("Selecione uma sala!");
    return;
  }

  const fotoBase64 = await toBase64(arquivoFoto);

  await addDoc(collection(db, "salas", salaId, "alunos"), {
    nome,
    interior,
    foto: fotoBase64
  });

  alert("Aluno cadastrado!");
  document.getElementById("nomeAluno").value = "";
  document.getElementById("interiorAluno").checked = false;
  document.getElementById("fotoAluno").value = "";

  mostrarAlunos(salaId);
});

// ---------- LISTAR ALUNOS DE UMA SALA ----------
async function mostrarAlunos(salaId, nomeSala = "") {
  const alunosBox = document.getElementById("alunosBox");
  alunosBox.innerHTML = nomeSala ? `<h3 class="dSala">Alunos da sala: ${nomeSala}</h3>` : "";

  // Criar listas para interior e cidade
  const ulInterior = document.createElement("ul");
  ulInterior.id = "lInterior";

  const ulCidade = document.createElement("ul");
  ulCidade.id = "lCidade";

  // Buscar alunos no Firestore
  const alunosCol = collection(db, "salas", salaId, "alunos");
  const queryAlunos = await getDocs(alunosCol);

  if (queryAlunos.empty) {
    alunosBox.innerHTML += "<p>Nenhum aluno cadastrado nesta sala.</p>";
    return;
  }

  queryAlunos.forEach((alunoDoc) => {
    const aluno = alunoDoc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <div id="pAluno">
        <button onclick="removerAluno('${salaId}', '${alunoDoc.id}')">❌</button>
        <img src="${aluno.foto}" />
        <p><b>${aluno.nome}</b></p>
      </div>
    `;

    if (aluno.interior) {
      ulInterior.appendChild(li);
    } else {
      ulCidade.appendChild(li);
    }
  });

  // Adiciona os títulos antes das listas
  if (ulInterior.children.length > 0) {
    const tituloInterior = document.createElement("h4");
    tituloInterior.className = "dSala";
    tituloInterior.textContent = "Alunos do Interior";
    alunosBox.appendChild(tituloInterior);
    alunosBox.appendChild(ulInterior);
  }

  if (ulCidade.children.length > 0) {
    const tituloCidade = document.createElement("h4");
    tituloCidade.className = "dSala";
    tituloCidade.textContent = "Alunos da Cidade";
    alunosBox.appendChild(tituloCidade);
    alunosBox.appendChild(ulCidade);
  }
}

// ---------- REMOVER ALUNO ----------
window.removerAluno = async (salaId, alunoId) => {
  if (confirm("Deseja realmente remover este aluno?")) {
    await deleteDoc(doc(db, "salas", salaId, "alunos", alunoId));
    mostrarAlunos(salaId);
  }
};

// ---------- REMOVER SALA ----------
window.removerSala = async (salaId) => {
  if (confirm("Deseja realmente remover esta sala? Todos os alunos serão removidos também!")) {
    // Deleta todos os alunos da sala
    const alunosCol = collection(db, "salas", salaId, "alunos");
    const queryAlunos = await getDocs(alunosCol);
    for (const alunoDoc of queryAlunos.docs) {
      await deleteDoc(doc(db, "salas", salaId, "alunos", alunoDoc.id));
    }

    // Deleta a sala
    await deleteDoc(doc(db, "salas", salaId));
    carregarSalas();
    document.getElementById("alunosBox").innerHTML = "";
  }
};

// ---------- INICIALIZAÇÃO ----------
carregarSalas();
