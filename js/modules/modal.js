import { getProjects } from "../../api/projects-api.js";
import { loadCarousel } from "./carousel.js";

let tousLesProjets = {};
let projet = {};
const modalEl = document.getElementById("modal");

const initModal = async () => {
  // Chargement du json de projets
  tousLesProjets = await getProjects();

  const modal = new bootstrap.Modal(modalEl);

  document.querySelectorAll(".preview").forEach((button) => {
    button.addEventListener("click", () => {
      const titre = button.getAttribute("data-title");

      // Projet en occurrence
      projet = selProjet(titre);
      // Liste d'images en carrousel
      loadCarousel(projet);

      classManager();

      const h5 = document.getElementById("modalLabel");
      h5.setAttribute("data-i18n", projet.dataI18N);
      h5.textContent = titre;

      modal.show();
    });
  });

  // Fermeture du modal
  modalEl.addEventListener("hidden.bs.modal", () => {
    classManager();
  });
};
export default initModal;
// Selection du projet
const selProjet = (key) => {
  return key.split(".").reduce((o, k) => o && o[k], tousLesProjets) || key;
};

const classManager = () => {
  if (projet.modalClass) modalEl.classList.toggle(projet.modalClass);
  if (projet.modalHeight)
    document
      .getElementById("carousel-inner")
      ?.classList.toggle(projet.modalHeight);
};
