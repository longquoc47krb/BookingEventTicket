import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcU_lmSMxHHbTgkVfCyh4retcjlbopVjc",
  authDomain: "lotus-ticket.firebaseapp.com",
  projectId: "lotus-ticket",
  storageBucket: "lotus-ticket.appspot.com",
  messagingSenderId: "21703928834",
  appId: "1:21703928834:web:8db326b28906cb3bbfcb1b",
};

// Initialize Firebase
console.log("Firebase Initialize");
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;
