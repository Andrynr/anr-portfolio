import initTheme from "./modules/theme.js";
import initMultiLang from "./modules/typewriter.js";
import initNavBar from "./modules/navBar.js";
import initScrollAnim from "./modules/scrollAnimations.js";
import initCarousel from "./modules/carousel.js";
import loadProjects from "./modules/projects.js";
import initModal from "./modules/modal.js";

async function initApp() {
  await loadProjects(); // Charge les projets
  await initMultiLang(); // Initialiser le language

  initTheme(); // Initialiser le thème
  initNavBar(); // Charge la barre de navigation
  initScrollAnim(); // Initialise le scroll
  initModal();
  initCarousel(); // Initialiser les carousels
}

initApp();
