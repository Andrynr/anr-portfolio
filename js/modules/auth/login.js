import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { auth } from "../firebase/firebase.js";
import { hideSpinner, spinner } from "../animations/loader.js";

const form = document.getElementById("loginForm");
const spContainer = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner(spContainer);

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href =
      "https://andrynr.github.io/anr-portfolio/pages/stats.html";
  } catch (error) {
    alert(error.message);
  } finally {
    hideSpinner();
  }
});

// Login google
const provider = new GoogleAuthProvider();

const loginGgBtn = document.getElementById("btnGg");

loginGgBtn.addEventListener("click", async () => {
  spinner(spContainer);
  try {
    await signInWithPopup(auth, provider);

    window.location.href =
      "https://andrynr.github.io/anr-portfolio/pages/merci.html";
  } catch (error) {
    console.log(error);
  } finally {
    hideSpinner();
  }
});
