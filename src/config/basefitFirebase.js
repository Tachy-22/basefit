import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAWal-sEbsZz3iNIe4vIUvc9LYDXdc5xhc",
    authDomain: "basefit-d34d4.firebaseapp.com",
    projectId: "basefit-d34d4",
    storageBucket: "basefit-d34d4.appspot.com",
    messagingSenderId: "1074165929235",
    appId: "1:1074165929235:web:577d5daa1caef64e7cb6e6",
    measurementId: "G-N4KQQS73T7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };