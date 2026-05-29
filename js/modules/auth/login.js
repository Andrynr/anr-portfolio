import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { auth } from "../firebase/firebase.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "/pages/stats.html";
    console.log(window.location.href);
  } catch (error) {
    alert(error.message);
  }
});

// Login google
const provider = new GoogleAuthProvider();

const loginGgBtn = document.getElementById("btnGg");

loginGgBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);

    window.location.href = "/pages/stats.html";
  } catch (error) {
    console.log(error);
  }
});
