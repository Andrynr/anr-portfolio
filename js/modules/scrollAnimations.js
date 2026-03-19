export default function initScrollAnim() {
  /* Animation au défilement */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach((elmt) => {
    observer.observe(elmt);
  });
}
