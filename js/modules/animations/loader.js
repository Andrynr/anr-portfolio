export const spinner = (spinnerContainer = document.body, isLoading = true) => {
  if (!isLoading) return;

  disableActivate();

  spinnerContainer.classList.add(
    "d-flex",
    "position-fixed",
    "top-0",
    "start-0",
    "justify-content-center",
    "align-items-center",
    "w-100",
    "h-100"
  );

  spinnerContainer.innerHTML = `
      <span class="spinner-grow text-info " id="spinner"></span>
  `;
};

export const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  if (!spinner) return;

  spinner.classList.add("d-none");

  disableActivate();
};

const disableActivate = () => {
  const boutons = document.querySelectorAll("button");
  boutons?.forEach((btn) => (btn.disabled = !btn.disabled));
};

const containerStyle = (spinnerContainer) => {
  spinnerContainer.classList.add(
    "position-fixed",
    "top-0",
    "start-O",
    "w-100",
    "h-100",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "z-3"
  );
  spinnerContainer.style.background = "rgba(0,0,0,0.5)";
  spinnerContainer.style.zIndex = "9999";
};
