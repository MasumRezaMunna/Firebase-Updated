// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcqHgn6njuljJGRWrMGoPtzofLEUhiV8",
  authDomain: "email-password-auth-d2f32.firebaseapp.com",
  projectId: "email-password-auth-d2f32",
  storageBucket: "email-password-auth-d2f32.firebasestorage.app",
  messagingSenderId: "318341150871",
  appId: "1:318341150871:web:70729f6df9c5e7079291d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)