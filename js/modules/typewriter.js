import getLang from "../utils/lang.js";
import I18N from "./i18n.js";

const initMultiLang = async () => {
  /* Animation écriture au clavier */
  let phrases = ["Hello wo... 🤭", "Hello, visitor! 😌"];

  const majPhrases = () => {
    // Sélection de la phrase
    const p0 = I18N.t("intro.phrases.0");
    const p1 = I18N.t("intro.phrases.1");
    phrases = [p0, p1];

    // On réinitialise si en cours d'écriture
    !Efface && resetTypewriter();
  };

  // Réinitialisation de la phrase courante
  const resetTypewriter = () => {
    phraseCourant = [];
    i = 0;
    j = 0;
  };

  // Déclenche la boucle de Typewriter
  const startTypewriter = () => {
    loop();
  };

  /* Typewriter */
  let i = 0;
  let j = 0;
  let phraseCourant = [];
  let Efface = false;
  const texte = document.getElementById("phraseIntro");

  const loop = () => {
    const phrase = phrases[i];

    if (!Efface) {
      // On écrit
      phraseCourant.push(phrases[i][j]);
      j++;
      if (j === phrase.length) {
        Efface = true;
      }
    } else {
      // On efface
      phraseCourant.pop();
      j--;
      if (j === 0) {
        Efface = false;
        i = (i + 1) % phrases.length;
      }
    }

    texte.innerHTML = phraseCourant.join("");

    const vitesse = j === phrase.length ? 2000 : Efface ? 50 : 100;
    setTimeout(loop, vitesse);
  };

  // Écoute le changement de langue
  const langSelect = document.getElementById("langSelect");
  langSelect.addEventListener("change", async (e) => {
    const newLang = e.target.value;
    await I18N.load(newLang);
    majPhrases();
  });

  // --- i18n integration ---
  async function initTypewriter() {
    try {
      await I18N.load(getLang());

      I18N.initSelector("langSelect");

      majPhrases();
      startTypewriter();
    } catch (e) {
      console.warn("i18n load failed", e);
    }
  }
  await initTypewriter();
};

export default initMultiLang;
