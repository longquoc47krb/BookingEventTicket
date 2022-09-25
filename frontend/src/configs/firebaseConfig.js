import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXw8_phHPARSuo_fvxhLd2yRm-qNZLB0U",
  authDomain: "booking-event-ticket-4cd72.firebaseapp.com",
  projectId: "booking-event-ticket-4cd72",
  storageBucket: "booking-event-ticket-4cd72.appspot.com",
  messagingSenderId: "714598463208",
  appId: "1:714598463208:web:2413af51ec32e9eb4b7b5d",
  measurementId: "G-WXZNTGHQBL",
};

// Initialize Firebase
console.log("Firebase Initialize");
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export default app;
