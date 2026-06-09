import getLang from "../../utils/lang.js";
import I18N from "../i18n.js";

/* Animation écriture au clavier */
let phrases = ["Hello wo... 🤭", "Hello, visitor! 😌"];

/* Typewriter */
let i = 0;
let j = 0;
let phraseCourant = [];
let Efface = false;
let firstIteration = true;

export const majPhrases = (phr = "") => {
  selectPhr(phr);

  // On réinitialise si en cours d'écriture
  !Efface && resetTypewriter();
};

// Réinitialisation de la phrase courante
export const resetTypewriter = () => {
  phraseCourant = [];
  i = 0;
  j = 0;
};

// Déclenche la boucle de Typewriter
export const startTypewriter = (cible = "phraseIntro") => {
  let enVue = false;
  let timeoutId;

  const texte = document.getElementById(cible);
  if (!texte) return;

  const br = "<br>";

  const loop = () => {
    // Arrêter si clé supérieur à la longueur
    if (i >= phrases.length) return;

    const phrase = phrases[i];

    if (!Efface) {
      // On écrit
      phraseCourant.push(phrases[i][j]);
      j++;

      if (j === phrase.length) {
        if (cible === "greeting" && !firstIteration) {
          // On fait à la ligne au lieu d'effacer
          phraseCourant.push(br);
          j = 0;
          i++;
        } else {
          Efface = true;
        }
      }
    } else {
      // On efface
      phraseCourant.pop();

      // Pour le preloader: arrête l'effacement
      if (firstIteration && cible === "greeting" && j === 6) {
        firstIteration = false;
        Efface = false;
        i++;
      }

      j--;
      if (j === 0) {
        Efface = false;
        i = (i + 1) % phrases.length;
      }
    }

    texte.innerHTML = phraseCourant.join("");

    const vitesse = j === phrase.length ? 2000 : Efface ? 50 : 100;
    timeoutId = setTimeout(loop, vitesse);
  };

  const observer = new IntersectionObserver(([entry]) => {
    const visible = entry.isIntersecting;
    if (visible && !enVue) {
      enVue = true;
      loop();
    } else if (!visible) {
      enVue = false;
      clearTimeout(timeoutId);
    }
  });

  observer.observe(texte);
};

export const selectPhr = (phr) => {
  // Sélection de la phrase intro
  const p0 = I18N.t("intro.phrases.0");
  const p1 = I18N.t("intro.phrases.1");

  phrases = phr ? phr : [p0, p1];
};

export function initTypewriter() {
  majPhrases();
  startTypewriter();
}

// Écoute le changement de langue
const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change", async (e) => {
  const newLang = e.target.value;
  await I18N.load(newLang);
  majPhrases();
});

export const initMultiLang = async () => {
  // --- i18n integration ---
  try {
    await I18N.load(getLang());

    I18N.initSelector("langSelect");

    const msgConsole = I18N.t("msgConsole");
    msgConsole.forEach((msg) => {
      console.log(`%c${msg.text}`, msg.style);
    });
  } catch (e) {
    console.warn("i18n load failed", e);
  }
};
