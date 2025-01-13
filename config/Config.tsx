// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQnjycfh2ffatvmLuFR_OwCsbPlMAc3hM",
  authDomain: "hh-prueba.firebaseapp.com",
  databaseURL: "https://hh-prueba-default-rtdb.firebaseio.com",
  projectId: "hh-prueba",
  storageBucket: "hh-prueba.firebasestorage.app",
  messagingSenderId: "1010788032719",
  appId: "1:1010788032719:web:b774b484911fb3e38b97ba",
  measurementId: "G-SZ7XS6XE5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);