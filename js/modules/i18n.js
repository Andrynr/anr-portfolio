// i18n loader
const I18N = (function () {
  const defaultLang =
    localStorage.getItem("lang") ||
    (navigator.language || "fr").slice(0, 2) ||
    "fr";
  let current = defaultLang;
  let dict = {};

  /* Charge les textes */
  async function load(lang) {
    try {
      const res = await fetch(`locales/${lang}.json`);
      if (!res.ok) throw new Error("Not found");
      dict = await res.json();
      current = lang;
      localStorage.setItem("lang", lang);
      apply();
      return true;
    } catch (e) {
      console.warn("i18n load failed for", lang, e);
      return false;
    }
  }

  function t(key) {
    return key.split(".").reduce((o, k) => o && o[k], dict) || key;
  }

  /* Applique les textes à la page */
  function apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      if (
        el.placeholder !== undefined &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA")
      ) {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
  }

  /* Gère le select pour langues */
  function initSelector(selectId = "langSelect") {
    const sel = document.getElementById(selectId);
    if (!sel) return;

    //Remplir le select avec les options de langues disponibles
    const langs = ["fr", "en"];
    sel.innerHTML = langs
      .map((l) => `<option value="${l}">${l.toUpperCase()}</option>`)
      .join("");
    sel.value = current;
  }

  return {
    load,
    t,
    apply,
    initSelector,
    get current() {
      return current;
    },
  };
})();

export default I18N;
