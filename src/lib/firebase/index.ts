// src/firebaseInit.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);

export const storage = getStorage(app);

export default app;
