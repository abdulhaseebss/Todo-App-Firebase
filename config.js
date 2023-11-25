import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyD-5wOsBll1RSUl4sveinTCw4xRz0Rz2qc",
  authDomain: "haseeb-todo.firebaseapp.com",
  projectId: "haseeb-todo",
  storageBucket: "haseeb-todo.appspot.com",
  messagingSenderId: "506036903769",
  appId: "1:506036903769:web:1f9936faabd92c28de7648",
  measurementId: "G-228JBEEZWX"
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);