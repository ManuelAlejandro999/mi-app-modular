// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbB1iz-A6numwHsSrKS40jBHITnMaZvcM",
  authDomain: "mi-app-modular-maph.firebaseapp.com",
  projectId: "mi-app-modular-maph",
  storageBucket: "mi-app-modular-maph.firebasestorage.app",
  messagingSenderId: "276860446115",
  appId: "1:276860446115:web:aa154d54c763045d51a616",
  measurementId: "G-5YRLT7V8QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);