import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXw8_phHPARSuo_fvxhLd2yRm-qNZLB0U",
  authDomain: "booking-event-ticket-4cd72.firebaseapp.com",
  projectId: "booking-event-ticket-4cd72",
  storageBucket: "booking-event-ticket-4cd72.appspot.com",
  messagingSenderId: "714598463208",
  appId: "1:714598463208:web:2413af51ec32e9eb4b7b5d",
  measurementId: "G-WXZNTGHQBL",
};
console.log("Init completed!");

const app = initializeApp(firebaseConfig);
export const Authentication = getAuth(app);
