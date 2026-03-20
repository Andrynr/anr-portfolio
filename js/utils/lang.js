const getLang = () => {
  // Charger la langue enregistrée
  return localStorage.getItem("lang") || navigator.language.slice(0, 2) || "fr";
};

export default getLang;
