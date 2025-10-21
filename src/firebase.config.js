// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkFwS-I453q3TcRDME8lhMgX4snM5nHm4",
  authDomain: "fir-fighter-e66e5.firebaseapp.com",
  projectId: "fir-fighter-e66e5",
  storageBucket: "fir-fighter-e66e5.firebasestorage.app",
  messagingSenderId: "484474569367",
  appId: "1:484474569367:web:bc1f1981014a0ea113dfd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
