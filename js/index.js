/* Modification du thème */
const btn = document.getElementById("toggleTheme");
const html = document.documentElement;
const icon = document.getElementById("themeIcon");
// Thème enregistré
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = savedTheme || (prefersDark ? "dark" : "light");

html.setAttribute("data-bs-theme", defaultTheme);
updateIcon(defaultTheme);

btn.addEventListener("click", () => {
  const current = html.getAttribute("data-bs-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});
// Changement d’icône du thème
function updateIcon(theme) {
  btn.classList.add(theme === "dark" ? "btn-dark" : "btn-light");
  btn.classList.remove(theme === "dark" ? "btn-light" : "btn-dark");

  icon.classList.add("rotate");
  setTimeout(() => {
    icon.textContent = theme === "dark" ? "🌙" : "☀";
    icon.classList.remove("rotate");
  }, 400);
}

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

/* Carousel indicator */
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("shown.bs.modal", function () {
    const carousel = modal.querySelector(".carousel");

    const indicatorsContainer = carousel?.querySelector(".carousel-indicators");
    const items = carousel?.querySelectorAll(".carousel-item");
    const carouselId = carousel?.getAttribute("id");

    if (!carousel || !indicatorsContainer || !items) return;

    indicatorsContainer.innerHTML = "";

    items.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";

      button.setAttribute("data-bs-target", `#${carouselId}`);
      button.setAttribute("data-bs-slide-to", index);
      button.setAttribute("aria-label", `Slide ${index + 1}`);

      if (index === 0) {
        button.classList.add("active");
        button.setAttribute("aria-current", "true");
      }
      indicatorsContainer.appendChild(button);
    });
  });
});

/* Animation au défilement */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade-in").forEach((elmt) => {
  observer.observe(elmt);
});
