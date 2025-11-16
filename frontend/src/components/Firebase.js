// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6J3e1wItFTCkNZ14g-9EZqI1Ws4YZKGI",
  authDomain: "map-location-a1336.firebaseapp.com",
  databaseURL: "https://map-location-a1336-default-rtdb.firebaseio.com",
  projectId: "map-location-a1336",
  storageBucket: "map-location-a1336.firebasestorage.app",
  messagingSenderId: "985984902830",
  appId: "1:985984902830:web:c043f393cdbc3a92756f3f",
  measurementId: "G-NW9T7ZCDGL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Realtimedatabase = getDatabase(app);

const Firestoredb = getFirestore(app); // Firestore

export { auth, Realtimedatabase, Firestoredb };