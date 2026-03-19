import initCarousel from "./modules/carousel.js";
import initNavBar from "./modules/navBar.js";
import initScrollAnim from "./modules/scrollAnimations.js";
import initTheme from "./modules/theme.js";
import initMultiLang from "./modules/typewriter.js";

async function initApp() {
  initTheme(); // Initialiser le thème
  initMultiLang(); // Initialiser le language
  initNavBar(); // Charge la barre de navigation
  initCarousel(); // Initialiser les carousels
  initScrollAnim(); // Initialise le scroll
}

initApp();
