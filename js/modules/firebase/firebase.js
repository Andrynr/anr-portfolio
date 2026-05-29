import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5AZ4pwDOy-jNHGpIYa3Mes4LJq1s5oBc",
  authDomain: "anr-portfolio.firebaseapp.com",
  projectId: "anr-portfolio",
  storageBucket: "anr-portfolio.firebasestorage.app",
  messagingSenderId: "104833015463",
  appId: "1:104833015463:web:e685460affe6d03ed5c582",
  measurementId: "G-56GPNHHBWK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
