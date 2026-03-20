import I18N from "../modules/i18n.js";
import getLang from "../utils/lang.js";

const initMerci = async () => {
  try {
    // load saved or detected language
    await I18N.load(getLang());

    // Afficher le body quand les textes sont pretes
    document.body.style.visibility = "visible";

    // reapply translations to DOM elements
    I18N.apply();
  } catch (e) {
    console.warn("i18n init failed", e);
  }
};

initMerci();
