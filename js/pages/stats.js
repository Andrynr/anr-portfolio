import { getVisits } from "../modules/firebase/analytics.js";
import { formatTime } from "../utils/time.js";
import { requireAuth, logOut } from "../modules/auth/admin.js";
import { hideSpinner, spinner } from "../modules/animations/loader.js";

const countElement = document.getElementById("count");
const visitsElement = document.getElementById("visits");

spinner();
// Récupère les visits
const visits = (await getVisits()) || [];

if (countElement) countElement.textContent = String(visits.length);

// Pagination settings
let currentPage = 1;
const pageSize = 25;

function renderVisitsTable(allVisits, container, page = 1, size = pageSize) {
  if (!container) return;
  container.innerHTML = ""; // vider avant rendu

  const total = allVisits.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * size;
  const pageItems = allVisits.slice(start, start + size);

  // wrapper responsive
  const wrapper = document.createElement("div");
  wrapper.style.overflowX = "auto";

  const table = document.createElement("table");
  table.className = "table table-striped";
  table.setAttribute("aria-label", "Liste des visites");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th scope="col">Page</th>
      <th scope="col">User agent</th>
      <th scope="col">Referrer</th>
      <th scope="col">Date</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  const frag = document.createDocumentFragment();

  for (const v of pageItems) {
    const tr = document.createElement("tr");

    // Page visitée
    const tdPage = document.createElement("td");
    tdPage.textContent = v.page ?? "";
    tr.appendChild(tdPage);

    // User agent
    const tdUA = document.createElement("td");
    const ua = v.userAgent ?? "";
    tdUA.textContent = ua.length > 120 ? ua.slice(0, 120) + "…" : ua;
    if (ua.length > 120) tdUA.title = ua;
    tr.appendChild(tdUA);

    // Referrer
    const tdRef = document.createElement("td");
    tdRef.textContent = v.referrer ?? "";
    tr.appendChild(tdRef);

    // Time
    const tdTime = document.createElement("td");
    tdTime.textContent = formatTime(v.time);
    tr.appendChild(tdTime);

    frag.appendChild(tr);
  }

  tbody.appendChild(frag);
  table.appendChild(tbody);
  wrapper.appendChild(table);

  // Controls
  const controls = document.createElement("div");
  controls.className = "d-flex align-items-center justify-content-between mt-2";

  const info = document.createElement("div");
  info.textContent = `Page ${current} / ${totalPages} — ${total} entr${
    total > 1 ? "ées" : "ée"
  }`;

  const btns = document.createElement("div");

  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "btn btn-sm btn-outline-primary me-2";
  (prev.textContent = "Préc."), (prev.disabled = current <= 1);

  const next = document.createElement("button");
  next.type = "button";
  next.className = "btn btn-sm btn-outline-primary";
  (next.textContent = "Suiv."), (next.disabled = current >= totalPages);

  prev.addEventListener("click", () => {
    if (current > 1) {
      currentPage--;
      renderVisitsTable(allVisits, container, currentPage, size);
    }
  });

  next.addEventListener("click", () => {
    if (current < totalPages) {
      currentPage++;
      renderVisitsTable(allVisits, container, currentPage, size);
    }
  });

  btns.appendChild(prev);
  btns.appendChild(next);
  controls.appendChild(info);
  controls.appendChild(btns);

  container.appendChild(wrapper);
  container.appendChild(controls);
}

// initial render
requireAuth((user) =>
  renderVisitsTable(visits, visitsElement, currentPage, pageSize)
);
hideSpinner();

// Bouton de déconnexion
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", async () => {
  spinner();

  try {
    await logOut();
  } catch (error) {
    console.log(error);
  } finally {
    hideSpinner();
  }
});
