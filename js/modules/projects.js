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
        <span class="w-auto col-sm-6 pe-0 small text-muted" data-i18n="${
          projet.i18n.techs
        }"></span>
        <div class="col d-flex px-1 justify-content-end">
          ${
            projet.dossierImgs
              ? `<button type="button" class="btn btn-outline-info btn-sm btn-custom ms-auto preview 
          " data-title="${nom}">
            <span class="d-none d-sm-inline">👁️ </span><span data-i18n="btn.preview"></span>
          </button>`
              : ""
          }
          ${
            projet.lien
              ? `<a
            href="${projet.lien}"
            class="btn btn-outline-warning btn-custom btn-sm mx-1 
            "
            target="_blank"
            title="Voir le démo en ligne"
            aria-label="Voir le démo en ligne"
          ><span class="d-none d-sm-inline">🚀 </span><span data-i18n="btn.demo"></span></a>`
              : ""
          }
          ${
            projet.git
              ? `
          <a href="${projet.git}" class="btn btn-outline-dark btn-custom btn-sm" target="_blank" title="Code Source">
            <span class="d-none d-md-flex">&lt;/&gt; </span>Code</a>
          `
              : ""
          }

        </div>
      </div>
    </div>`
    )
    .join("");
};

export default loadProjects;
