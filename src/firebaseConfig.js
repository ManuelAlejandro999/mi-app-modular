// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbB1iz-A6numwHsSrKS40jBHITnMaZvcM",
  authDomain: "mi-app-modular-maph.firebaseapp.com",
  projectId: "mi-app-modular-maph",
  storageBucket: "mi-app-modular-maph.firebasestorage.app",
  messagingSenderId: "276860446115",
  appId: "1:276860446115:web:aa154d54c763045d51a616",
  measurementId: "G-5YRLT7V8QR"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);

export default app;
