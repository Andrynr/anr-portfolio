import { particleElmnt } from "../../data/constants.js";

export default () => {
  const particlesContainer = document.querySelector(".particles");

  for (let i = 0; i < particleElmnt.length; i++) {
    const particle = document.createElement("div");

    particle.classList.add("particle");

    const size = Math.random() * 15 + 2;

    particle.style.fontSize = `${size}px`;

    particle.textContent =
      particleElmnt[Math.floor(Math.random() * particleElmnt.length)];

    particle.style.left = `${Math.random() * 100}%`;

    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

    particle.style.opacity = Math.random();

    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }
};
