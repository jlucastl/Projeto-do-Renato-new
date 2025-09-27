// Importa funções do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-AneoHdS_hji0liO5xfXsq6tSoQtS2UA",
  authDomain: "alunos-2dc87.firebaseapp.com",
  projectId: "alunos-2dc87",
  storageBucket: "alunos-2dc87.appspot.com",
  messagingSenderId: "654508484064",
  appId: "1:654508484064:web:d288b40e5a888009bab785"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta db para uso em outros arquivos
export { db };
