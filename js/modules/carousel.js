export default function initCarousel() {
  /* Carousel indicator */
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("shown.bs.modal", function () {
      const carousel = modal.querySelector(".carousel");

      const indicatorsContainer = carousel?.querySelector(
        ".carousel-indicators"
      );
      const items = carousel?.querySelectorAll(".carousel-item");
      const carouselId = carousel?.getAttribute("id");

      if (!carousel || !indicatorsContainer || !items) return;

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
  });
}
