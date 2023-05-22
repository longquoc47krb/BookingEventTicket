import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIUpESSkyoH0estmDKtf9Ru0sEeLORAYo",
  authDomain: "lotusticket-8e6f3.firebaseapp.com",
  projectId: "lotusticket-8e6f3",
  storageBucket: "lotusticket-8e6f3.appspot.com",
  messagingSenderId: "431975116943",
  appId: "1:431975116943:web:a50524a7e9c20e07bcc0fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;
