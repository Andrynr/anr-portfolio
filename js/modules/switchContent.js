export const switchContent = () => {
  return new Promise((resolve) => {
    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");

    setTimeout(() => {
      intro.style.opacity = "0";
      main.style.opacity = "1";

      // Retire l'intro après le fade
      setTimeout(() => {
        intro.style.display = "none";
        document.body.style.overflow = "auto";

        resolve();
      }, 100);
    }, 12000);
  });
};
