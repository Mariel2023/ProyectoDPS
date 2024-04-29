// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA17wHZEu0LD2nodVtlSugo82O_pI62Nuw",
  authDomain: "constructora-2365a.firebaseapp.com",
  projectId: "constructora-2365a",
  storageBucket: "constructora-2365a.appspot.com",
  messagingSenderId: "195020519304",
  appId: "1:195020519304:web:c7a9f38d3db3fa89772c3d"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase