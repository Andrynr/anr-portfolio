export default function initNavBar() {
  /* Fermer automatiquement la barre de navigation */
  const navigation = document.getElementById("navigation");

  window.addEventListener("click", (e) => {
    if (!navigation.contains(e.target)) {
      navigation.classList.remove("show");
    }
  });

  navigation.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("show");
    });
  });
}
