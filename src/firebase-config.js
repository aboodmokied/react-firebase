import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

//in production set that object into .env
const firebaseConfig = {
    apiKey: "AIzaSyDGYyd6wPF-tlH1iKVQs6Yrt9a7WNousaU",
    authDomain: "react-firebase-41658.firebaseapp.com",
    projectId: "react-firebase-41658",
    storageBucket: "react-firebase-41658.appspot.com",
    messagingSenderId: "572995691030",
    appId: "1:572995691030:web:89b79b2db1684c200e0b37",
    measurementId: "G-K5T07QHBR6"
  };

  //create connection
  const app = initializeApp(firebaseConfig);
  //database
  export const db=getFirestore(app)