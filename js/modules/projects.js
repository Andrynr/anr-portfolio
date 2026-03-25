import { getProjects } from "../../api/projects-api.js";

const loadProjects = async () => {
  const allProjects = document.getElementById("allProjects");

  const projects = await getProjects();

  allProjects.innerHTML = Object.entries(projects)
    .map(
      ([nom, projet]) =>
        `<div class="card fade-in hov-scale col-md-6 col-xxl-4 project-card">
      <div class="card-body c-b-projet" id="${projet.id}">
        <h5 class="card-title" data-i18n="${projet.i18n.title}"></h5>
        <p data-i18n="${projet.i18n.desc}"></p>

        ${
          projet.EC
            ? `<div class="progress" title="Projet en cours">
  <div
    class="progress-bar bg-primary bg-opacity-25 progress-bar-striped progress-bar-animated"
    role="progressbar"
    style="width: ${projet.progress}%"
    aria-valuenow="${projet.progress}"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <span data-i18n="${projet.i18n.status}">En cours</span>
  </div>
</div>`
            : ""
        }
      </div>
      <div class="card-footer row px-0">
        <span class="w-auto col-sm-6 pe-0" data-i18n="${
          projet.i18n.techs
        }"></span>
        <div class="col d-flex px-1">
          <button type="button" class="btn btn-info btn-sm ms-auto preview ${
            !projet.dossierImgs ? "disabled" : ""
          }" data-title="${nom}">
            <span data-i18n="btn.preview"></span>
          </button>
          <a
            href="${projet.lien}"
            class="btn btn-warning btn-sm mx-1 ${
              !projet.lien ? "disabled" : ""
            }"
            target="_blank"
            title="Voir le démo en ligne"
            aria-label="Voir le démo en ligne"
          ><span data-i18n="btn.demo"></span></a>
        </div>
      </div>
    </div>`
    )
    .join("");
};

export default loadProjects;
