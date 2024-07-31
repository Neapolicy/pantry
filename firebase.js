// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPV3RCTCSApxZOjtq0_MyYF3OGwfWGA0g",
  authDomain: "pantryapp-91914.firebaseapp.com",
  projectId: "pantryapp-91914",
  storageBucket: "pantryapp-91914.appspot.com",
  messagingSenderId: "185950758086",
  appId: "1:185950758086:web:61834910afd2d6a85023c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export{firestore, collection, query, getDocs, doc, setDoc, deleteDoc, getDoc};