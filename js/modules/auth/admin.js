import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { auth } from "../firebase/firebase.js";

export function requireAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href =
        "https://andrynr.github.io/anr-portfolio/pages/login.html";
      return;
    }

    console.log("Connected : ", user.email);

    callback(user);
  });
}

export const logOut = async () => {
  await signOut(auth);

  window.location.href =
    "https://andrynr.github.io/anr-portfolio/pages/login.html";
};
