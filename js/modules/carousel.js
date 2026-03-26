const carousel = modal.querySelector(".carousel");

export default function initCarousel() {
  /* Carousel à l'ouverture du modal */
  document
    .querySelector("#modal")
    .addEventListener("shown.bs.modal", function () {
      // Activer le carousel si le modal est affiché
      if (!carousel) return;

      resetCarousel();

      const indicatorsContainer = carousel.querySelector(
        ".carousel-indicators"
      );
      const items = carousel.querySelectorAll(".carousel-item");
      const carouselId = carousel.getAttribute("id");

      if (!indicatorsContainer || !items.length) return;

      indicatorsContainer.innerHTML = "";

      items.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";

        button.setAttribute("data-bs-target", `#${carouselId}`);
        button.setAttribute("data-bs-slide-to", index);
        button.setAttribute("aria-label", `Slide ${index + 1}`);

        if (index === 0) {
          button.classList.add("active");
          button.setAttribute("aria-current", "true");
        }
        indicatorsContainer.appendChild(button);
      });
    });
}

export const loadCarousel = (projet) => {
  const imgs = projet.imgs;

  try {
    if (!imgs?.length) throw new Error("Y a pas d'images");

    const carouselInner = document.getElementById("carousel-inner");
    carouselInner.innerHTML = imgs
      .map(
        (img, i) =>
          `
        <div
        class="carousel-item mx-auto ${
          i === 0 ? "active" : ""
        }"><img src="images/${projet.dossierImgs}/${
            img.name
          }" class="img-fluid rounded d-block mx-auto" 
        alt="${img.altText}"
        />
        </div>
        `
      )
      .join("");
  } catch (error) {
    console.log("Erreur en chargeant les images :", error);
  }
};

const resetCarousel = () => {
  // Reset du carousel
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
  bsCarousel.to(0);
};
