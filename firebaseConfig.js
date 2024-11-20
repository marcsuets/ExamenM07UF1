import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGI1HA4cQnVofH_r-IY0g-0Wsy1Ybqv5o",
    authDomain: "examen-m07uf1.firebaseapp.com",
    projectId: "examen-m07uf1",
    storageBucket: "examen-m07uf1.firebasestorage.app",
    messagingSenderId: "547752292665",
    appId: "1:547752292665:web:b4017b8d46ff0732ea38e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };