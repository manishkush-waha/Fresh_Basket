// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSL-_qMM9F_A8T_Q0wSnjtPBPzQKwpLTw",
  authDomain: "foodie-cart-52ce0.firebaseapp.com",
  projectId: "foodie-cart-52ce0",
  storageBucket: "foodie-cart-52ce0.firebasestorage.app",
  messagingSenderId: "963943327725",
  appId: "1:963943327725:web:6ede472ae7450c9b9869e4",
  measurementId: "G-KVMMEJMHPE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);