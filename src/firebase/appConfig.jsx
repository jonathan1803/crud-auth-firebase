// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDGQzGAnp1NdV3jQksUFfITo0XxiQy3aU",
    authDomain: "crud-firebase-30185.firebaseapp.com",
    projectId: "crud-firebase-30185",
    storageBucket: "crud-firebase-30185.firebasestorage.app",
    messagingSenderId: "254971507096",
    appId: "1:254971507096:web:3379995b2ce541667d7bed"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//creamos una constante que nos va ayudar a conectarnos a la bd de firebase
const db = getFirestore(app)
const auth_user = getAuth(app)
const providerGoogle = new GoogleAuthProvider()
export default db
// Exportamos db, auth y googleProvider
export  { auth_user, providerGoogle }; 
