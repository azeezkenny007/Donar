// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4I-SfFFiagzMhoi8TrZAlANwaH77hVVk",
  authDomain: "donar-92200.firebaseapp.com",
  projectId: "donar-92200",
  storageBucket: "donar-92200.appspot.com",
  messagingSenderId: "1062880319338",
  appId: "1:1062880319338:web:7662f0afd389f3e54f7713"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {app,db}