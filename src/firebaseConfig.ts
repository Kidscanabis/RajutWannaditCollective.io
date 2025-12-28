// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "wannaditcollective.firebaseapp.com",
  projectId: "wannaditcollective",
  storageBucket: "wannaditcollective.appspot.com",
  messagingSenderId: "941972367629",
  appId: "1:941972367629:web:6c953e8ded88f27ec6f144",
  measurementId: "G-FXYSX3LFR"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
export const db = getFirestore(app);
