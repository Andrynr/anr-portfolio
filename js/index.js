import initCarousel from "./modules/carousel.js";
import initModal from "./modules/modal.js";
import initNavBar from "./modules/navBar.js";
import loadProjects from "./modules/projects.js";
import initScrollAnim from "./modules/animations/scrollAnimations.js";
import initTheme from "./modules/theme.js";
import {
  initMultiLang,
  initTypewriter,
} from "./modules/animations/typewriter.js";
import { initLoading } from "./modules/preloader.js";
import { switchContent } from "./modules/switchContent.js";
import { trackVisit } from "./modules/firebase/analytics.js";

async function initApp() {
  trackVisit();

  initLoading();

  await loadProjects(); // Charge les projets
  await switchContent();
  await initMultiLang(); // Initialiser le language

  initTypewriter();

  initTheme(); // Initialiser le thème
  initNavBar(); // Charge la barre de navigation
  initScrollAnim(); // Initialise le scroll
  initModal();
  initCarousel(); // Initialiser les carousels
}

initApp();
