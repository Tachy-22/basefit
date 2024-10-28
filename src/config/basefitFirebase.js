import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApfg07eE7zNik68hyceuahWUMHxvnqP4U",
    authDomain: "basefit-app.firebaseapp.com",
    projectId: "basefit-app",
    storageBucket: "basefit-app.appspot.com",
    messagingSenderId: "961856782213",
    appId: "1:961856782213:web:37b17befaff9bdf7ee4eec",
    measurementId: "G-QSG7YNJYE0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };