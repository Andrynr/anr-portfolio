const initTheme = () => {
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
};

export default initTheme;
